import { createSlice } from "@reduxjs/toolkit";

const initialStateValues = {
  cellPositions: [],
  redCellPositions: [],

  futureCellPositions: [],
  futureRedCellPositions: [],

  storySoFarInput: {},
  redStorySoFarInput: {},

  futureConfidenceInput: {},
  redCellFutureConfidenceInput: {},

  storySoFarFactorsInputTexts: {},
  futureConfidenceFactorInputTexts: {},

  storySoFarGrid: [],
  storySoFarGridRed: [],
  futureConfidenceGrid: [],
  futureConfidenceGridRed: []
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
    setStorySoFarFactorsInput: (state, action) => {
      switch (action.payload.tableType) {
        case 'GREEN': {
          state.value.storySoFarFactorsInputTexts = {
            ...state.value.storySoFarFactorsInputTexts,
            [action.payload.factorId]: action.payload.input
          }
          break
        }
        case 'RED': {
          state.value.storySoFarFactorsInputTexts = {
            ...state.value.storySoFarFactorsInputTexts,
            [action.payload.factorId]: action.payload.input
          }
          break
        }
        default:
          break
      }
    },
    setFutureConfidenceFactorsInput: (state, action) => {
      switch (action.payload.tableType) {
        case 'GREEN': {
          state.value.futureConfidenceFactorInputTexts = {
            ...state.value.futureConfidenceFactorInputTexts,
            [action.payload.factorId]: action.payload.input
          }
          break
        }
        case 'RED': {
          state.value.futureConfidenceFactorInputTexts = {
            ...state.value.futureConfidenceFactorInputTexts,
            [action.payload.factorId]: action.payload.input
          }
          break
        }
        default:
          break
      }
    },
    setStorySoFarGrid: (state, action) => {
      switch (action.payload.tableType) {
        case 'GREEN': {
          const input = action.payload.input
          const currentGrid = [...state.value.storySoFarGrid]
          const rowL = input.length
          if (rowL > 0) {
            for (let row = 0; row < rowL; row++) {
              const colL = input[row].length
              for (let col = 0; col < colL; col++) {
                if (!currentGrid[row]) {
                  currentGrid[row] = []
                }

                if (!currentGrid[row][col]) {
                  currentGrid[row][col] = ''
                }

                currentGrid[row][col] = input[row][col]
              }
            }

            state.value.storySoFarGrid = currentGrid
          }
          break
        }
        case 'RED': {
          const input = action.payload.input
          const currentGrid = [...state.value.storySoFarGridRed]
          const rowL = input.length
          if (rowL > 0) {
            for (let row = 0; row < rowL; row++) {
              const colL = input[row].length
              for (let col = 0; col < colL; col++) {
                if (!currentGrid[row]) {
                  currentGrid[row] = []
                }

                if (!currentGrid[row][col]) {
                  currentGrid[row][col] = ''
                }

                currentGrid[row][col] = input[row][col]
              }
            }

            state.value.storySoFarGridRed = currentGrid
          }
          break
        }
        default:
          break
      }
    },
    setFutureCondidenceGrid: (state, action) => {
      switch (action.payload.tableType) {
        case 'GREEN': {
          const input = action.payload.input
          const currentGrid = [...state.value.futureConfidenceGrid]
          const rowL = input.length
          if (rowL > 0) {
            for (let row = 0; row < rowL; row++) {
              const colL = input[row].length
              for (let col = 0; col < colL; col++) {
                if (!currentGrid[row]) {
                  currentGrid[row] = []
                }

                if (!currentGrid[row][col]) {
                  currentGrid[row][col] = ''
                }

                currentGrid[row][col] = input[row][col]
              }
            }

            state.value.futureConfidenceGrid = currentGrid
          }
          break
        }
        case 'RED': {
          const input = action.payload.input
          const currentGrid = [...state.value.futureConfidenceGrid]
          const rowL = input.length
          if (rowL > 0) {
            for (let row = 0; row < rowL; row++) {
              const colL = input[row].length
              for (let col = 0; col < colL; col++) {
                if (!currentGrid[row]) {
                  currentGrid[row] = []
                }

                if (!currentGrid[row][col]) {
                  currentGrid[row][col] = ''
                }

                currentGrid[row][col] = input[row][col]
              }
            }

            state.value.futureConfidenceGrid = currentGrid
          }
          break
        }
        default:
          break
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
  setFutureCellPositions,
  setStorySoFarFactorsInput,
  setFutureConfidenceFactorsInput,
  setStorySoFarGrid,
  setFutureCondidenceGrid
} = storyInfo.actions;

export default storyInfo.reducer;
