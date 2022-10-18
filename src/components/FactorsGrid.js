import React from "react";
import FactorSingle from "./FactorSingle";

export default function FactorsGrid({ data, cellPositions = [], tableType, onCellPositionsChange, columnCount }) {
  const [factorPositions, setFactorPositions] = React.useState({})
  const [draggingFactorID, setDraggingFactorID] = React.useState(null)
  // const [relativeCellPosition, setRelativeCellPosition] = React.useState(cellPositions)

  const windowScreenObject = window.document.documentElement

  const handleFactorDragStart = (argdata, id, factorId) => {
    setDraggingFactorID(factorId)
    setFactorPositions((prev) => ({
      ...prev,
      [factorId]: {
        ...prev[factorId],
        ...argdata  
      }
    }))
  }

  const handleFactorDrag = (ref = {}, factorId, onChange = true) => {
    const { x: factorX, y: factorY } = ref
    if (!factorX || !factorY) {
      return
    }
    const __cellPosition = factorPositions[factorId]?.relativeCellPosition
    const rowLength = __cellPosition?.length
    let arr = []

    for (let row = 0; row < rowLength; row++) {
      const colLength = __cellPosition[row]?.length
      for (let col = 0; col < colLength; col++) {
        const cell = __cellPosition[row][col]
        const factorY_value = tableType === 'GREEN'
          ? factorY - (2 * ref.height)
          : factorY

        const dist = calculateDistance(
          factorX,
          factorY_value,
          cell.x,
          cell.y,
          row,
          col
        )
        arr.push(dist)
      }
    }

    let closestCell = {}
    let closestCellRow = 0
    let closestCellCol = 0
    let minimum = Number.MAX_SAFE_INTEGER

    for (let i = 0; i < arr.length; i++) {
      const res = Math.min(minimum, arr[i].distance)
      if (res === arr[i].distance) {
        closestCell = cellPositions[arr[i].row][arr[i].col]
        closestCellRow = arr[i].row
        closestCellCol = arr[i].col
      }
      minimum = res
    }

    const inputPositions = {
      [factorId]: {
        ageId: closestCell.ageId,
        row: closestCellRow, 
        col: closestCellCol,
        value: closestCell.value
      }
    }

    onChange && onCellPositionsChange(inputPositions, tableType)
    return inputPositions
  }

  const calculateDistance = (x, y, x1, y1, row, col) => {
    const X = (x - x1) ** 2
    const Y = (y - y1) ** 2

    return { distance: parseFloat(Math.sqrt(X + Y).toFixed(2)), row, col }
  }

  const processFactorBound = () => {
    let firstPosition = {}
    if (cellPositions) {
      const { 0: firstRow } = cellPositions || []
      const { 0: firstCol } = firstRow || []
      firstPosition = firstCol || {}
    }

    const { width, height } = firstPosition

    // GREEN table values
    const leftBoundValues = [
      (windowScreenObject.clientWidth - ((3 * (width + 16)))) * -1,
      (windowScreenObject.clientWidth - ((2 * (width + 16)))) * -1
    ]
    const rightBoundValues = [
      (windowScreenObject.clientWidth - ((2 * (width + 16)) + (16 + (width * columnCount)))) * -1,
      (windowScreenObject.clientWidth - ((1 * (width + 16)) + (16 + (width * columnCount)))) * -1,
    ]
    const topBoundValues = [
      140 + (height - 4), 
      140 + (height - height - 8),
      140 + (height - height - height - 12),
      140 + (height - height - height - height - 16),
      // (windowScreenObject.clientHeight - ((height * 0) + (16) + (16) + (16) + (height * 10) + (56) + (height * 10) + (16)) + 1.25 + 1) * -1,
      // (windowScreenObject.clientHeight - ((height * -1) + (16) + (16) + (16) + (height * 10) + (56) + (height * 10) + (16)) + 1.75 + 4) * -1,
      // (windowScreenObject.clientHeight - ((height * -2) + (16) + (16) + (16) + (height * 10) + (56) + (height * 10) + (16)) + 1.75 + 8) * -1,
      // (windowScreenObject.clientHeight - ((height * -3) + (16) + (16) + (16) + (height * 10) + (56) + (height * 10) + (16)) + 1.75 + 12) * -1
      // (windowScreenObject.clientHeight - ((height * 4) + (3 * 4) + (16) + (16) + (height * 4) + (3 * 4) + 16 + (height * 10) + 56 + (height * 12)) + (3 * 4)) * -1,
      // (windowScreenObject.clientHeight - ((height * 3) + (2 * 4) + (16) + (16) + (height * 4) + (3 * 4) + 16 + (height * 10) + 56 + (height * 12)) + (3 * 4)) * -1,
      // (windowScreenObject.clientHeight - ((height * 2) + (1 * 4) + (16) + (16) + (height * 4) + (3 * 4) + 16 + (height * 10) + 56 + (height * 12)) + (3 * 4)) * -1,
      // (windowScreenObject.clientHeight - ((height * 1) + (0 * 4) + (16) + (16) + (height * 4) + (3 * 4) + 16 + (height * 10) + 56 + (height * 12)) + (3 * 4)) * -1,
    ]

    const bottomBoundValues = topBoundValues.map(i => i + (height * 10) - (56 / 2))

    // RED table values
    const leftBoundValues_RED = [
      (windowScreenObject.clientWidth - ((3 * (width + 16)))) * -1,
      (windowScreenObject.clientWidth - ((2 * (width + 16)))) * -1
    ]
    const rightBoundValues_RED = [
      (windowScreenObject.clientWidth - ((2 * (width + 16)) + (16 + (width * columnCount)))) * -1,
      (windowScreenObject.clientWidth - ((1 * (width + 16)) + (16 + (width * columnCount)))) * -1,
    ]
    const bottomBoundValues_RED = [
      -166 + (height + height + height + height + 16),
      -166 + (height + height + height + 12),
      -166 + (height + height + 8),
      -166 + (height + 4),
      // (windowScreenObject.clientHeight - ((height * 0) + (1 * 4) + (16) + (16) + (height * 4) + (3 * 4) + 16 + (height * 10) + 56 + (height * 12)) + (3 * 4)),
      // (windowScreenObject.clientHeight - ((height * 1) + (2 * 4) + (16) + (16) + (height * 4) + (3 * 4) + 16 + (height * 10) + 56 + (height * 12)) + (3 * 4)),
      // (windowScreenObject.clientHeight - ((height * 2) + (3 * 4) + (16) + (16) + (height * 4) + (3 * 4) + 16 + (height * 10) + 56 + (height * 12)) + (3 * 4)),
      // (windowScreenObject.clientHeight - ((height * 3) + (4 * 4) + (16) + (16) + (height * 4) + (3 * 4) + 16 + (height * 10) + 56 + (height * 12)) + (3 * 4))
    ]
    const topBoundValues_RED = bottomBoundValues_RED.map(i => (Math.abs(i) + (height * 10) - (56 / 2) - 4) * -1)
    let __factorPositions = { ...factorPositions }
    const result = data.map((item, index) => {
      const boundsMaster = {
        GREEN: {
          left: leftBoundValues[item.colIndex],
          right: rightBoundValues[item.colIndex],
          top: topBoundValues[item.rowIndex],
          bottom: bottomBoundValues[item.rowIndex]
        },
        RED: {
          left: leftBoundValues_RED[item.colIndex],
          right: rightBoundValues_RED[item.colIndex],
          top: topBoundValues_RED[item.rowIndex],
          bottom: bottomBoundValues_RED[item.rowIndex]
        }
      }

      const __cellPositions = [...cellPositions]
      const newCellPositions = []
      const boundX = boundsMaster[tableType]?.left
      const boundY = boundsMaster[tableType]?.top
      __cellPositions.forEach((row, rowIndex) => {
        const updatedRow = []
        row.forEach((col, colIndex) => {
          const newCol = {
            x: boundX + (width * rowIndex),
            y: boundY + (height * colIndex)
          }
          updatedRow.push(newCol)
        })
        newCellPositions.push(updatedRow)
      })

      __factorPositions = {
        ...__factorPositions,
        [item.factorId]: {
          ...__factorPositions[item.factorId],
          relativeCellPosition: newCellPositions
        }
      }

      return {
        ...item,
        bounds: boundsMaster[tableType],
        width,
        height,
        grid: [width, height]
      }
    })

    setFactorPositions((prev) => ({
      ...prev,
      ...__factorPositions
    }))

    return result
  }

  const factorsData = React.useMemo(() => {
    if (cellPositions && cellPositions?.length > 0) {
      return processFactorBound()
    }
    return []
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cellPositions?.length])

  if (factorsData?.length === 0) return null

  // const tempFactorPos = { ...(!!factorPositions[draggingFactorID] ? { ...factorPositions[draggingFactorID] } : {}) }
  // const { x, y } = tempFactorPos
  // const { height: tempHeight, x: nodeX, y: nodeY } = tempFactorPos?.node?.getBoundingClientRect() || {}
  // console.log(x, y, nodeX, nodeY, draggingFactorID)
  // tempFactorPos.height = tempHeight
  // const updatedPosition = { x, y }

  return (
    <div>
      <div className="handler grid grid-cols-2 gap-x-4 gap-y-1 bg-green">
        {factorsData.map((item, index) => (
          <FactorSingle
            id={index}
            key={index}
            factorId={item.factorId}
            height={item.height}
            width={item.width}
            background={item.background}
            text={item.text}
            positionOffset={item.posOffset}
            updatedPosition={{}}
            defaultPosition={item.defaultPosition}
            grid={item.grid}
            bounds={item.bounds}
            onFactorDragStop={handleFactorDrag}
            onFactorDragStart={handleFactorDragStart}
          />
        ))}
      </div>
    </div>
  );
}
