import {
  StarFullIcon,
  StarHalfIcon,
  StarEmptyIcon,
} from "@ui/icons/icons"

const RatingStars = ({ textStyles, rate }) => {

  return (
    <div className={`flex ${textStyles ? textStyles : "text-[16px]"}`} style={{ color: "#ffb800" }}>
      {Array.from([0, 1, 2, 3, 4], (i) => {
        if (i < rate) return <StarFullIcon key={i} />
        if (i === rate) return <StarHalfIcon key={i}/>
        else return <StarEmptyIcon key={i} />
      })}
    </div>
  )
}

export default RatingStars
