import React from "react";
import FactorSingle from "./FactorSingle";

export default function FactorsGrid({ 
  data, 
  cellPositions = [], 
  tableType, 
  columnCount,
  onCellPositionsChange,
  onFactorInputChange,
  onGridChange,
}) {
  const windowScreenObject = window.document.documentElement
  const [factorPositions, setFactorPositions] = React.useState({})
  const [updateFactorPositions, setUpdateFactorPositions] = React.useState({})
  const [filledGrid, setFilledGrid] = React.useState([])

  React.useEffect(() => {
    if (cellPositions.length > 0) {
      const grid = []
      for (let row = 0; row < cellPositions.length; row++) {
        const colN = cellPositions[row].length
        const columns = []
        for (let col = 0; col < colN; col++) {
          columns.push('')
        }
        grid.push(columns)
      }
      setFilledGrid(grid)
    }
  }, [cellPositions])

  const handleFactorDragStart = (argdata, id, factorId) => {
    setFactorPositions((prev) => ({
      ...prev,
      [factorId]: {
        ...prev[factorId],
        ...argdata  
      }
    }))
  }

  const findClosestCell = (factorX, factorY, grid, row, col, rowLength, colLength) => {
    let closestCellToFactor = null
    let closestCellToFactorRow = -1
    let closestCellToFactorCol = -1

    let minimum = Number.MAX_SAFE_INTEGER
    let R = row
    let C = col

    if (filledGrid[R][C] !== '') {
      return
    }

    const dist = calculateDistance(
      factorX,
      factorY,
      grid[R][C].x,
      grid[R][C].y,
      row,
      col
    )
    const res = Math.min(minimum, dist.distance)
    if (res === dist.distance && filledGrid[dist.row][dist.col] === '') {
      closestCellToFactor = grid[dist.row][dist.col]
      closestCellToFactorRow = dist.row
      closestCellToFactorCol = dist.col
    }
    minimum = res
    if (
      closestCellToFactor && 
      typeof closestCellToFactor?.x !== 'undefined' && 
      typeof closestCellToFactor?.y !== 'undefined'
    ) {
      return {
        cell: closestCellToFactor,
        row: closestCellToFactorRow,
        col: closestCellToFactorCol,
      }
    }
    return null
  }

  const handleFactorDrag = (data = {}, ref = {}, factorId, onChange = true) => {
    const { x: factorX, y: factorY } = data
    const { x: refX, y: refY } = ref

    if (
      typeof factorX === 'undefined' || 
      typeof factorY === 'undefined'  || 
      typeof refX === 'undefined'  || 
      typeof refY === 'undefined'
    ) {
      return
    }

    const __cellPosition = factorPositions[factorId]?.relativeCellPosition
    const rowLength = __cellPosition?.length

    let closestCell = {}
    let closestCellRow = -1
    let closestCellCol = -1
    let cellWidth = 0
    let cellHeight = 0
    let shouldBreak = false

    for (let row = 0; row < rowLength; row++) {
      const colLength = __cellPosition[row]?.length
      for (let col = 0; col < colLength; col++) {
        const cell = __cellPosition[row][col]
        if ((cell.x === factorX) && (cell.y === factorY) && filledGrid[row][col] === '') {
          closestCell = cell
          closestCellRow = row
          closestCellCol = col
          shouldBreak = true
          cellWidth = cell.width
          cellHeight = cell.height
          break
        } else {
          const result = findClosestCell(factorX, factorY, __cellPosition, row, col, rowLength, colLength)
          if (!result) {
            continue
          }

          const {
            cell: _closestCellToFactor,
            row: _closestCellToFactorRow,
            col: _closestCellToFactorCol
          } = result

          closestCell = _closestCellToFactor
          closestCellRow = _closestCellToFactorRow
          closestCellCol = _closestCellToFactorCol
          cellWidth = _closestCellToFactor.width
          cellHeight = _closestCellToFactor.height
        }
      }

      if (shouldBreak) {
        break
      }
    }

    let __filledGrid = [...filledGrid]
    if (updateFactorPositions[factorId]) {
      const prevFilledRow = updateFactorPositions[factorId]?.row
      const prevFilledCol = updateFactorPositions[factorId]?.col
      if (
        (typeof prevFilledRow !== 'undefined' && typeof prevFilledCol !== 'undefined') &&
        (closestCellRow > -1 && closestCellCol > -1) &&
        (prevFilledRow > -1 && prevFilledCol > -1)
        ) {
        if (closestCellRow === prevFilledRow && closestCellCol !== prevFilledCol) {
          __filledGrid[prevFilledRow][prevFilledCol] = ''
        } else if (closestCellRow !== prevFilledRow && closestCellCol === prevFilledCol) {
          __filledGrid[prevFilledRow][prevFilledCol] = ''
        } else if (closestCellRow !== prevFilledRow && closestCellCol !== prevFilledCol) {
          __filledGrid[prevFilledRow][prevFilledCol] = ''
          setFilledGrid(__filledGrid)
        }
      }
    }

    if (closestCellRow === -1 && closestCellCol === -1) {
      return
    }

    console.log(closestCellRow, closestCellCol)
    __filledGrid[closestCellRow][closestCellCol] = factorId
    const inputPositions = [
      closestCell.ageId,
      {
        ageId: closestCell.ageId,
        factorId: factorId,
        row: closestCellRow,
        col: closestCellCol,
        value: closestCell.value,
        relativeX: refX,
        relativeY: refY,
        factorX,
        factorY,
        width: cellWidth,
        height: cellHeight
      }
    ]

    setFilledGrid(__filledGrid)
    setUpdateFactorPositions((prev) => ({
      ...prev,
      [factorId]: {
        ...prev[factorId],
        row: closestCellRow,
        col: closestCellCol,
        x: closestCell?.x,
        y: closestCell?.y,
        isCellFilled: true
      }
    }))
    onChange && onGridChange(__filledGrid, tableType)
    onChange && onCellPositionsChange(inputPositions, tableType)
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
      (windowScreenObject.clientWidth - ((4 * (width + 16)))) * -1,
      (windowScreenObject.clientWidth - ((3 * (width + 16)))) * -1,
      (windowScreenObject.clientWidth - ((2 * (width + 16)))) * -1
    ]
    const rightBoundValues = [
      (windowScreenObject.clientWidth - ((3 * (width + 16)) + (16 + (width * columnCount)))) * -1,
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
      (windowScreenObject.clientWidth - ((4 * (width + 16)))) * -1,
      (windowScreenObject.clientWidth - ((3 * (width + 16)))) * -1,
      (windowScreenObject.clientWidth - ((2 * (width + 16)))) * -1
    ]
    const rightBoundValues_RED = [
      (windowScreenObject.clientWidth - ((3 * (width + 16)) + (16 + (width * columnCount)))) * -1,
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
            ...col,
            x: boundX + (width * colIndex),
            y: boundY + (height * rowIndex)
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

  return (
    <div>
      <div className="handler grid grid-cols-3 gap-x-4 gap-y-1 bg-green">
        {factorsData.map((item, index) => (
          <FactorSingle
            id={index}
            inputFactor={item.isInput}
            key={index}
            factorId={item.factorId}
            height={item.height}
            width={item.width}
            border={item.borderColor}
            background={item.background}
            text={item.text}
            positionOffset={item.posOffset}
            updatedPosition={updateFactorPositions[item.factorId]}
            defaultPosition={item.defaultPosition}
            grid={item.grid}
            bounds={item.bounds}
            tableType={tableType}
            onFactorDragStop={handleFactorDrag}
            onFactorDragStart={handleFactorDragStart}
            onFactorInputChange={onFactorInputChange}
          />
        ))}
      </div>
    </div>
  );
}
