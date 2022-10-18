import React from "react";
import FactorSingle from "./FactorSingle";

export default function FactorsGrid({ data, cellPositions = [], tableType, onCellPositionsChange, columnCount }) {
  const [factorPositions, setFactorPositions] = React.useState({})
  const windowScreenObject = window.document.documentElement

  const handleFactorDragStart = (argdata, id, factorId) => {
    setFactorPositions((prev) => ({
      ...prev,
      [factorId]: {
        ...argdata  
      }
    }))
  }

  const handleFactorDrag = (ref = {}, factorId, onChange = true) => {
    const { x: factorX, y: factorY } = ref
    if (!factorX || !factorY) {
      return
    }
  
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
      (windowScreenObject.clientWidth - ((width + 16) + (16 + (width * columnCount)))) * -1,
    ]
    const topBoundValues = [
      // upperfactors + upperfactor gaps + body-padding + body-padding + lowerfactors + lowerfactors gaps 
      // + margin + lower table header + lower table rows + center separator
      // + upper table rows + upper table header + gaps
      (windowScreenObject.clientHeight - ((height * 4) + (3 * 4) + (16) + (16) + (height * 4) + (3 * 4) + 16 + (height * 10) + 56 + (height * 12)) + (3 * 4)) * -1,
      (windowScreenObject.clientHeight - ((height * 3) + (2 * 4) + (16) + (16) + (height * 4) + (3 * 4) + 16 + (height * 10) + 56 + (height * 12)) + (3 * 4)) * -1,
      (windowScreenObject.clientHeight - ((height * 2) + (1 * 4) + (16) + (16) + (height * 4) + (3 * 4) + 16 + (height * 10) + 56 + (height * 12)) + (3 * 4)) * -1,
      (windowScreenObject.clientHeight - ((height * 1) + (0 * 4) + (16) + (16) + (height * 4) + (3 * 4) + 16 + (height * 10) + 56 + (height * 12)) + (3 * 4)) * -1,
    ]

    const bottomBoundValues = topBoundValues.map(i => i + (height * 10) - (56 / 2))

    // RED table values
    const leftBoundValues_RED = [
      ...leftBoundValues
    ]
    const rightBoundValues_RED = [
      ...rightBoundValues
    ]
    const bottomBoundValues_RED = [
      // Client Height -  lower factors height + lower factors gaps + body-padding + body-padding + upper factros height + upper factros gaps 
      // + upper table rows height + separator height + lower table rows height + loewer table header + gaps
      (windowScreenObject.clientHeight - ((height * 0) + (1 * 4) + (16) + (16) + (height * 4) + (3 * 4) + 16 + (height * 10) + 56 + (height * 12)) + (3 * 4)),
      (windowScreenObject.clientHeight - ((height * 1) + (2 * 4) + (16) + (16) + (height * 4) + (3 * 4) + 16 + (height * 10) + 56 + (height * 12)) + (3 * 4)),
      (windowScreenObject.clientHeight - ((height * 2) + (3 * 4) + (16) + (16) + (height * 4) + (3 * 4) + 16 + (height * 10) + 56 + (height * 12)) + (3 * 4)),
      (windowScreenObject.clientHeight - ((height * 3) + (4 * 4) + (16) + (16) + (height * 4) + (3 * 4) + 16 + (height * 10) + 56 + (height * 12)) + (3 * 4))
    ]
    // bottom value + table row height - center separtor height - lower factor gap
    const topBoundValues_RED = bottomBoundValues_RED.map(i => (Math.abs(i) + (height * 10) - (56 / 2) - 4) * -1)

    return data.map((item, index) => {
      const { x, y } = factorPositions[item.factorId] || {}
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

      const tempFactorPos = { ...factorPositions[item.factorId] }
      // const { height } = factorPositions[item.factorId]?.node?.getBoundingClientRect() || {}
      tempFactorPos.height = 27
      const pos = handleFactorDrag(tempFactorPos, item.factorId, false)
      console.log(pos)
      return {
        ...item,
        bounds: boundsMaster[tableType],
        width,
        height,
        position: {
          x,
          y
        },
        grid: [width, height]
      }
    })
  }

  const factorsData = React.useMemo(() => {
    return processFactorBound()
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
            height={item.height}
            width={item.width}
            background={item.background}
            text={item.text}
            positionOffset={item.posOffset}
            updatedPosition={item.position}
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
