import React from "react";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import DropBoard from "../components/DropBoard";
import FactorsGrid from "../components/FactorsGrid";
import QualityText from "../components/QualityText";
import { FactorItemsGreen, FactorItemsRed } from "../data/FactorItems";
import { setCellPositions, setDragBoundParentNodeGreen, setDragBoundParentNodeRed } from '../store/features/storyInfo'

export default function ScreenTwo() {
  const navigate = useNavigate()
  const storyInfo = useSelector(state => state.storyInfo)
  const dispatch = useDispatch()
  const onRecordCellPositions = (positions, tableType) => {
    dispatch(setCellPositions({ positions, tableType }))
  }

  const redirectToNextScreen = () => {
    navigate('/big-picture')
  }

  return (
    <div className="relative w-full p-4">
      <div className="flex justify-between">
        <span className="text-4xl font-bold">MY STORY</span>
      </div>
      <DropBoard arrowPos={{ position: 'BOTTOM', value: [140] }} onRecordCellPositions={onRecordCellPositions} />
    </div>
  );
}
