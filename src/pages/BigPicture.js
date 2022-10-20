import React from "react";
import { useDispatch, useSelector } from "react-redux";
import DropBoard from "../components/DropBoard";

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
      const cellPositions = storyInfo?.value?.cellPositions
      const storySoFarFactorsInputTexts = storyInfo?.value?.storySoFarFactorsInputTexts
      const futureConfidenceFactorInputTexts = storyInfo?.value?.futureConfidenceFactorInputTexts

      const presentGrid = storyInfo?.value?.storySoFarGrid
      const presentGridRed = storyInfo?.value?.storySoFarGridRed
      const futureGrid = storyInfo?.value?.futureConfidenceGrid
      const futureGridRed = storyInfo?.value?.futureConfidenceGridRed

      const userAge = userInfo?.value?.clientAge
      const firstHalfColumnCount = PRESENT_TABLE_DATA.filter(i => {
        if (i.range[0] >= userAge && userAge <= i.range[1]) {
          return false
        }
        return true
      })?.length

      const indexToAdd = firstHalfColumnCount

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

      let rowLength = presentGrid.length
      for (let row = 0; row < rowLength; row++) {
        const colLength = presentGrid[row].length
        for (let col = 0; col < colLength; col++) {
          const factorId  = presentGrid[row][col]
          if (factorId) {
            let factorDetails = {}
            const factor = FactorItemsGreen.find(i => factorId === i.factorId)
            if (factor) {
              const __obj = { ...factor }
              if (__obj.isInput) {
                __obj.text = storySoFarFactorsInputTexts[factorId]
              }
              factorDetails = { ...__obj }
            }
            grid[row][col] = factorDetails
          }
        }
      }

      rowLength = futureGrid.length

      for (let row = 0; row < rowLength; row++) {
        const colLength = futureGrid[row].length
        for (let col = 0; col < colLength; col++) {
          const factorId  = futureGrid[row][col]
          if (factorId) {
            let factorDetails = {}
            const factor = FactorItemsGreen.find(i => factorId === i.factorId)
            if (factor) {
              const __obj = { ...factor }
              if (__obj.isInput) {
                __obj.text = futureConfidenceFactorInputTexts[factorId]
              }
              factorDetails = { ...__obj }
            }
            grid[row][col + (indexToAdd - 1) ] = factorDetails
          }
        }
      }

      rowLength = presentGridRed.length
      for (let row = 0; row < rowLength; row++) {
        const colLength = presentGridRed[row].length
        for (let col = 0; col < colLength; col++) {
          const factorId  = presentGridRed[row][col]
          if (factorId) {
            let factorDetails = {}
            const factor = FactorItemsRed.find(i => factorId === i.factorId)
            if (factor) {
              const __obj = { ...factor }
              if (__obj.isInput) {
                __obj.text = storySoFarFactorsInputTexts[factorId]
              }
              factorDetails = { ...__obj }
            }
            gridRed[row][col] = factorDetails
          }
        }
      }

      rowLength = futureGridRed.length

      for (let row = 0; row < rowLength; row++) {
        const colLength = futureGridRed[row].length
        for (let col = 0; col < colLength; col++) {
          const factorId  = futureGridRed[row][col]
          if (factorId) {
            let factorDetails = {}
            const factor = FactorItemsRed.find(i => factorId === i.factorId)
            if (factor) {
              const __obj = { ...factor }
              if (__obj.isInput) {
                __obj.text = futureConfidenceFactorInputTexts[factorId]
              }
              factorDetails = { ...__obj }
            }
            gridRed[row][col + (indexToAdd - 1)] = factorDetails
          }
        }
      }

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
    storyInfo?.value?.cellPositions,
    storyInfo?.value?.storySoFarFactorsInputTexts,
    storyInfo?.value?.futureConfidenceFactorInputTexts,
    storyInfo?.value?.storySoFarGrid,
    storyInfo?.value?.storySoFarGridRed,
    storyInfo?.value?.futureConfidenceGrid,
    storyInfo?.value?.futureConfidenceGridRed,
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
