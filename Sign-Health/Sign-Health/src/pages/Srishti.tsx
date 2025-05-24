import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// Declare MediaPipe types
declare global {
  interface Window {
    Pose: any;
    Hands: any;
    Camera: any;
    drawConnectors: any;
    drawLandmarks: any;
  }
}

const Srishti = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gestureOutputRef = useRef<HTMLDivElement>(null);
  const gestureListRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Helper functions
  const isThumbUp = (landmarks: any[]) => {
    const thumbTip = landmarks[4];
    const thumbIP = landmarks[3];
    const thumbMCP = landmarks[2];
    return thumbTip.y < thumbIP.y && thumbIP.y < thumbMCP.y;
  };

  const isThumbDown = (landmarks: any[]) => {
    const thumbTip = landmarks[4];
    const thumbIP = landmarks[3];
    const thumbMCP = landmarks[2];
    return thumbTip.y > thumbIP.y && thumbIP.y > thumbMCP.y;
  };

  const isIndexUp = (landmarks: any[]) => {
    const indexTip = landmarks[8];
    const indexPIP = landmarks[6];
    const indexMCP = landmarks[5];
    return indexTip.y < indexPIP.y && indexPIP.y < indexMCP.y;
  };

  const isMiddleUp = (landmarks: any[]) => {
    const middleTip = landmarks[12];
    const middlePIP = landmarks[10];
    const middleMCP = landmarks[9];
    return middleTip.y < middlePIP.y && middlePIP.y < middleMCP.y;
  };

  const isRingUp = (landmarks: any[]) => {
    const ringTip = landmarks[16];
    const ringPIP = landmarks[14];
    const ringMCP = landmarks[13];
    return ringTip.y < ringPIP.y && ringPIP.y < ringMCP.y;
  };

  const isPinkyUp = (landmarks: any[]) => {
    const pinkyTip = landmarks[20];
    const pinkyPIP = landmarks[18];
    const pinkyMCP = landmarks[17];
    return pinkyTip.y < pinkyPIP.y && pinkyPIP.y < pinkyMCP.y;
  };

  const isFist = (landmarks: any[]) => {
    const fingers = [
      { tip: landmarks[8], pip: landmarks[6] },  // Index
      { tip: landmarks[12], pip: landmarks[10] }, // Middle
      { tip: landmarks[16], pip: landmarks[14] }, // Ring
      { tip: landmarks[20], pip: landmarks[18] }  // Pinky
    ];
    
    return fingers.every(finger => finger.tip.y > finger.pip.y);
  };

  const isOpenPalm = (landmarks: any[]) => {
    const fingers = [
      { tip: landmarks[8], pip: landmarks[6] },  // Index
      { tip: landmarks[12], pip: landmarks[10] }, // Middle
      { tip: landmarks[16], pip: landmarks[14] }, // Ring
      { tip: landmarks[20], pip: landmarks[18] }  // Pinky
    ];
    
    const allFingersUp = fingers.every(finger => finger.tip.y < finger.pip.y);
    const isSpread = Math.abs(landmarks[8].x - landmarks[20].x) > 0.1;
    
    return allFingersUp && isSpread;
  };

  const isHandNearHead = (landmarks: any[], poseLandmarks: any[]) => {
    if (!poseLandmarks) return false;
    const handY = landmarks[0].y;
    const headY = poseLandmarks[0].y;
    const headX = poseLandmarks[0].x;
    const handX = landmarks[0].x;
    
    const isInForeheadArea = handY > headY - 0.1 && handY < headY + 0.1;
    const isHorizontallyAligned = Math.abs(handX - headX) < 0.2;
    
    return isInForeheadArea && isHorizontallyAligned;
  };

  const isHandNearShoulder = (landmarks: any[], poseLandmarks: any[]) => {
    if (!poseLandmarks) return false;
    const handY = landmarks[0].y;
    const shoulderY = poseLandmarks[12].y;
    const shoulderX = poseLandmarks[12].x;
    const handX = landmarks[0].x;
    
    const isInChestArea = handY > shoulderY - 0.1 && handY < shoulderY + 0.2;
    const isHorizontallyAligned = Math.abs(handX - shoulderX) < 0.25;
    
    return isInChestArea && isHorizontallyAligned;
  };

  const areHandsDown = (handLandmarks: any[]) => {
    if (!handLandmarks || handLandmarks.length === 0) return true;
    
    for (const landmarks of handLandmarks) {
      if (isIndexUp(landmarks) || isMiddleUp(landmarks) || 
          isRingUp(landmarks) || isPinkyUp(landmarks) || 
          isThumbUp(landmarks)) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    const loadScript = (src: string) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    const initializeGestureDetection = async () => {
      try {
        // Load MediaPipe scripts
        await loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils@0.3/camera_utils.js');
        await loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/control_utils@0.6/control_utils.js');
        await loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils@0.3/drawing_utils.js');
        await loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4/hands.js');
        await loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.5/pose.js');

        const video = videoRef.current;
        const canvas = canvasRef.current;
        const gestureOutput = gestureOutputRef.current;
        const gestureList = gestureListRef.current;

        if (!video || !canvas || !gestureOutput || !gestureList) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Initialize MediaPipe
        const pose = new window.Pose({
          locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
        });

        pose.setOptions({
          modelComplexity: 1,
          smoothLandmarks: true,
          enableSegmentation: false,
          minDetectionConfidence: 0.7,
          minTrackingConfidence: 0.7
        });

        const hands = new window.Hands({
          locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
        });

        hands.setOptions({
          maxNumHands: 2,
          modelComplexity: 1,
          minDetectionConfidence: 0.7,
          minTrackingConfidence: 0.7
        });

        // Track detected gestures
        const detectedGestures = new Set();
        let lastGestureTime = 0;
        const GESTURE_COOLDOWN = 2000;
        let cooldownInterval: NodeJS.Timeout | null = null;
        let currentGesture: string | null = null;

        // Get webcam
        navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
          if (video) {
            video.srcObject = stream;
          }
        });

        // Draw landmarks
        const drawLandmarks = (results: any) => {
          if (!ctx || !canvas) return;
          
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          if (video) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          }

          if (results.poseLandmarks) {
            window.drawConnectors(ctx, results.poseLandmarks, window.Pose.POSE_CONNECTIONS, { color: '#00FF00' });
            window.drawLandmarks(ctx, results.poseLandmarks, { color: '#FF0000', radius: 2 });
          }

          if (results.multiHandLandmarks) {
            for (const landmarks of results.multiHandLandmarks) {
              window.drawConnectors(ctx, landmarks, window.Hands.HAND_CONNECTIONS, { color: '#0000FF' });
              window.drawLandmarks(ctx, landmarks, { color: '#FFFF00', radius: 2 });
            }
          }
        };

        // Update gesture list display
        const updateGestureList = (gestureName: string) => {
          if (gestureName) {
            detectedGestures.add(gestureName);
          }
          
          if (gestureList) {
            gestureList.innerHTML = '';
            detectedGestures.forEach(gesture => {
              const gestureItem = document.createElement('div');
              gestureItem.className = `gesture-item px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                gesture === gestureName 
                  ? 'bg-healthcare-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`;
              gestureItem.textContent = gesture;
              gestureList.appendChild(gestureItem);
            });
          }
        };

        // Helper function to update cooldown display
        const updateCooldownDisplay = (remainingTime: number) => {
          if (gestureOutput) {
            if (remainingTime > 0) {
              gestureOutput.innerText = `Cooldown: ${(remainingTime / 1000).toFixed(1)}s`;
              gestureOutput.className = 'absolute top-4 left-4 text-white bg-black/50 px-4 py-2 rounded-lg text-lg font-semibold';
            } else {
              gestureOutput.innerText = "Waiting for gesture...";
              gestureOutput.className = 'absolute top-4 left-4 text-white bg-black/50 px-4 py-2 rounded-lg text-lg font-semibold';
            }
          }
        };

        // Combined results from both models
        let latestPoseResults: any = null;
        let latestHandsResults: any = null;

        const checkGestures = () => {
          if (!latestPoseResults || !latestHandsResults) return;

          const poseLandmarks = latestPoseResults.poseLandmarks;
          const handLandmarks = latestHandsResults.multiHandLandmarks;
          let gestureName: string | null = null;

          // Check if we're in cooldown period
          const now = Date.now();
          const timeSinceLastGesture = now - lastGestureTime;
          
          if (timeSinceLastGesture < GESTURE_COOLDOWN) {
            updateCooldownDisplay(GESTURE_COOLDOWN - timeSinceLastGesture);
            return;
          }

          if (cooldownInterval) {
            clearInterval(cooldownInterval);
            cooldownInterval = null;
          }

          // Check if hands are down
          if (areHandsDown(handLandmarks)) {
            gestureName = "No Gestures Detected";
          } else if (handLandmarks && handLandmarks[0]) {
            const landmarks = handLandmarks[0];

            // Doctor (index and middle finger up, like a peace sign)
            if (isIndexUp(landmarks) && isMiddleUp(landmarks) && 
                !isRingUp(landmarks) && !isPinkyUp(landmarks) && 
                landmarks[8].y < landmarks[0].y && landmarks[12].y < landmarks[0].y) {
              gestureName = "Doctor";
            }
            // Fever (open palm on forehead)
            else if (isHandNearHead(landmarks, poseLandmarks) && 
                     isOpenPalm(landmarks) &&
                     landmarks[0].y < poseLandmarks[0].y + 0.1) {
              gestureName = "Fever";
            }
            // Chest Pain (fist near chest)
            else if (isHandNearShoulder(landmarks, poseLandmarks) && 
                     isFist(landmarks) &&
                     landmarks[0].y > poseLandmarks[12].y - 0.1 &&
                     landmarks[0].y < poseLandmarks[12].y + 0.2) {
              gestureName = "Chest Pain";
            }
            // Headache (fist near head)
            else if (isHandNearHead(landmarks, poseLandmarks) && 
                     isFist(landmarks) &&
                     landmarks[0].y < poseLandmarks[0].y + 0.2) {
              gestureName = "Headache";
            }
            // Yes (thumbs up)
            else if (isThumbUp(landmarks) && 
                     !isIndexUp(landmarks) && !isMiddleUp(landmarks) &&
                     landmarks[4].y < landmarks[0].y) {
              gestureName = "Yes";
            }
            // No (thumbs down)
            else if (isThumbDown(landmarks) && 
                     !isIndexUp(landmarks) && !isMiddleUp(landmarks) &&
                     landmarks[4].y > landmarks[0].y) {
              gestureName = "No";
            }
            // I (pinky up)
            else if (isPinkyUp(landmarks) && 
                     !isThumbUp(landmarks) && !isIndexUp(landmarks) && 
                     !isMiddleUp(landmarks) && !isRingUp(landmarks) &&
                     landmarks[20].y < landmarks[0].y) {
              gestureName = "I";
            }
            // You (index finger up)
            else if (isIndexUp(landmarks) && 
                     !isMiddleUp(landmarks) && !isThumbUp(landmarks) &&
                     landmarks[8].y < landmarks[0].y) {
              gestureName = "You";
            }
            // Help (both hands up)
            else if (handLandmarks.length === 2 && 
                     handLandmarks[0][8].y < 0.4 && handLandmarks[1][8].y < 0.4 &&
                     handLandmarks[0][0].y < 0.5 && handLandmarks[1][0].y < 0.5) {
              gestureName = "Help";
            }
          }

          // Only update if we have a new gesture
          if (gestureName && gestureName !== currentGesture) {
            currentGesture = gestureName;
            lastGestureTime = now;
            console.log("Detected gesture:", gestureName);
            if (gestureOutput) {
              gestureOutput.innerText = `Detected: ${gestureName}`;
            }
            updateGestureList(gestureName);
            
            // Start cooldown countdown
            cooldownInterval = setInterval(() => {
              const remainingTime = GESTURE_COOLDOWN - (Date.now() - lastGestureTime);
              if (remainingTime <= 0) {
                if (cooldownInterval) {
                  clearInterval(cooldownInterval);
                  cooldownInterval = null;
                }
                updateCooldownDisplay(0);
              } else {
                updateCooldownDisplay(remainingTime);
              }
            }, 100);
          } else if (!gestureName) {
            currentGesture = null;
            updateCooldownDisplay(0);
          }
        };

        pose.onResults((results: any) => {
          latestPoseResults = results;
          drawLandmarks({ ...results, multiHandLandmarks: latestHandsResults?.multiHandLandmarks });
          checkGestures();
        });

        hands.onResults((results: any) => {
          latestHandsResults = results;
          drawLandmarks({ ...latestPoseResults, multiHandLandmarks: results.multiHandLandmarks });
          checkGestures();
        });

        const camera = new window.Camera(video, {
          onFrame: async () => {
            await pose.send({ image: video });
            await hands.send({ image: video });
          },
          width: 640,
          height: 480,
        });

        camera.start();
        setIsInitialized(true);

        return () => {
          camera.stop();
          if (cooldownInterval) {
            clearInterval(cooldownInterval);
          }
        };
      } catch (error) {
        console.error('Error initializing gesture detection:', error);
      }
    };

    initializeGestureDetection();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Gesture Detection</h1>
        <Button onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
      </div>

      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Real-time Gesture Recognition</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full aspect-video mb-4 rounded-lg overflow-hidden bg-black">
            <video
              ref={videoRef}
              className="absolute w-full h-full object-cover"
              autoPlay
              playsInline
            />
            <canvas
              ref={canvasRef}
              className="absolute w-full h-full"
              width={640}
              height={480}
            />
            <div
              ref={gestureOutputRef}
              className="absolute top-4 left-4 text-white bg-black/50 px-4 py-2 rounded-lg text-lg font-semibold"
            >
              Waiting for gesture...
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-xl font-semibold mb-2">Recognized Gestures</h3>
            <div
              ref={gestureListRef}
              className="flex flex-wrap gap-2"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Srishti; 