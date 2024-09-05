// RingSizer.jsx
import { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import * as handpose from '@tensorflow-models/handpose';
import '@tensorflow/tfjs-backend-webgl';
import { drawRing } from './utilities';
import './Design.css'; // Import custom styles for the layout

const RingSizer = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const captureCanvasRef = useRef(null);  // For captured image
  const [ringSize, setRingSize] = useState(null);
  const [selectedFinger, setSelectedFinger] = useState("indexFinger");
  const [handCoordinates, setHandCoordinates] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);  // Store the captured image

  // Adjust canvas size to match webcam video size
  const setCanvasSize = () => {
    const video = webcamRef.current.video;
    const canvas = canvasRef.current;
    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    }
  };

  useEffect(() => {
    const runHandpose = async () => {
      const net = await handpose.load();

      setInterval(() => {
        detect(net);
      }, 100); // Runs the hand detection every 100ms
    };

    const detect = async (net) => {
      if (
        typeof webcamRef.current !== "undefined" &&
        webcamRef.current !== null &&
        webcamRef.current.video.readyState === 4
      ) {
        const video = webcamRef.current.video;

        // Ensure the canvas size is set correctly
        setCanvasSize();

        // Detect hand landmarks
        const hand = await net.estimateHands(video);

        if (hand.length > 0) {
          setHandCoordinates(hand[0].landmarks);  // Store detected hand landmarks

          // Mockup data for ring size (can be dynamic based on actual measurements)
          const sizes = {
            thumb: 9,
            indexFinger: 7,
            middleFinger: 8,
            ringFinger: 7,
            pinky: 6,
          };
          
          setRingSize(sizes[selectedFinger]);
        }
      }
    };

    runHandpose();
  }, [selectedFinger]);

  // Draw the ring on the canvas based on hand coordinates
  useEffect(() => {
    if (handCoordinates) {
      drawRing(handCoordinates, selectedFinger, canvasRef);
    }
  }, [handCoordinates, selectedFinger]);

  // Capture image from the webcam and display it on a separate canvas
  const captureImage = () => {
    // Capture image from the webcam
    const imageSrc = webcamRef.current.getScreenshot();
    
    // Store the captured image
    setCapturedImage(imageSrc);
  
    // Once the image is captured, draw it on the captureCanvas
    if (captureCanvasRef.current && imageSrc) {
      const captureCanvas = captureCanvasRef.current;
      const ctx = captureCanvas.getContext("2d");
      
      // Get the video dimensions
      const video = webcamRef.current.video;
      if (video) {
        captureCanvas.width = video.videoWidth;
        captureCanvas.height = video.videoHeight;
      }

      // Create an Image object to load the captured image
      const img = new Image();
      img.src = imageSrc;

      img.onload = () => {
        // Clear the canvas before drawing
        ctx.clearRect(0, 0, captureCanvas.width, captureCanvas.height);

        // Draw the captured image on the canvas
        ctx.drawImage(img, 0, 0, captureCanvas.width, captureCanvas.height);

        // If we have hand coordinates, draw the ring on top of the captured image without clearing
        if (handCoordinates) {
          drawRing(handCoordinates, selectedFinger, captureCanvasRef, false);
        }
      };
    }
  };

  return (
    <div className="container">
      <div className="webcam-container">
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="webcam"
        />
        <canvas
          ref={canvasRef}
          className="overlay-canvas"
        />
      </div>

      <div className="controls">
        <label>Select Finger: </label>
        <select onChange={(e) => setSelectedFinger(e.target.value)} value={selectedFinger}>
          <option value="thumb">Thumb</option>
          <option value="indexFinger">Index Finger</option>
          <option value="middleFinger">Middle Finger</option>
          <option value="ringFinger">Ring Finger</option>
          <option value="pinky">Pinky</option>
        </select>

        {ringSize && (
          <div className="ring-size">
            <h3>Detected Ring Size: {ringSize}</h3>
          </div>
        )}

        <button className="capture-button" onClick={captureImage}>
          Capture Image
        </button>
      </div>

      {capturedImage && (
        <div className="captured-image-container">
          <h3>Captured Image:</h3>
          <canvas
            ref={captureCanvasRef}
            className="captured-canvas"
            // Removed fixed width and height to allow dynamic sizing
          />
        </div>
      )}
    </div>
  );
};

export default RingSizer;
