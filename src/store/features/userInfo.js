import { createSlice } from "@reduxjs/toolkit";

const initialStateValues = {
  clientId: 11,
  clientAge: 34,
  meetingDate: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: { value: initialStateValues },
  reducers: {
    userChange: (state, action) => {
      state.value = action.payload;
    },
    reset: (state) => {
      state.value = initialStateValues;
    },
  },
});

export const { userChange, reset } = userSlice.actions;

export default userSlice.reducer;
