import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

import { Provider } from "react-redux"
import store from "./shared/store/store"

import reportWebVitals from "./reportWebVitals"

import "@styles/global.css"

import App from "./app/App"
import { UIContextProvider } from "src/shared/context/UIContext"
import { AuthContextProvider } from "src/shared/context/AuthContext"
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <BrowserRouter>
      <UIContextProvider>
        <AuthContextProvider>
          {/* <Provider store={store}> */}
          <App />
          {/* </Provider> */}
        </AuthContextProvider>
      </UIContextProvider>
    </BrowserRouter>
)

reportWebVitals()
