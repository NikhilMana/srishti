import { Hands } from '@mediapipe/hands';
import { Pose } from '@mediapipe/pose';
import { Camera } from '@mediapipe/camera_utils';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { addSignRecord } from './firebase';

// Track detected gestures
const detectedGestures = new Set();
let lastGestureTime = 0;
const GESTURE_COOLDOWN = 2000; // 2 seconds cooldown between gestures
let cooldownInterval: NodeJS.Timeout | null = null;
let currentGesture: string | null = null;

// Helper functions to check finger positions
function isThumbUp(landmarks: any[]) {
  const thumbTip = landmarks[4];
  const thumbIP = landmarks[3];
  const thumbMCP = landmarks[2];
  return thumbTip.y < thumbIP.y && thumbIP.y < thumbMCP.y;
}

function isThumbDown(landmarks: any[]) {
  const thumbTip = landmarks[4];
  const thumbIP = landmarks[3];
  const thumbMCP = landmarks[2];
  return thumbTip.y > thumbIP.y && thumbIP.y > thumbMCP.y;
}

function isIndexUp(landmarks: any[]) {
  const indexTip = landmarks[8];
  const indexPIP = landmarks[6];
  const indexMCP = landmarks[5];
  return indexTip.y < indexPIP.y && indexPIP.y < indexMCP.y;
}

function isMiddleUp(landmarks: any[]) {
  const middleTip = landmarks[12];
  const middlePIP = landmarks[10];
  const middleMCP = landmarks[9];
  return middleTip.y < middlePIP.y && middlePIP.y < middleMCP.y;
}

function isRingUp(landmarks: any[]) {
  const ringTip = landmarks[16];
  const ringPIP = landmarks[14];
  const ringMCP = landmarks[13];
  return ringTip.y < ringPIP.y && ringPIP.y < ringMCP.y;
}

function isPinkyUp(landmarks: any[]) {
  const pinkyTip = landmarks[20];
  const pinkyPIP = landmarks[18];
  const pinkyMCP = landmarks[17];
  return pinkyTip.y < pinkyPIP.y && pinkyPIP.y < pinkyMCP.y;
}

function isFist(landmarks: any[]) {
  const fingers = [
    { tip: landmarks[8], pip: landmarks[6] },  // Index
    { tip: landmarks[12], pip: landmarks[10] }, // Middle
    { tip: landmarks[16], pip: landmarks[14] }, // Ring
    { tip: landmarks[20], pip: landmarks[18] }  // Pinky
  ];
  
  return fingers.every(finger => finger.tip.y > finger.pip.y);
}

function isHandNearShoulder(landmarks: any[], poseLandmarks: any[]) {
  if (!poseLandmarks) return false;
  const handY = landmarks[0].y;
  const shoulderY = poseLandmarks[12].y; // Right shoulder
  const shoulderX = poseLandmarks[12].x;
  const handX = landmarks[0].x;
  
  // More precise vertical positioning for chest area
  const isInChestArea = handY > shoulderY - 0.1 && handY < shoulderY + 0.2;
  const isHorizontallyAligned = Math.abs(handX - shoulderX) < 0.25;
  
  return isInChestArea && isHorizontallyAligned;
}

function isHandNearHead(landmarks: any[], poseLandmarks: any[]) {
  if (!poseLandmarks) return false;
  const handY = landmarks[0].y;
  const headY = poseLandmarks[0].y; // Nose position
  const headX = poseLandmarks[0].x;
  const handX = landmarks[0].x;
  
  // More precise vertical positioning for forehead area
  const isInForeheadArea = handY > headY - 0.1 && handY < headY + 0.1;
  const isHorizontallyAligned = Math.abs(handX - headX) < 0.2;
  
  return isInForeheadArea && isHorizontallyAligned;
}

function areHandsDown(handLandmarks: any[]) {
  if (!handLandmarks || handLandmarks.length === 0) return true;
  
  for (const landmarks of handLandmarks) {
    if (isIndexUp(landmarks) || isMiddleUp(landmarks) || 
        isRingUp(landmarks) || isPinkyUp(landmarks) || 
        isThumbUp(landmarks)) {
      return false;
    }
  }
  return true;
}

function isOpenPalm(landmarks: any[]) {
  const fingers = [
    { tip: landmarks[8], pip: landmarks[6] },  // Index
    { tip: landmarks[12], pip: landmarks[10] }, // Middle
    { tip: landmarks[16], pip: landmarks[14] }, // Ring
    { tip: landmarks[20], pip: landmarks[18] }  // Pinky
  ];
  
  const allFingersUp = fingers.every(finger => finger.tip.y < finger.pip.y);
  const isSpread = Math.abs(landmarks[8].x - landmarks[20].x) > 0.1;
  
  return allFingersUp && isSpread;
}

// Helper function to update cooldown display
function updateCooldownDisplay(remainingTime: number, gestureOutputRef: React.RefObject<HTMLDivElement>) {
  if (!gestureOutputRef.current) return;
  
  if (remainingTime > 0) {
    gestureOutputRef.current.innerText = `Cooldown: ${(remainingTime / 1000).toFixed(1)}s`;
  } else {
    gestureOutputRef.current.innerText = "Waiting for gesture...";
  }
}

// Update gesture list display
function updateGestureList(gestureName: string | null, gestureListRef: React.RefObject<HTMLDivElement>) {
  if (!gestureListRef.current) return;
  
  if (gestureName) {
    detectedGestures.add(gestureName);
  }
  
  // Clear and rebuild the gesture list
  gestureListRef.current.innerHTML = '';
  detectedGestures.forEach(gesture => {
    const gestureItem = document.createElement('div');
    gestureItem.className = `gesture-item ${gesture === gestureName ? 'active' : ''}`;
    gestureItem.textContent = gesture;
    gestureListRef.current?.appendChild(gestureItem);
  });
}

export const initializeTracking = (
  videoRef: React.RefObject<HTMLVideoElement>,
  canvasRef: React.RefObject<HTMLCanvasElement>,
  gestureOutputRef: React.RefObject<HTMLDivElement>,
  gestureListRef: React.RefObject<HTMLDivElement>
) => {
  if (!videoRef.current || !canvasRef.current) return;

  const video = videoRef.current;
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Initialize MediaPipe Hands
  const hands = new Hands({
    locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
    }
  });

  hands.setOptions({
    maxNumHands: 2,
    modelComplexity: 1,
    minDetectionConfidence: 0.7,
    minTrackingConfidence: 0.7
  });

  // Initialize MediaPipe Pose
  const pose = new Pose({
    locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
    }
  });

  pose.setOptions({
    modelComplexity: 1,
    smoothLandmarks: true,
    minDetectionConfidence: 0.7,
    minTrackingConfidence: 0.7
  });

  // Store pose landmarks
  let poseLandmarks: any = null;

  // Process hand results
  hands.onResults((results) => {
    if (!ctx || !canvas) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw video frame
    ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

    // Draw hand landmarks
    if (results.multiHandLandmarks) {
      for (const landmarks of results.multiHandLandmarks) {
        drawConnectors(ctx, landmarks, HAND_CONNECTIONS, {
          color: '#0000FF',
          lineWidth: 2
        });
        drawLandmarks(ctx, landmarks, {
          color: '#FFFF00',
          lineWidth: 1,
          radius: 2
        });
      }
    }

    // Process gestures with current pose landmarks
    processGestures({
      ...results,
      poseLandmarks
    }, gestureOutputRef, gestureListRef);
  });

  // Process pose results
  pose.onResults((results) => {
    if (!ctx || !canvas) return;

    // Draw pose landmarks
    if (results.poseLandmarks) {
      drawConnectors(ctx, results.poseLandmarks, POSE_CONNECTIONS, {
        color: '#00FF00',
        lineWidth: 2
      });
      drawLandmarks(ctx, results.poseLandmarks, {
        color: '#FF0000',
        lineWidth: 1,
        radius: 2
      });
    }

    // Update pose landmarks
    poseLandmarks = results.poseLandmarks;
  });

  // Initialize camera
  const camera = new Camera(video, {
    onFrame: async () => {
      await hands.send({ image: video });
      await pose.send({ image: video });
    },
    width: 640,
    height: 480
  });

  // Start camera
  camera.start().catch((error) => {
    console.error('Error starting camera:', error);
    if (gestureOutputRef.current) {
      gestureOutputRef.current.innerText = 'Error: Could not access camera';
    }
  });

  // Cleanup function
  return () => {
    camera.stop();
    hands.close();
    pose.close();
    if (cooldownInterval) {
      clearInterval(cooldownInterval);
    }
  };
};

// Helper function to process gestures
const processGestures = async (
  results: any,
  gestureOutputRef: React.RefObject<HTMLDivElement>,
  gestureListRef: React.RefObject<HTMLDivElement>
) => {
  if (!gestureOutputRef.current || !gestureListRef.current) return;

  const poseLandmarks = results.poseLandmarks;
  const handLandmarks = results.multiHandLandmarks;
  let gestureName = null;

  // Check if we're in cooldown period
  const now = Date.now();
  const timeSinceLastGesture = now - lastGestureTime;
  
  if (timeSinceLastGesture < GESTURE_COOLDOWN) {
    updateCooldownDisplay(GESTURE_COOLDOWN - timeSinceLastGesture, gestureOutputRef);
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
    if (gestureOutputRef.current) {
      gestureOutputRef.current.innerText = `Detected: ${gestureName}`;
    }
    updateGestureList(gestureName, gestureListRef);

    // Store the gesture in Firebase if it's a medical sign
    if (['Fever', 'Chest Pain', 'Headache'].includes(gestureName)) {
      try {
        // Get user's location if available
        let location;
        if (navigator.geolocation) {
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
          location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
        }

        // Add sign record to Firebase
        await addSignRecord({
          userId: 'anonymous', // You can replace this with actual user ID if you implement authentication
          gesture: gestureName,
          status: 'pending',
          location
        });

        if (gestureOutputRef.current) {
          gestureOutputRef.current.innerText += ' - Alert sent to volunteers';
        }
      } catch (error) {
        console.error('Error storing sign:', error);
        if (gestureOutputRef.current) {
          gestureOutputRef.current.innerText += ' - Error sending alert';
        }
      }
    }
    
    // Start cooldown countdown
    cooldownInterval = setInterval(() => {
      const remainingTime = GESTURE_COOLDOWN - (Date.now() - lastGestureTime);
      if (remainingTime <= 0) {
        clearInterval(cooldownInterval);
        cooldownInterval = null;
        updateCooldownDisplay(0, gestureOutputRef);
      } else {
        updateCooldownDisplay(remainingTime, gestureOutputRef);
      }
    }, 100);
  } else if (!gestureName) {
    currentGesture = null;
    updateCooldownDisplay(0, gestureOutputRef);
  }
};

// Constants for hand and pose connections
const HAND_CONNECTIONS = [
  [0, 1], [1, 2], [2, 3], [3, 4], // thumb
  [0, 5], [5, 6], [6, 7], [7, 8], // index finger
  [0, 9], [9, 10], [10, 11], [11, 12], // middle finger
  [0, 13], [13, 14], [14, 15], [15, 16], // ring finger
  [0, 17], [17, 18], [18, 19], [19, 20], // pinky
  [0, 5], [5, 9], [9, 13], [13, 17], [0, 17] // palm
];

const POSE_CONNECTIONS = [
  [11, 12], [11, 13], [13, 15], [12, 14], [14, 16], // arms
  [11, 23], [12, 24], [23, 24], // shoulders and hips
  [23, 25], [24, 26], [25, 27], [26, 28] // legs
]; 