import React from "react";
import { TABLE_VALUES } from '../data/TableConstants'

export default function RedTable({
  recordCellPositions,
  defaultPositions,
  tableList,
  isSummaryPage,
  summaryData
}) {
  const refs = React.useRef([])
  const [data, setData] = React.useState({})

  React.useEffect(() => {
    if (refs && refs !== null && refs.current) {
      if (defaultPositions.length === 0) {
        const { height, width } = refs.current[0][0]?.getBoundingClientRect() || {}
        setData({height,width})
        handleRecordCellPositions(refs)
      }
    }
  }, [refs])

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

    recordCellPositions(positions, 'RED')
  }

  return (
    <table className="mb-4">
      <tbody id={'drag-board-red'}>
        {!isSummaryPage && TABLE_VALUES.map((val, idx) => (
          <tr key={idx + 'values'} className={`text-red-500 font-medium `}>
            <td className={`h-[27px] w-[102px] border-spacing-0 p-0 text-sm`}>{val}</td>
            {tableList?.map((_,index) => (
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
              ></td>
            ))}
          </tr>
        ))}
        {isSummaryPage && summaryData.map((row, idx) => (
          <tr key={idx + 'values'} className={`text-red-500 font-normal`}>
            <td className={`h-[27px] w-[102px] border-spacing-0 p-0 text-sm`}>{TABLE_VALUES[idx]}</td>
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
                    top: (col.relativeY),
                    left: col.relativeX,
                    height: data.height,
                    width: data.width
                  }} className={`${col.background} flex justify-center text-center`}>
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
      <thead className={`red-table-header`}>
        <tr className="hidden">
          <th className="border-spacing-0 p-0 h-[27px] w-[102px]"></th>
          {tableList?.map((data, idx) => (
            <th className="border-spacing-0 p-0 h-[27px] w-[102px] text-sm" key={idx + data.id}>{data.text}</th>
          ))}
        </tr>
      </thead>
    </table>
  );
}
