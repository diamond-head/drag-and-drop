import React from "react";
import ArrowCenter from "./ArrowCenter";
import GreenTable from "./GreenTable";
import RedTable from "./RedTable";

export default function DropBoard({ tableList, onRecordCellPositions, onArrowCtaclick, ctaLabel, arrowPos }) {
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
      <GreenTable tableList={tableList} defaultPositions={positions} recordCellPositions={handleRecordCellPositions} />
      <ArrowCenter arrowPos={arrowPos} label={ctaLabel} onCTAClick={handleCTA}/>
      <RedTable tableList={tableList} defaultPositions={redPositions} recordCellPositions={handleRecordRedCellPositions} />
    </div>
  );
}
