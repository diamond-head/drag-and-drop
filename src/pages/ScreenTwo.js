import React from "react";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import DropBoard from "../components/DropBoard";
import FactorsGrid from "../components/FactorsGrid";
import QualityText from "../components/QualityText";
import { FactorItemsGreen, FactorItemsRed } from "../data/FactorItems";
import {
  setCellPositions,
  setFuturConfidenceInput
} from '../store/features/storyInfo'
import { getPresentAgeSlabValueMapping } from '../data/TableConstants'

export default function ScreenTwo() {
  const navigate = useNavigate()
  const storyInfo = useSelector(state => state.storyInfo)
  const dispatch = useDispatch()

  const greenMapping = React.useMemo(() => {
    return getPresentAgeSlabValueMapping(storyInfo?.value?.cellPositions, 'GREEN')
  }, [storyInfo?.value?.cellPositions?.length])

  const redMapping = React.useMemo(() => {
    return getPresentAgeSlabValueMapping(storyInfo?.value?.redCellPositions, 'RED')
  }, [storyInfo?.value?.redCellPositions?.length])

  const onRecordCellPositions = (positions, tableType) => {
    dispatch(setCellPositions({ positions, tableType }))
  }

  const handleCellPositionsChange = (input, tableType) => {
    dispatch(setFuturConfidenceInput({ input, tableType }))
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
          <FactorsGrid tableType={'GREEN'} cellPositions={greenMapping} data={FactorItemsGreen} onCellPositionsChange={handleCellPositionsChange}/>
        </div>
      </div>
      {/* dropable section */}
      <DropBoard ctaLabel={'THE NEXT CHAPTER'} onArrowCtaclick={redirectToNextScreen} onRecordCellPositions={onRecordCellPositions} />
      {/* bottom section */}
      <div className="flex justify-end">
        <div className="flex gap-5 items-end">
          <QualityText color="text-red-500" text="Quality of Life CHALLENGES" />
          <FactorsGrid tableType={'RED'} cellPositions={redMapping} data={FactorItemsRed} onCellPositionsChange={handleCellPositionsChange} />
        </div>
      </div>
    </div>
  );
}
