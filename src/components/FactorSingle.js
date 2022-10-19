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
  inputFactor,
  tableType,
  border,
  updatedPosition,
  onFactorDragStop,
  onFactorDragStart,
  onFactorInputChange
}) {
  const [inputText, setInputText] = React.useState('')
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
    onFactorDragStop(data, boundObject, factorId)
  }

  const handleFactorInputChange = (e) => {
    setInputText(e.target.value)
    onFactorInputChange(e.target.value, factorId, tableType)
  }

  const newPos = (!!updatedPosition && !!updatedPosition.x && !!updatedPosition.y) ? updatedPosition : null

  return (
    <Draggable
      {...(newPos ? { position: { ...newPos } } : {})}
      bounds={bounds}
      nodeRef={nodeRef}
      grid={grid}
      onDrag={handleDrag}
      onStart={handleOnStart}
      onStop={handleOnStop}
    >
      <div
        ref={nodeRef}
        className={`${background} flex justify-center text-center cursor-move handler-${background}-${id}`}
        style={{ width, height }}
      >
        {inputFactor ? (
          <span className="text-xs">
            <input style={{ width, height }} type="text" onChange={handleFactorInputChange} value={inputText} className={`p-1 border ${border}`} />
          </span>
        ): (
          <span className="text-white text-xs">
            {text}
          </span>
        )}
      </div>
    </Draggable>
  );
}
