import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"

import { ROUTERS } from "@router/Router.config"
import { removeWildcard } from "@helpers"

import Router from "@router/Router"
import Header from "@modules/Header"

import "react-toastify/dist/ReactToastify.css"

function App() {
  const currentPath = useLocation().pathname
  const [headerHeight, setHeaderHeight] = useState(120)

  const handleScroll = () => {
    if (window.scrollY > 60) {
      setHeaderHeight(60)
    } else {
      setHeaderHeight(120)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <>
      <div className="relative font-poppins">
        {currentPath !==
          `${removeWildcard(ROUTERS.Authorization.root)}${
            ROUTERS.Authorization.login
          }` && <Header />}
        <Router />
      </div>
    </>
  )
}

export default App
