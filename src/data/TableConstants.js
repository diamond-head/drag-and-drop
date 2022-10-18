export const PRESENT_TABLE_DATA = [
  {
    range: [18, 24],
    text: '18-24yrs',
    id: 'AGE_1'
  },
  {
    range: [25, 29],
    text: '25-29yrs',
    id: 'AGE_2'
  },
  {
    range: [30, 34],
    text: '30-34yrs',
    id: 'AGE_3'
  },
  {
    range: [35, 39],
    text: '35-39yrs',
    id: 'AGE_4'
  },
  {
    range: [40, 44],
    text: '40-44yrs',
    id: 'AGE_5'
  },
  {
    range: [45, 49],
    text: '45-49yrs',
    id: 'AGE_6'
  },
  {
    range: [50, 54],
    text: '50-54yrs',
    id: 'AGE_7'
  },
  {
    range: [55, 59],
    text: '55-59yrs',
    id: 'AGE_8'
  },
  {
    range: [60, 64],
    text: '60-64yrs',
    id: 'AGE_9'
  },
  {
    range: [65, 69],
    text: '65-69yrs',
    id: 'AGE_10'
  },
  {
    range: [70, 74],
    text: '70-74yrs',
    id: 'AGE_11'
  },
  {
    range: [75, 79],
    text: '75-79yrs',
    id: 'AGE_12'
  },
  {
    range: [80, 84],
    text: '80-84yrs',
    id: 'AGE_13'
  },
  {
    range: [85, 89],
    text: '85-89yrs',
    id: 'AGE_14'
  },
  {
    range: [90, 94],
    text: '90-94yrs',
    id: 'AGE_15'
  },
  {
    range: [95, 99],
    text: '95-99yrs',
    id: 'AGE_16'
  },
]

export const TABLE_VALUES = [...new Array(10).fill(0)].map((_, idx) => idx + 1)

export function getPresentAgeSlabValueMapping (positions, tableType, tableList) {
  const __values = {
    GREEN: [...TABLE_VALUES].reverse().map(i => i),
    RED: TABLE_VALUES
  }

  const mapping = []
  const rowLength = positions.length
  for (let row = 0; row < rowLength; row++) {
    const colLength = positions[row].length
    const colMap= []
    for (let col = 0; col < colLength; col++) {
      const cellValue = positions[row][col]
      let _value = {}
      _value = { ...cellValue }
      _value.value = __values[tableType][row]
      _value.ageId = tableList[col]?.id
      colMap.push(_value)
    }
    mapping.push(colMap)
  }

  return mapping
}