import { useRef } from "react"

import HeroSection from "../HeroSection/HeroSection"
import HomeRestaurants from "../HomeRestaurants/HomeRestaurants"
import Footer from "../Footer/Footer"

const HomePage = () => {
  const nextSectionRef = useRef(null)

  return (
    <div className="overflow-x-hidden">
      <div className="mx-[65px] bg-white max-xl:mx-[20px] max-md:mx-0">
        <HeroSection nextSectionRef={nextSectionRef} />
        <HomeRestaurants ref={nextSectionRef} />
      </div>
      <Footer />
    </div>
  )
}

export default HomePage
