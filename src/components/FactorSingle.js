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
  position,
  handle,
  factorId,
  positionOffset,
  restrictedSelectors,
  defaultPosition,
  updatedFactorPositions,
  onFactorDragStop,
  onFactorDragStart,
  onFactorRefLoad
}) {
  const nodeRef = React.useRef(null)

  React.useEffect(() => {
    if (nodeRef && nodeRef.current) {
      const boundObject = nodeRef.current?.getBoundingClientRect()
      onFactorRefLoad(boundObject)
    }
  }, [nodeRef])

  const handleOnStart = (e, data) => {
    if (updatedFactorPositions[`${data.x}x${data.y}`] && (updatedFactorPositions[`${data.x}x${data.y}`] !== factorId)) {
      return false
    }
    const boundObject = nodeRef.current?.getBoundingClientRect()
    onFactorDragStart(e, data, id, boundObject, factorId)
  }

  const handleOnStop = (e, data) => {
    const boundObject = nodeRef.current?.getBoundingClientRect()
    onFactorDragStop(data, id, boundObject, factorId)
  }

  return (
    <Draggable
      handle={'.handler-'+id}
      bounds={bounds}
      nodeRef={nodeRef}
      grid={grid}
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
