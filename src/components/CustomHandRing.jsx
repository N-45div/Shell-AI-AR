import { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { DndProvider } from "react-dnd";
import { Rnd } from "react-rnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./Design2.css";

const RingItem = ({ ring, index }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ring",
    item: { index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <img
      ref={drag}
      src={ring.src}
      alt={`Ring ${index}`}
      className="ring-item"
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
      }}
    />
  );
};

const HandDropArea = ({ handImage, rings, onDropRing, onResizeRing }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "ring",
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      onDropRing(item.index, offset);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div className="hand-drop-area" ref={drop}>
      <img src={handImage} alt="Hand" className="hand-image" />
      {rings.map((ring, index) => (
        <Rnd
          key={index}
          default={{
            x: ring.position.left,
            y: ring.position.top,
            width: ring.size.width,
            height: ring.size.height,
          }}
          bounds="parent"
          onDragStop={(e, d) => onDropRing(index, { x: d.x, y: d.y })}
          onResizeStop={(e, direction, ref, delta, position) => {
            onResizeRing(index, {
              width: ref.style.width,
              height: ref.style.height,
              ...position,
            });
          }}
        >
          <img
            src={ring.src}
            alt={`Ring ${index}`}
            className="placed-ring"
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </Rnd>
      ))}
    </div>
  );
};

const CustomHandRing = () => {
  const [handImage, setHandImage] = useState(null);
  const [rings, setRings] = useState([
    {
      id: 1,
      src: "/public/rings/ring.png",
      position: { top: 0, left: 0 },
      size: { width: 50, height: 50 },
    },
    {
      id: 2,
      src: "/public/rings/ring.png",
      position: { top: 0, left: 0 },
      size: { width: 50, height: 50 },
    },
  ]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setHandImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleRingDrop = (ringIndex, offset) => {
    const updatedRings = rings.map((ring, index) =>
      index === ringIndex
        ? { ...ring, position: { top: offset.y, left: offset.x } }
        : ring
    );
    setRings(updatedRings);
  };

  const handleRingResize = (ringIndex, size) => {
    const updatedRings = rings.map((ring, index) =>
      index === ringIndex
        ? { ...ring, size: { width: parseInt(size.width), height: parseInt(size.height) }, position: { top: size.y, left: size.x } }
        : ring
    );
    setRings(updatedRings);
  };

  const handleSave = () => {
    // Save the design to localStorage or backend
    alert("Design saved!");
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="custom-ring-app">
        <h2>Custom Hand Ring Designer</h2>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {handImage && (
          <div className="ring-designer">
            <HandDropArea
              handImage={handImage}
              rings={rings}
              onDropRing={handleRingDrop}
              onResizeRing={handleRingResize}
            />
          </div>
        )}

        {/* Ring Carousel */}
        <div className="ring-carousel">
          {rings.map((ring, index) => (
            <RingItem key={index} ring={ring} index={index} />
          ))}
        </div>

        {handImage && (
          <button onClick={handleSave} className="save-button">
            Save Design
          </button>
        )}
      </div>
    </DndProvider>
  );
};

export default CustomHandRing;
