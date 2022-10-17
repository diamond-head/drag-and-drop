import React from "react";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import DropBoard from "../components/DropBoard";
import FactorsGrid from "../components/FactorsGrid";
import QualityText from "../components/QualityText";
import { FactorItemsGreen, FactorItemsRed } from "../data/FactorItems";
import { setCellPositions, setFuturConfidenceInput } from '../store/features/storyInfo'
import { getFutureAgeSlabValueMapping } from '../data/TableConstants'

export default function ScreenTwo() {
  const navigate = useNavigate()
  const userInfo = useSelector(state => state.userInfo)
  const storyInfo = useSelector(state => state.storyInfo)
  const dispatch = useDispatch()

  const greenMapping = React.useMemo(() => {
    return getFutureAgeSlabValueMapping(storyInfo?.value?.cellPositions, 'GREEN')
  }, [storyInfo?.value?.cellPositions?.length])

  const redMapping = React.useMemo(() => {
    return getFutureAgeSlabValueMapping(storyInfo?.value?.redCellPositions, 'RED')
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
          <FactorsGrid isFutureStory={userInfo?.value?.clientAge >= 62} tableType={'GREEN'} cellPositions={storyInfo?.value?.cellPositions} data={FactorItemsGreen} onCellPositionsChange={handleCellPositionsChange}/>
        </div>
      </div>
      {/* dropable section */}
      <DropBoard isFutureStory={userInfo?.value?.clientAge >= 62} ctaLabel={'FUTURE CONFIDENCE'} onArrowCtaclick={redirectToNextScreen} onRecordCellPositions={onRecordCellPositions} />
      {/* bottom section */}
      <div className="flex justify-end">
        <div className="flex gap-5 items-end">
          <QualityText color="text-red-500" text="Quality of Life CHALLENGES" />
          <FactorsGrid isFutureStory={userInfo?.value?.clientAge >= 62} tableType={'RED'} cellPositions={storyInfo?.value?.redCellPositions} data={FactorItemsRed} onCellPositionsChange={handleCellPositionsChange} />
        </div>
      </div>
    </div>
  );
}
