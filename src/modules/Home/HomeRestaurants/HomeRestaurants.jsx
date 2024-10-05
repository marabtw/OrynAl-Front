import React from "react"

import Restaurants from "./components/Restaurants"
import PopularRestaurants from "./components/PopularRestaurants"

const HomeRestaurants = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className="mt-[70px] px-[100px] max-xl:px-[20px]">
      <Restaurants />
      <PopularRestaurants />
    </div>
  )
})

export default HomeRestaurants
