const video = document.getElementById('inputVideo');
const canvas = document.getElementById('outputCanvas');
const ctx = canvas.getContext('2d');
const gestureOutput = document.getElementById('gestureOutput');
const gestureList = document.getElementById('gestureList');

// Track detected gestures
const detectedGestures = new Set();
let lastGestureTime = 0;
const GESTURE_COOLDOWN = 2000; // 2 seconds cooldown between gestures
let cooldownInterval = null;

// Helper functions to check finger positions with improved accuracy
function isThumbUp(landmarks) {
  const thumbTip = landmarks[4];
  const thumbIP = landmarks[3];
  const thumbMCP = landmarks[2];
  return thumbTip.y < thumbIP.y && thumbIP.y < thumbMCP.y;
}

function isThumbDown(landmarks) {
  const thumbTip = landmarks[4];
  const thumbIP = landmarks[3];
  const thumbMCP = landmarks[2];
  return thumbTip.y > thumbIP.y && thumbIP.y > thumbMCP.y;
}

function isIndexUp(landmarks) {
  const indexTip = landmarks[8];
  const indexPIP = landmarks[6];
  const indexMCP = landmarks[5];
  return indexTip.y < indexPIP.y && indexPIP.y < indexMCP.y;
}

function isMiddleUp(landmarks) {
  const middleTip = landmarks[12];
  const middlePIP = landmarks[10];
  const middleMCP = landmarks[9];
  return middleTip.y < middlePIP.y && middlePIP.y < middleMCP.y;
}

function isRingUp(landmarks) {
  const ringTip = landmarks[16];
  const ringPIP = landmarks[14];
  const ringMCP = landmarks[13];
  return ringTip.y < ringPIP.y && ringPIP.y < ringMCP.y;
}

function isPinkyUp(landmarks) {
  const pinkyTip = landmarks[20];
  const pinkyPIP = landmarks[18];
  const pinkyMCP = landmarks[17];
  return pinkyTip.y < pinkyPIP.y && pinkyPIP.y < pinkyMCP.y;
}

function isFist(landmarks) {
  const fingers = [
    { tip: landmarks[8], pip: landmarks[6] },  // Index
    { tip: landmarks[12], pip: landmarks[10] }, // Middle
    { tip: landmarks[16], pip: landmarks[14] }, // Ring
    { tip: landmarks[20], pip: landmarks[18] }  // Pinky
  ];
  
  return fingers.every(finger => finger.tip.y > finger.pip.y);
}

function isHandNearShoulder(landmarks, poseLandmarks) {
  if (!poseLandmarks) return false;
  const handY = landmarks[0].y;
  const shoulderY = poseLandmarks[12].y; // Right shoulder
  const shoulderX = poseLandmarks[12].x;
  const handX = landmarks[0].x;
  
  // Check both vertical and horizontal proximity
  return Math.abs(handY - shoulderY) < 0.15 && Math.abs(handX - shoulderX) < 0.3;
}

function isHandNearHead(landmarks, poseLandmarks) {
  if (!poseLandmarks) return false;
  const handY = landmarks[0].y;
  const headY = poseLandmarks[0].y; // Nose position
  const headX = poseLandmarks[0].x;
  const handX = landmarks[0].x;
  
  // Check both vertical and horizontal proximity
  return Math.abs(handY - headY) < 0.15 && Math.abs(handX - headX) < 0.3;
}

function isHandNearThroat(landmarks, poseLandmarks) {
  if (!poseLandmarks) return false;
  const handY = landmarks[0].y;
  const throatY = poseLandmarks[0].y + 0.1; // Below nose
  const throatX = poseLandmarks[0].x;
  const handX = landmarks[0].x;
  
  // Check both vertical and horizontal proximity
  return Math.abs(handY - throatY) < 0.15 && Math.abs(handX - throatX) < 0.3;
}

// Helper function to update cooldown display
function updateCooldownDisplay(remainingTime) {
  if (remainingTime > 0) {
    gestureOutput.innerText = `Cooldown: ${(remainingTime / 1000).toFixed(1)}s`;
  } else {
    gestureOutput.innerText = "Waiting for gesture...";
  }
}

// Get webcam
navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
  video.srcObject = stream;
});

// Pose instance
const pose = new Pose({
  locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
});

pose.setOptions({
  modelComplexity: 1,
  smoothLandmarks: true,
  enableSegmentation: false,
  minDetectionConfidence: 0.7,
  minTrackingConfidence: 0.7
});

// Hands instance
const hands = new Hands({
  locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
});

hands.setOptions({
  maxNumHands: 2,
  modelComplexity: 1,
  minDetectionConfidence: 0.7,
  minTrackingConfidence: 0.7
});

// Draw landmarks
function drawLandmarks(results) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  if (results.poseLandmarks) {
    drawConnectors(ctx, results.poseLandmarks, Pose.POSE_CONNECTIONS, { color: '#00FF00' });
    drawLandmarks(ctx, results.poseLandmarks, { color: '#FF0000', radius: 2 });
  }

  if (results.multiHandLandmarks) {
    for (const landmarks of results.multiHandLandmarks) {
      drawConnectors(ctx, landmarks, Hands.HAND_CONNECTIONS, { color: '#0000FF' });
      drawLandmarks(ctx, landmarks, { color: '#FFFF00', radius: 2 });
    }
  }
}

// Update gesture list display
function updateGestureList(gestureName) {
  if (gestureName) {
    detectedGestures.add(gestureName);
  }
  
  // Clear and rebuild the gesture list
  gestureList.innerHTML = '';
  detectedGestures.forEach(gesture => {
    const gestureItem = document.createElement('div');
    gestureItem.className = `gesture-item ${gesture === gestureName ? 'active' : ''}`;
    gestureItem.textContent = gesture;
    gestureList.appendChild(gestureItem);
  });
}

// Combined results from both models
let latestPoseResults = null;
let latestHandsResults = null;
let currentGesture = null;

function checkGestures() {
  if (!latestPoseResults || !latestHandsResults) return;

  const poseLandmarks = latestPoseResults.poseLandmarks;
  const handLandmarks = latestHandsResults.multiHandLandmarks;
  let gestureName = null;

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

  if (handLandmarks && handLandmarks[0]) {
    const landmarks = handLandmarks[0];

    // Doctor (index and middle finger up, like a peace sign)
    if (isIndexUp(landmarks) && isMiddleUp(landmarks) && 
        !isRingUp(landmarks) && !isPinkyUp(landmarks) && 
        landmarks[8].y < landmarks[0].y && landmarks[12].y < landmarks[0].y) {
      gestureName = "Doctor";
    }
    // Fever (hand near forehead)
    else if (isHandNearHead(landmarks, poseLandmarks) && 
             isIndexUp(landmarks) && isMiddleUp(landmarks) &&
             landmarks[8].y < landmarks[0].y && landmarks[12].y < landmarks[0].y) {
      gestureName = "Fever";
    }
    // Chest Pain (fist near chest)
    else if (isHandNearShoulder(landmarks, poseLandmarks) && 
             isFist(landmarks) &&
             landmarks[0].y > poseLandmarks[12].y - 0.1) {
      gestureName = "Chest Pain";
    }
    // Headache (fist near head)
    else if (isHandNearHead(landmarks, poseLandmarks) && 
             isFist(landmarks) &&
             landmarks[0].y < poseLandmarks[0].y + 0.2) {
      gestureName = "Headache";
    }
    // Throat Pain (hand near throat)
    else if (isHandNearThroat(landmarks, poseLandmarks) && 
             isFist(landmarks) &&
             landmarks[0].y > poseLandmarks[0].y + 0.05) {
      gestureName = "Throat Pain";
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

    // Only update if we have a new gesture
    if (gestureName && gestureName !== currentGesture) {
      currentGesture = gestureName;
      lastGestureTime = now;
      console.log("Detected gesture:", gestureName);
      gestureOutput.innerText = `Detected: ${gestureName}`;
      updateGestureList(gestureName);
      
      // Start cooldown countdown
      cooldownInterval = setInterval(() => {
        const remainingTime = GESTURE_COOLDOWN - (Date.now() - lastGestureTime);
        if (remainingTime <= 0) {
          clearInterval(cooldownInterval);
          cooldownInterval = null;
          updateCooldownDisplay(0);
        } else {
          updateCooldownDisplay(remainingTime);
        }
      }, 100);
    } else if (!gestureName) {
      currentGesture = null;
      updateCooldownDisplay(0);
    }
  }
}

pose.onResults((results) => {
  latestPoseResults = results;
  drawLandmarks({ ...results, multiHandLandmarks: latestHandsResults?.multiHandLandmarks });
  checkGestures();
});

hands.onResults((results) => {
  console.log("Hand landmarks:", results.multiHandLandmarks);
  latestHandsResults = results;
  drawLandmarks({ ...latestPoseResults, multiHandLandmarks: results.multiHandLandmarks });
  checkGestures();
});

const camera = new Camera(video, {
  onFrame: async () => {
    await pose.send({ image: video });
    await hands.send({ image: video });
  },
  width: 640,
  height: 480,
});

camera.start();
