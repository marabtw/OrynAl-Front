import { configureStore } from "@reduxjs/toolkit"
import contextMenuReducer from "./contextMenuSlice"

const store = configureStore({
  reducer: {
    contextMenu: contextMenuReducer,
  },
})

export default store