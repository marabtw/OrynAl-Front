import { createContext, useState, useEffect } from "react"
import { ToastContainer, toast as showToast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { v4 as uuidv4 } from "uuid"

import Loading from "@components/Loading"

const UIContext = createContext(null)

const UIContextProvider = ({ children }) => {
  const [openedContextMenuIndex, setOpenedContextMenuIndex] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [headerHeight, setHeaderHeight] = useState(100)

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth <= 768) {
        setHeaderHeight(60)
      } else if (window.innerWidth > 768) {
        if (window.scrollY > 900) {
          setHeaderHeight(80)
        } else {
          setHeaderHeight(120)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("resize", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [])

  const generateToastId = () => {
    return uuidv4()
  }

  const toast = (message = "no message", type = "default") => {
    const options = {
      toastId: generateToastId(),
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    }

    const toastMethod =
      {
        success: showToast.success,
        error: showToast.error,
        warning: showToast.warning,
        info: showToast.info,
      }[type && type.trim().toLowerCase()] || showToast

    toastMethod(message ? message : "no message", options)
  }

  return (
    <UIContext.Provider
      value={{
        openedContextMenuIndex,
        setOpenedContextMenuIndex,
        isLoading,
        setIsLoading,
        toast,
        headerHeight,
      }}
    >
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {isLoading && <Loading />}
      {children}
    </UIContext.Provider>
  )
}

export { UIContext, UIContextProvider }
