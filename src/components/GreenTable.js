import React from "react";
import { TABLE_VALUES } from '../data/TableConstants'

const tableValues = [...TABLE_VALUES].reverse().map(i => i)

export default function GreenTable({
  recordCellPositions,
  defaultPositions,
  tableList,
  isSummaryPage,
  summaryData
}) {
  const refs = React.useRef([])
  const headRef = React.useRef(null)
  const [data, setData] = React.useState({})

  React.useEffect(() => {
    if (refs && refs !== null && refs.current) {
      if (defaultPositions.length === 0) {
        handleRecordCellPositions(refs)
      }
    }
    if (headRef && headRef.current) {
      const { height, width } = headRef.current?.getBoundingClientRect() || {}
      setData({height,width})
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refs, headRef])

  const handleRecordCellPositions = (refPayload) => {
    const positions = []
    refPayload.current.forEach(i => {
      const rowPos = []
      i.forEach(cell => {
        const { left, top, bottom, right, x, y, width, height } = cell.getBoundingClientRect()
        rowPos.push({
          left: left,
          top: top,
          bottom: bottom,
          right: right,
          x: x,
          y: y,
          width, height
        })
      })
      positions.push(rowPos)
    })

    recordCellPositions(positions, 'GREEN')
  }

  return (
    <table className="mt-4">
      <thead className={`green-table-header ${isSummaryPage ? 'text-sm' : ''}`}>
        <tr className="">
          <th className="border-spacing-0 p-0 h-[27px] w-[102px]"></th>
          {tableList?.map((data, idx) => (
            <th ref={idx === 0 ? headRef : null} className="border-spacing-0 p-0 h-[27px] w-[102px]" key={idx + data.id}>{data.text}</th>
          ))}
        </tr>
      </thead>
      <tbody id="drag-board-green">
        {!isSummaryPage && tableValues.map((val, idx) => (
          <tr key={idx + 'values'} className={`text-green-500 font-medium`}>
            <td className={`h-[27px] w-[102px] border-spacing-0 p-0`}>{val}</td>
            {tableList?.map((_, index) => (
              <td
                className="h-[27px] w-[102px] border-spacing-0 p-0"
                key={index + idx}
                ref={el => {
                  if (refs.current) {
                    if (!refs.current[idx]) {
                      refs.current[idx] = []
                    }
                    refs.current[idx][index] = el
                  }
                }}
              >
              </td>
            ))}
          </tr>
        ))}
        {isSummaryPage && summaryData.map((row, idx) => (
          <tr key={idx + 'values'} className={`text-green-500 font-normal`}>
            <td className={`h-[27px] w-[102px] border-spacing-0 p-0 text-sm`}>{tableValues[idx]}</td>
            {row?.map((col, index) => (
              <td
                className="h-[27px] w-[102px] border-spacing-0 p-0"
                key={index + idx}
                ref={el => {
                  if (refs.current) {
                    if (!refs.current[idx]) {
                      refs.current[idx] = []
                    }
                    refs.current[idx][index] = el
                  }
                }}
              >
                {Object.keys(col).length > 0 && (
                  <div style={{
                    position: 'absolute',
                    top: col.y,
                    left: col.x,
                    height: data.height,
                    width: data.width
                  }} className={`${col.background} bg-green-500 flex justify-center text-center`}>
                    <span className="text-white text-xs">
                      {col.text}
                    </span>
                  </div>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
