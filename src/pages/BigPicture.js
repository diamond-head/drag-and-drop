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
      const storySoFarFactorsInputTexts = storyInfo?.value?.storySoFarFactorsInputTexts
      const futureConfidenceFactorInputTexts = storyInfo?.value?.futureConfidenceFactorInputTexts

      const userAge = userInfo?.value?.clientAge
      const firstHalfColumnCount = PRESENT_TABLE_DATA.filter(i => {
        if (i.range[0] >= userAge && userAge <= i.range[1]) {
          return false
        }
        return true
      })?.length

      const indexToAdd = firstHalfColumnCount

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
          return [
            ..._acc, 
            { 
              ...obb[_c], 
              relativeX: obb[_c]?.relativeX + (obb[_c]?.width * firstHalfColumnCount) 
            }
          ]
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
          return [
            ..._acc, 
            { 
              ...obb[_c], 
              relativeX: obb[_c]?.relativeX + (obb[_c]?.width * firstHalfColumnCount) 
            }
          ]
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

      mergedValues.forEach((m) => {
        const factor = FactorItemsGreen.find(i => m.factorId === i.factorId)
        let __obj = { 
          ...m,
          ...factor,
          ...cellPositions[m.row][m.col],
        }

        if (m.from === 'PRESENT') { 
          if (factor.isInput) {
            __obj.text = storySoFarFactorsInputTexts[factor.factorId]
          }

          grid[m.row][m.col] = __obj
        } else {
          if (factor.isInput) {
            __obj.text = futureConfidenceFactorInputTexts[factor.factorId]
          }

          if ((m.col + (indexToAdd - 1)) < cellPositions[m.row].length) {
            grid[m.row][m.col + (indexToAdd - 1)] = { 
              ...__obj,
              ...cellPositions[m.row][m.col + (indexToAdd - 1)],
            }
          }
        }
      })

      mergedValuesRed.forEach((m) => {
        const factor = FactorItemsRed.find(i => m.factorId === i.factorId)
        let __obj = { 
          ...m,
          ...factor,
          ...redCellPositions[m.row][m.col],
        }
        if (m.from === 'PRESENT') {
          if (factor.isInput) {
            __obj.text = storySoFarFactorsInputTexts[factor.factorId]
          }
          gridRed[m.row][m.col] = __obj
        } else {
          if (factor.isInput) {
            __obj.text = futureConfidenceFactorInputTexts[factor.factorId] 
          }

          if ((m.col + (indexToAdd - 1)) < redCellPositions[m.row].length) {
            gridRed[m.row][m.col + (indexToAdd - 1)] = {
              ...__obj,
              ...redCellPositions[m.row][m.col + (indexToAdd - 1)]
            }
          }
        }
      })
      const ageIndex = PRESENT_TABLE_DATA.findIndex(i => {
        if (i.range[0] >= userAge && userAge <= i.range[1]) {
          return true
        }
        return false
      })
      const ageFound = cellPositions.length > 0 ? cellPositions[0][ageIndex || 0] : undefined
      return { GREEN: grid, RED: gridRed, agePosition: ageFound }
  }

  const summaryData = React.useMemo(() => {
    return processSummaryData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    storyInfo?.value?.storySoFarInput,
    storyInfo?.value?.redStorySoFarInput,
    storyInfo?.value?.futureConfidenceInput,
    storyInfo?.value?.redCellFutureConfidenceInput,
    storyInfo?.value?.cellPositions,
    storyInfo?.value?.redCellPositions,
    storyInfo?.value?.storySoFarFactorsInputTexts,
    storyInfo?.value?.futureConfidenceFactorInputTexts
  ])

  const { x, width } = summaryData?.agePosition || {}

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
        arrowPos={{ hide: !x && true, position: 'BOTTOM', value: [(x && width) ? (x - (width / 2)) : 'auto'] }}
        onRecordCellPositions={onRecordCellPositions} 
      />
    </div>
  );
}
