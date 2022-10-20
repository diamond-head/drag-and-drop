import React from "react";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import DropBoard from "../components/DropBoard";
import FactorsGrid from "../components/FactorsGrid";
import QualityText from "../components/QualityText";
import { FactorItemsGreen, FactorItemsRed } from "../data/FactorItems";
import {
  setCellPositions,
  setStorySoFarInput,
  setStorySoFarFactorsInput,
  setStorySoFarGrid
} from '../store/features/storyInfo'
import { getPresentAgeSlabValueMapping, PRESENT_TABLE_DATA } from '../data/TableConstants'

export default function ScreenTwo() {
  const navigate = useNavigate()
  const userInfo = useSelector(state => state.userInfo)
  const storyInfo = useSelector(state => state.storyInfo)
  const dispatch = useDispatch()

  const tableList = React.useMemo(() => {
    const age = userInfo?.value?.clientAge
    return PRESENT_TABLE_DATA.filter((c) => {
      if (c.range[0] > age && age <= c.range[1]) {
        return false
      }
      return true
    }).map((i, idx) => ({
      ...i,
      mergedTableIndex: idx
    }))
  }, [userInfo?.value?.clientAge])

  const greenMapping = React.useMemo(() => {
    return getPresentAgeSlabValueMapping(storyInfo?.value?.cellPositions, 'GREEN', tableList)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storyInfo?.value?.cellPositions?.length])

  const redMapping = React.useMemo(() => {
    return getPresentAgeSlabValueMapping(storyInfo?.value?.redCellPositions, 'RED', tableList)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storyInfo?.value?.redCellPositions?.length])

  const onRecordCellPositions = (positions, tableType) => {
    dispatch(setCellPositions({ positions, tableType }))
  }

  const handleCellPositionsChange = (input, tableType) => {
    dispatch(setStorySoFarInput({ input, tableType }))
  }

  const handleFactorInputChange = (input, factorId, tableType) => {
    dispatch(setStorySoFarFactorsInput({ input, factorId, tableType }))
  }

  const handleGridChange = (input, tableType) => {
    // console.log(input, tableType)
    dispatch(setStorySoFarGrid({ input, tableType }))
  }

  const redirectToNextScreen = () => {
    navigate('/screen3')
  }

  return (
    <div className="relative w-full p-4">
      {/* top section */}
      <div className="flex justify-between">
        <span className="text-4xl font-bold">MY STORY SO FAR...</span>
        <div className="flex gap-5">
          <QualityText
            color="text-green-500"
            text="Quality of Life MILESTONES"
          />
          <FactorsGrid
            columnCount={tableList.length}
            tableType={'GREEN'}
            cellPositions={greenMapping} 
            data={FactorItemsGreen}
            onFactorInputChange={handleFactorInputChange}
            onCellPositionsChange={handleCellPositionsChange}
            onGridChange={handleGridChange}
          />
        </div>
      </div>
      {/* dropable section */}
      <DropBoard 
        tableList={tableList} 
        ctaLabel={'THE NEXT CHAPTER'} 
        onArrowCtaclick={redirectToNextScreen}
        onRecordCellPositions={onRecordCellPositions} 
      />
      {/* bottom section */}
      <div className="flex justify-end">
        <div className="flex gap-5 items-end">
          <QualityText color="text-red-500" text="Quality of Life CHALLENGES" />
          <FactorsGrid 
            columnCount={tableList.length}
            tableType={'RED'} 
            cellPositions={redMapping} 
            data={FactorItemsRed} 
            onFactorInputChange={handleFactorInputChange}
            onCellPositionsChange={handleCellPositionsChange}
            onGridChange={handleGridChange}
          />
        </div>
      </div>
    </div>
  );
}
