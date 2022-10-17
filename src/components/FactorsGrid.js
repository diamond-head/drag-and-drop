import React from "react";
import FactorSingle from "./FactorSingle";

export default function FactorsGrid({ data, cellPositions = [], bounds, tableType, onCellPositionsChange, isFutureStory }) {
  const [factorPositions, setFactorPositions] = React.useState([])
  const [updatedFactorPositions, setUpdatedFactorPositions] = React.useState({})
  const windowScreenObject = document.querySelector('body').getBoundingClientRect()

  const handleFactorRefLoad = (ref) => {
    if (ref) {
      setFactorPositions((prev) => ([...prev, ref]))
    }
  }

  const handleFactorDragStart = (argdata, id, ref, factorId) => {
    const { x: factorX, y: factorY } = ref
    setUpdatedFactorPositions((prev) => ({
      ...prev,
      [`${factorX}x${factorY}`]: factorId
    }))
  }

  const handleFactorDrag = (argdata, id, ref, factorId) => {
    const { x: factorX, y: factorY } = ref
    const rowLength = cellPositions.length
    let arr = []

    for (let row = 0; row < rowLength; row++) {
      const colLength = cellPositions[row].length
      for (let col = 0; col < colLength; col++) {
        const cell = cellPositions[row][col]
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

    onCellPositionsChange(inputPositions, tableType)
  }

  const calculateDistance = (x, y, x1, y1, row, col) => {
    const X = (x - x1) ** 2
    const Y = (y - y1) ** 2

    return { distance: parseFloat(Math.sqrt(X + Y).toFixed(2)), row, col }
  }

  const boundTop = (item, firstTop, factorTop, height, N) => { 
    let top = (factorTop + (height * ((N / 2) - (item.rowIndex)))) + (4 * ((N / 2) - (item.rowIndex))) 
    const dy = (firstTop - top)
    return dy
  }

  const processFactorBound = () => {
    let firstPosition = {}
    let lastPosition = {}
    if (cellPositions) {
      const { 0: firstRow, length, [length - 1]: lastRow } = cellPositions || []
      const { 0: firstCol } = firstRow || []
      const { length: _length, [_length - 1]: lastCol } = lastRow || []
  
      firstPosition = firstCol || {}
      lastPosition = lastCol || {}
    }

    const { left: firstLeft, top: firstTop, right: firstRight, bottom: firstBottom, width, height } = firstPosition
    const { left: lastLeft, top: lastTop, right: lastRight, bottom: lastBottom } = lastPosition
    // GREEN table values
    const leftBoundValues = [
      (windowScreenObject.width - ((3 * width) + (16 * 3) + 1)) * -1,
      (windowScreenObject.width - ((2 * width) + (16 * 2) + 1)) * -1
    ]

    const rightBoundValues = [
     isFutureStory ? ((2 * width) - 36) * -1 : ((3 * width) - 36) * -1, 
     isFutureStory ? ((2 * width) - 19) * -1 : ((4 * width) - 19) * -1
    ]
    const topBoundValues = [
      140 + (height - 4), 
      140 + (height - height - 8),
      140 + (height - height - height - 12),
      140 + (height - height - height - height - 16)
    ]

    const bottomBoundValues = topBoundValues.map(i => i + (height * 10) - 25)

    // RED table values
    const leftBoundValues_RED = [
      (windowScreenObject.width - ((3 * width) + (16 * 3) + 1)) * -1,
      (windowScreenObject.width - ((2 * width) + (16 * 2) + 1)) * -1
    ]
    const rightBoundValues_RED = [
      isFutureStory ? ((2 * width) - 36) * -1 : ((3 * width) - 36) * -1, 
      isFutureStory ? ((2 * width) - 19) * -1 : ((4 * width) - 19) * -1
    ]
    const bottomBoundValues_RED = [
      -166 + (height + height + height + height + 16),
      -166 + (height + height + height + 12),
      -166 + (height + height + 8),
      -166 + (height + 4)
    ]
    const topBoundValues_RED = bottomBoundValues_RED.map(i => (Math.abs(i) + (height * 10) - 25) * -1)
    //
    // const grids = [
    //   [width + 0, height + 0],
    //   [width + 0, height + 0],
    //   [width + 0, height - 1],
    //   [width + 0, height + 0],
    //   [width + 0, height - 2],
    //   [width + 0, height + 0],
    //   [width + 0, height - 3],
    //   [width + 0, height + 0]
    // ]

    return data.map((item, index, arr) => {
      const { right: factorRight, left: factorLeft, bottom: factorBottom, top: factorTop } = factorPositions[index] || {}
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

      return {
        ...item,
        bounds: boundsMaster[tableType],
        width,
        height,
        posOffset: {
          x: 0,
          y: 0
        },
        position: {
          x: (windowScreenObject.width * -1),
          y: (windowScreenObject.height * -1)
        },
        defaultPosition: {
          x: (windowScreenObject.width * -1),
          y: (windowScreenObject.height * -1)
        },
        // grid: [51, 13.1],
        grid: [width + 0, height + 0]
      }
    })
  }

  const factorsData = React.useMemo(() => {
    return processFactorBound()
  }, [cellPositions, factorPositions])

  if (factorsData.length === 0) return null

  return (
    <div>
      <div className="handler grid grid-cols-2 gap-x-4 gap-y-1 bg-green">
        {factorsData.map((item, index) => (
          <FactorSingle
            id={index}
            key={index}
            factorId={item.factorId}
            handle={'.handler'}
            height={item.height}
            width={item.width}
            background={item.background}
            text={item.text}
            positionOffset={item.posOffset}
            restrictedSelectors={
              tableType === 'GREEN'
                ? '.green-table-header, .green-table-body-value, .arrow-center, .red-table-container'
                : '.green-table-table, .arrow-center-container'
            }
            position={item.position}
            defaultPosition={item.defaultPosition}
            grid={item.grid}
            bounds={item.bounds}
            updatedFactorPositions={updatedFactorPositions}
            onFactorRefLoad={handleFactorRefLoad}
            onFactorDragStop={handleFactorDrag}
            onFactorDragStart={handleFactorDragStart}
          />
        ))}
      </div>
    </div>
  );
}
