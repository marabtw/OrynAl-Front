import React, { useState } from "react"
import { StarFullIcon, StarEmptyIcon } from "@ui/icons/icons"

const SetRating = ({ getRate = () => {} }) => {
  const [rate, setRate] = useState(0)
	const [hoverIndex, setHoverIndex] = useState(0)

  const toggleStar = (index) => {
    if (index === rate) {
      setRate(0)
      getRate(0)
    } else {
      setRate(index)
      getRate(index)
    }
  }

	const handleMouseEnter = (index) => {
    setHoverIndex(index)
  }

  const handleMouseLeave = () => {
    setHoverIndex(0)
  }

  return (
    <div className={`flex text-[20px] max-md:mx-auto`}>
      {Array.from([1, 2, 3, 4, 5], (i) =>
        i <= (hoverIndex || rate) ? (
          <StarFullIcon
            key={i}
            color="#ffb800"
            onClick={() => toggleStar(i)}
						onMouseEnter={() => handleMouseEnter(i)}
						onMouseLeave={handleMouseLeave}
            className="cursor-pointer"
          />
        ) : (
          <StarEmptyIcon
            key={i}
            color="#ffb800"
            onClick={() => toggleStar(i)}
						onMouseEnter={() => handleMouseEnter(i)}
						onMouseLeave={handleMouseLeave}
            className="cursor-pointer"
          />
        )
      )}
    </div>
  )
}

export default SetRating
