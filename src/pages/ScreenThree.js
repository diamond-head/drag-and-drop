import React from "react";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import DropBoard from "../components/DropBoard";
import FactorsGrid from "../components/FactorsGrid";
import QualityText from "../components/QualityText";
import { FactorItemsGreen, FactorItemsRed } from "../data/FactorItems";
import { setCellPositions, setFuturConfidenceInput } from '../store/features/storyInfo'
import { getPresentAgeSlabValueMapping, PRESENT_TABLE_DATA } from '../data/TableConstants'

export default function ScreenThree() {
  const navigate = useNavigate()
  const userInfo = useSelector(state => state.userInfo)
  const storyInfo = useSelector(state => state.storyInfo)
  const dispatch = useDispatch()

  const tableList = React.useMemo(() => {
    return PRESENT_TABLE_DATA.filter((c) => {
      const age = userInfo?.value?.clientAge
      if ((c.range[0] >= age) || (age <= c.range[1]) ) {
        return true
      }
      return false
    })
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
    dispatch(setFuturConfidenceInput({ input, tableType }))
  }

  const redirectToNextScreen = () => {
    navigate('/big-picture')
  }

  return (
    <div className="relative w-full p-4">
      {/* top section */}
      <div className="flex justify-between">
        <span className="text-4xl font-bold">MY STORY THE NEXT CHAPTER</span>
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
            onCellPositionsChange={handleCellPositionsChange}
          />
        </div>
      </div>
      {/* dropable section */}
      <DropBoard
        tableList={tableList} 
        ctaLabel={'FUTURE CONFIDENCE'}
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
            onCellPositionsChange={handleCellPositionsChange} 
          />
        </div>
      </div>
    </div>
  );
}
