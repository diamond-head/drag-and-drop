import { createSlice } from "@reduxjs/toolkit";

const initialStateValues = {
  cellPositions: [],
  redCellPositions: [],
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
    setFuturConfidenceInput: (state, action) => {
      switch (action.payload.tableType) {
        case 'GREEN':
          state.value.futureConfidenceInput = {
            ...state.value.futureConfidenceInput,
            ...action.payload.input
          };
          break;
        case 'RED':
          state.value.redCellFutureConfidenceInput = {
            ...state.value.redCellFutureConfidenceInput,
            ...action.payload.input
          };
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

export const { setCellPositions, resetPositions, setFuturConfidenceInput } = storyInfo.actions;

export default storyInfo.reducer;
