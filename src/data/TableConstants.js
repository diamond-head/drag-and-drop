export const PRESENT_TABLE_DATA = [
  {
    text: '18-24yrs',
    id: 'AGE_1'
  },
  {
    text: '25-29yrs',
    id: 'AGE_2'
  },
  {
    text: '30-34yrs',
    id: 'AGE_3'
  },
  {
    text: '35-39yrs',
    id: 'AGE_4'
  },
  {
    text: '40-44yrs',
    id: 'AGE_5'
  },
  {
    text: '45-49yrs',
    id: 'AGE_6'
  },
  {
    text: '50-54yrs',
    id: 'AGE_7'
  },
  {
    text: '55-59yrs',
    id: 'AGE_8'
  },
  {
    text: '60-64yrs',
    id: 'AGE_9'
  },
]

export const FUTURE_TABLE_DATA = [
  {
    text: '60-64yrs',
    id: 'AGE_9'
  },
  {
    text: '65-69yrs',
    id: 'AGE_10'
  },
  {
    text: '70-74yrs',
    id: 'AGE_11'
  },
  {
    text: '75-79yrs',
    id: 'AGE_12'
  },
  {
    text: '80-84yrs',
    id: 'AGE_13'
  },
  {
    text: '85-89yrs',
    id: 'AGE_14'
  },
  {
    text: '90-94yrs',
    id: 'AGE_15'
  },
  {
    text: '95-99yrs',
    id: 'AGE_16'
  },
]

export const TABLE_VALUES = [...new Array(10).fill(0)].map((_, idx) => idx + 1)

export function getPresentAgeSlabValueMapping (positions, tableType) {
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
      _value.ageId = PRESENT_TABLE_DATA[col]?.id
      colMap.push(_value)
    }
    mapping.push(colMap)
  }

  return mapping
}

export function getFutureAgeSlabValueMapping (positions, tableType) {
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
      _value.ageId = FUTURE_TABLE_DATA[col]?.id
      colMap.push(_value)
    }
    mapping.push(colMap)
  }

  return mapping
}