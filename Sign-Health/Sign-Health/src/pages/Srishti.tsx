import React, { useEffect, useRef } from 'react';
import { initializeTracking } from '../lib/srishti-tracking';

const Srishti: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gestureOutputRef = useRef<HTMLDivElement>(null);
  const gestureListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!videoRef.current || !canvasRef.current) return;

    // Set canvas dimensions
    const canvas = canvasRef.current;
    canvas.width = 640;
    canvas.height = 480;

    // Initialize tracking
    const cleanup = initializeTracking(
      videoRef,
      canvasRef,
      gestureOutputRef,
      gestureListRef
    );

    // Cleanup on unmount
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Srishti - Sign Language Recognition
          </h1>
          <p className="text-xl text-gray-600">
            Use your hands to communicate medical signs
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
          <div className="relative w-[640px] h-[480px] mx-auto">
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              width={640}
              height={480}
              playsInline
            />
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full"
              width={640}
              height={480}
            />
          </div>

          <div className="mt-6 text-center">
            <div
              ref={gestureOutputRef}
              className="text-2xl font-semibold text-gray-800 mb-4"
            >
              Waiting for gesture...
            </div>
            <div
              ref={gestureListRef}
              className="flex flex-wrap gap-2 justify-center"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Available Gestures
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Doctor</h3>
              <p className="text-gray-600">
                Raise your index and middle fingers together (peace sign)
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Fever</h3>
              <p className="text-gray-600">
                Place your open palm on your forehead
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Chest Pain</h3>
              <p className="text-gray-600">
                Make a fist and place it near your chest
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Srishti; 