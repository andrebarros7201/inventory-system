import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isVisible: false,
  notification: { type: "", message: "" },
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    createNotification(
      state,
      action: PayloadAction<{ type: string; message: string }>,
    ) {
      const { type, message } = action.payload;
      state.notification.type = type;
      state.notification.message = message;
      state.isVisible = true;
    },
    toggleVisible(state) {
      state.isVisible = !state.isVisible;
    },
  },
});

export default notificationSlice.reducer;
export const notificationActions = notificationSlice.actions;
