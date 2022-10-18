import React from "react";
import { TABLE_VALUES } from '../data/TableConstants'

export default function RedTable({
  recordCellPositions,
  defaultPositions,
  tableList
}) {
  const refs = React.useRef([])

  React.useEffect(() => {
    if (refs && refs !== null && refs.current) {
      if (defaultPositions.length === 0) {
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
        {TABLE_VALUES.map((val, idx) => (
          <tr key={idx + 'values'} className="text-red-500 font-medium">
            <td className="h-[27px] w-[102px] border-spacing-0 p-0 green-table-body-value">{val}</td>
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
      </tbody>
      <thead className="red-table-header">
        <tr className="hidden">
          <th className="border-spacing-0 p-0 h-[27px] w-[102px]"></th>
          {tableList?.map((data, idx) => (
            <th className="border-spacing-0 p-0 h-[27px] w-[102px]" key={idx + data.id}>{data.text}</th>
          ))}
        </tr>
      </thead>
    </table>
  );
}
