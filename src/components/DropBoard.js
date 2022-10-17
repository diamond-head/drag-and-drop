import React from "react";
import ArrowCenter from "./ArrowCenter";
import GreenTable from "./GreenTable";
import RedTable from "./RedTable";

export default function DropBoard({ isFutureStory, onRecordCellPositions, onArrowCtaclick, ctaLabel, arrowPos }) {
  const [positions, setPositions] = React.useState([])
  const [redPositions, setRedPositions] = React.useState([])

  const handleRecordCellPositions = (data, tableType) => {
    setPositions(data)
    onRecordCellPositions(data, tableType)
  }

  const handleRecordRedCellPositions = (data, tableType) => {
    setRedPositions(data)
    onRecordCellPositions(data, tableType)
  }

  const handleCTA = () => {
    onArrowCtaclick()
  }

  return (
    <div id="drop-board">
      <GreenTable isFutureStory={isFutureStory} defaultPositions={positions} recordCellPositions={handleRecordCellPositions} />
      <ArrowCenter arrowPos={arrowPos} label={ctaLabel} onCTAClick={handleCTA}/>
      <RedTable isFutureStory={isFutureStory} defaultPositions={redPositions} recordCellPositions={handleRecordRedCellPositions} />
    </div>
  );
}
