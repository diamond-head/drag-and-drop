import React from "react";
import Draggable from "react-draggable";

export default function FactorSingle({ 
  id, 
  background, 
  text, 
  bounds,
  grid,
  height,
  width,
  factorId,
  // position,
  // positionOffset,
  updatedPosition = {},
  onFactorDragStop,
  onFactorDragStart
}) {
  const [position, setPosition] = React.useState({})
  const nodeRef = React.useRef(null)

  const handleDrag = (e, data) => {
    onFactorDragStart(data, id, factorId)
    setPosition(data)
  }
  
  const handleOnStart = (e, data) => {
    setPosition(data)
    const boundObject = nodeRef.current?.getBoundingClientRect()
    onFactorDragStart(data, id, factorId, boundObject)
  }

  const handleOnStop = (e, data) => {
    setPosition(data)
    const boundObject = nodeRef.current?.getBoundingClientRect()
    onFactorDragStop(boundObject, factorId)
  }

  const newPos = (!!updatedPosition.x && !!updatedPosition.y && updatedPosition.factorId === factorId) ? updatedPosition : position
  // newPos = Object.keys(newPos).length > 0 ? newPos : {}

  return (
    <Draggable
      // {...(!!newPos.x && !!newPos.y ? { position: { ...newPos } } : {})}
      bounds={bounds}
      nodeRef={nodeRef}
      grid={grid}
      onDrag={handleDrag}
      onStart={handleOnStart}
      onStop={handleOnStop}
    >
      <div
        ref={nodeRef}
        className={`${background} flex justify-center text-center cursor-move handler-${id}`}
        style={{ width, height }}
      >
        <span className="text-white text-xs">
          {text}
        </span>
      </div>
    </Draggable>
  );
}
