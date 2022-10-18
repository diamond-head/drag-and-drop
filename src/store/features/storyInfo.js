import { createSlice } from "@reduxjs/toolkit";

const initialStateValues = {
  cellPositions: [],
  redCellPositions: [],

  futureCellPositions: [],
  futureRedCellPositions: [],

  storySoFarInput: {},
  redStorySoFarInput: {},

  futureConfidenceInput: {},
  redCellFutureConfidenceInput: {}
};

export const storyInfo = createSlice({
  name: "storyInfo",
  initialState: { value: initialStateValues },
  reducers: {
    setCellPositions: (state, action) => {
      switch (action.payload.tableType) {
        case 'GREEN':
          state.value.cellPositions = action.payload.positions;
          break;
        case 'RED':
          state.value.redCellPositions = action.payload.positions;
        default:
          break;
      }
    },
    setFutureCellPositions: (state, action) => {
      switch (action.payload.tableType) {
        case 'GREEN':
          state.value.futureCellPositions = action.payload.positions;
          break;
        case 'RED':
          state.value.futureRedCellPositions = action.payload.positions;
        default:
          break;
      }
    },
    setFuturConfidenceInput: (state, action) => {
      switch (action.payload.tableType) {
        case 'GREEN': {
          const inputAgeId = action.payload.input[0]
          const inputFactorId = action.payload.input[1].factorId

          if (!state.value.futureConfidenceInput[inputAgeId]) {
            state.value.futureConfidenceInput[inputAgeId] = {}
          }
          let input = { ...state.value.futureConfidenceInput }
          Object.keys(input).forEach(i => {
            if (input[i][inputFactorId]) {
              const { [inputFactorId]: val, ...rest } = input[i]
              input[i] = {
                ...rest
              }
            }
          })

          state.value.futureConfidenceInput = {
            ...input,
            [inputAgeId]: {
              ...input[inputAgeId],
              [action.payload.input[1].factorId]: { 
                ...action.payload.input[1]
              }
            }
          };
          break;
        }
        case 'RED': {
          const inputAgeId = action.payload.input[0]
          const inputFactorId = action.payload.input[1].factorId

          if (!state.value.redCellFutureConfidenceInput[inputAgeId]) {
            state.value.redCellFutureConfidenceInput[inputAgeId] = {}
          }
          let input = { ...state.value.redCellFutureConfidenceInput }
          Object.keys(input).forEach(i => {
            if (input[i][inputFactorId]) {
              const { [inputFactorId]: val, ...rest } = input[i]
              input[i] = {
                ...rest
              }
            }
          })

          state.value.redCellFutureConfidenceInput = {
            ...input,
            [inputAgeId]: {
              ...input[inputAgeId],
              [action.payload.input[1].factorId]: { 
                ...action.payload.input[1]
              }
            }
          };
          break
        }
        default:
          break;
      }
    },
    setStorySoFarInput: (state, action) => {
      switch (action.payload.tableType) {
        case 'GREEN': {
          const inputAgeId = action.payload.input[0]
          const inputFactorId = action.payload.input[1].factorId

          if (!state.value.storySoFarInput[inputAgeId]) {
            state.value.storySoFarInput[inputAgeId] = {}
          }
          let input = { ...state.value.storySoFarInput }
          Object.keys(input).forEach(i => {
            if (input[i][inputFactorId]) {
              const { [inputFactorId]: val, ...rest } = input[i]
              input[i] = {
                ...rest
              }
            }
          })

          state.value.storySoFarInput = {
            ...input,
            [inputAgeId]: {
              ...input[inputAgeId],
              [action.payload.input[1].factorId]: { 
                ...action.payload.input[1]
              }
            }
          };
          break;
        }
        case 'RED': {
          const inputAgeId = action.payload.input[0]
          const inputFactorId = action.payload.input[1].factorId

          if (!state.value.redStorySoFarInput[inputAgeId]) {
            state.value.redStorySoFarInput[inputAgeId] = {}
          }
          let input = { ...state.value.redStorySoFarInput }
          Object.keys(input).forEach(i => {
            if (input[i][inputFactorId]) {
              const { [inputFactorId]: val, ...rest } = input[i]
              input[i] = {
                ...rest
              }
            }
          })

          state.value.redStorySoFarInput = {
            ...input,
            [inputAgeId]: {
              ...input[inputAgeId],
              [action.payload.input[1].factorId]: { 
                ...action.payload.input[1]
              }
            }
          };
          break
        }
        default:
          break;
      }
    },
    resetPositions: (state) => {
      state.value.cellPositions = initialStateValues.cellPositions;
      state.value.redCellPositions = initialStateValues.redCellPositions;
    },
  },
});

export const { 
  setCellPositions, 
  resetPositions, 
  setFuturConfidenceInput, 
  setStorySoFarInput, 
  setFutureCellPositions 
} = storyInfo.actions;

export default storyInfo.reducer;
