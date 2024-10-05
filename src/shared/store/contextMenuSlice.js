import { createSlice } from "@reduxjs/toolkit"

const contextMenuSlice = createSlice({
  name: "contextMenu",
  initialState: {
    openIndex: null,
  },
  reducers: {
    setContextMenuOpenIndex(state, action) {
      state.openIndex = action.payload
    },
		closeContextMenu(state) {
      state.openIndex = null;
    },
  },
})

export const { setContextMenuOpenIndex, closeContextMenu  } = contextMenuSlice.actions

export default contextMenuSlice.reducer
