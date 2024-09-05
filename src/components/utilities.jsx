// utilities.jsx
export const drawRing = (hand, selectedFinger, canvasRef, shouldClear = true) => {
  const canvas = canvasRef.current;
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  if (shouldClear) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  const fingerIndexes = {
    thumb: 3,         // Knuckle region
    indexFinger: 6,   // Mid-index
    middleFinger: 10, // Mid-middle finger
    ringFinger: 14,   // Mid-ring finger
    pinky: 18         // Mid-pinky
  };

  const index = fingerIndexes[selectedFinger];
  const [x, y] = hand[index];  // Coordinates of the selected finger at the mid-finger position

  // Function to draw a rounded rectangle (curved rectangular ring)
  const drawRoundedRect = (x, y, width, height, radius) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fillStyle = '#FFD700';  // Gold color for the ring
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#FFD700';  // Outline for the ring
    ctx.stroke();
  };

  // Set the rounded rectangle dimensions and position
  const rectWidth = 40;   // Width of the ring strip
  const rectHeight = 15;  // Height of the ring strip (slightly curved)
  const rectX = x - rectWidth / 2;  // Center the rectangle horizontally on the x-coordinate
  const rectY = y - rectHeight / 2; // Slightly above or around the y-coordinate
  const borderRadius = 10; // How much the corners are rounded, adjust for curvature

  // Draw the curved rectangular ring
  drawRoundedRect(rectX, rectY, rectWidth, rectHeight, borderRadius);
};
