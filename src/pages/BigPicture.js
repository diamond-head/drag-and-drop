import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DropBoard from "../components/DropBoard";
// import FactorsGrid from "../components/FactorsGrid";
import { FactorItemsGreen, FactorItemsRed } from '../data/FactorItems'
import { setCellPositions } from '../store/features/storyInfo'
import { PRESENT_TABLE_DATA } from "../data/TableConstants";

export default function BigPicture() {
  const userInfo = useSelector(state => state.userInfo)
  const storyInfo = useSelector(state => state.storyInfo)

  const dispatch = useDispatch()

  const onRecordCellPositions = (positions, tableType) => {
    dispatch(setCellPositions({ positions, tableType }))
  }

  const processSummaryData = () => {
      const storySoFarInputs = storyInfo?.value?.storySoFarInput
      const redStorySoFarInput = storyInfo?.value?.redStorySoFarInput
      const futureConfidenceInput = storyInfo?.value?.futureConfidenceInput
      const redCellFutureConfidenceInput = storyInfo?.value?.redCellFutureConfidenceInput
      const cellPositions = storyInfo?.value?.cellPositions
      const redCellPositions = storyInfo?.value?.redCellPositions
  
      let mergedValues = Object.keys(storySoFarInputs).reduce((acc, c) => {
        const obb = { ...storySoFarInputs[c] }
        const arr = Object.keys(obb).reduce((_acc, _c) => {
          return [..._acc, obb[_c]]
        }, [])
        acc = [...acc, ...arr]
        return acc
      }, []).map(i => ({ ...i, from: 'PRESENT' }))

      mergedValues = Object.keys(futureConfidenceInput).reduce((acc, c) => {
        const obb = { ...futureConfidenceInput[c] }
        const arr = Object.keys(obb).reduce((_acc, _c) => {
          return [..._acc, obb[_c]]
        }, [])
        acc = [...acc, ...arr]
        return acc
      }, mergedValues).map(i => ({ ...i, ...(!i.from ? { from: 'FUTURE' } : {}) }))

      let mergedValuesRed = Object.keys(redStorySoFarInput).reduce((acc, c) => {
        const obb = { ...redStorySoFarInput[c] }
        const arr = Object.keys(obb).reduce((_acc, _c) => {
          return [..._acc, obb[_c]]
        }, [])
        acc = [...acc, ...arr]
        return acc
      }, []).map(i => ({ ...i, from: 'PRESENT' }))
  
      mergedValuesRed = Object.keys(redCellFutureConfidenceInput).reduce((acc, c) => {
        const obb = { ...redCellFutureConfidenceInput[c] }
        const arr = Object.keys(obb).reduce((_acc, _c) => {
          return [..._acc, obb[_c]]
        }, [])
        acc = [...acc, ...arr]
        return acc
      }, mergedValuesRed).map(i => ({ ...i, ...(!i.from ? { from: 'FUTURE' } : {}) }))
  
      const grid = [
        ...new Array(10)
          .fill([])
          .map(i => [
            ...new Array(PRESENT_TABLE_DATA.length)
              .fill({})
          ])
      ]
      const gridRed = [
        ...new Array(10)
          .fill([])
          .map(i => [
            ...new Array(PRESENT_TABLE_DATA.length)
              .fill({})
          ])
      ]
   
      const userAge = userInfo?.value?.clientAge
      const firstHalfColumnCount = PRESENT_TABLE_DATA.filter(i => {
        if (i.range[0] >= userAge && userAge <= i.range[1]) {
          return false
        }
        return true
      })?.length
  
      const indexToAdd = firstHalfColumnCount

      mergedValues.forEach((m) => {
        const factor = FactorItemsGreen.find(i => m.factorId === i.factorId)
        if (m.from === 'PRESENT') {
          console.log(cellPositions[m.row][m.col])
          grid[m.row][m.col] = { 
            ...m,
            ...factor,
            ...cellPositions[m.row][m.col],
            // ...(
            //   cellPositions[m.row][m.col]?.x && cellPositions[m.row][m.col]?.width ? 
            //   {  x: cellPositions[m.row][m.col]?.x - (cellPositions[m.row][m.col]?.width) } 
            //   : {}
            // )
          }
        } else {
          grid[m.row][m.col + indexToAdd] = { 
            ...m, 
            ...factor, 
            ...cellPositions[m.row][m.col + indexToAdd],
            // x: cellPositions[m.row][m.col + indexToAdd]?.x - (cellPositions[m.row][m.col + indexToAdd]?.width)
          }
        }
      })
      mergedValuesRed.forEach((m) => {
        const factor = FactorItemsRed.find(i => m.factorId === i.factorId)
        if (m.from === 'PRESENT') {
          grid[m.row][m.col] = { ...m, ...factor, ...redCellPositions[m.row][m.col] }
        } else {
          grid[m.row][m.col + indexToAdd] = { 
            ...m, ...factor, ...redCellPositions[m.row][m.col + indexToAdd]
          }
        }
      })

      return { GREEN: grid, RED: gridRed }
  }

  const summaryData = React.useMemo(() => {
    return processSummaryData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    storyInfo?.value?.storySoFarInput,
    storyInfo?.value?.redStorySoFarInput,
    storyInfo?.value?.futureConfidenceInput,
    storyInfo?.value?.redCellFutureConfidenceInput
  ])

  return (
    <div className="relative w-full p-4">
      <div className="flex justify-between">
        <span className="text-4xl font-bold">MY STORY</span>
      </div>
      <DropBoard
        hideCta
        isSummaryPage
        cell
        summaryData={summaryData}
        tableList={PRESENT_TABLE_DATA}
        arrowPos={{ position: 'BOTTOM', value: [140] }}
        onRecordCellPositions={onRecordCellPositions} 
      />
    </div>
  );
}
