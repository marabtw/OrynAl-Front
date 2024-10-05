import { useState } from "react"

import { removeWildcard } from "@helpers"
import { ROUTERS } from "@router/Router.config"

import RatingStars from "@components/RatingStars/RatingStars"
import LinkButton from "@ui/Button/LinkButton"
import { HeartFullIcon, HeartEmptyIcon } from "@ui/icons/icons"

const RestaurantItemCard = ({ data }) => {
  const [favorive, setFavorite] = useState(false)

  return (
    <div
      className="relative flex flex-col items-center gap-[10px] 
			min-h-max w-[400px] py-[25px] px-[27px] max-2xl:w-[330px] max-lg:w-[250px] max-sm:w-[180px]
			font-poppins
			border-2 border-[#e2e2e2] rounded-md 
			shadow-[0px_0px_5px_-1px_#e2e2e2]
			max-lg:px-0 max-md:py-[10px]"
    >
      {favorive ? (
        <HeartFullIcon
          className="absolute top-[30px] right-[30px] text-[49px] cursor-pointer hover:fill-orange-600 
					max-lg:top-[15px] max-lg:right-[15px] max-lg:text-[35px] max-md:top-[5px] max-md:right-[5px] max-md:text-[30px]"
          onClick={() => setFavorite(!favorive)}
        />
      ) : (
        <HeartEmptyIcon
          className="absolute top-[30px] right-[30px] text-[49px] cursor-pointer hover:fill-orange-600 
					max-lg:top-[15px] max-lg:right-[15px] max-lg:text-[35px] max-md:top-[5px] max-md:right-[5px] max-md:text-[30px]"
          onClick={() => setFavorite(!favorive)}
        />
      )}
      <div className="rounded-full overflow-hidden w-[65%]">
        {data.icon ? (
          <img
            src={data.icon.route}
            alt="restaurant"
            className="w-full h-full aspect-square object-cover"
          />
        ) : (
          <div className="w-full aspect-square rounded-full border bg-slate-100"></div>
        )}
      </div>
      <h2
        className="text-[40px] leading-[60px] font-[600] underline 
			max-2xl:text-[30px] max-2xl:leading-[48px] max-lg:text-[20px] max-lg:leading-[30px] max-sm:text-[16px] max-sm:leading-[20px]"
      >
        {data.name}
      </h2>
      <div className="">
        <RatingStars
          textStyles={
            "text-[32px] max-xl:text-[26px] max-lg:text-[20px] max-md:text-[14px]"
          }
          rate={data.rate}
        />
      </div>
      {/* <p className="w-[204px] text-center text-[17px] leading-[25.5px]">
        {data.categories}
      </p> */}
      <p className="text-center text-[17px] leading-[25.5px] font-[400] max-lg:text-[14px] max-lg:leading-[20px] max-md:text-[12px] max-md:leading-[16px]">
        {data.address}
      </p>
      <LinkButton
        needAuth={true}
        to={`${removeWildcard(
          ROUTERS.Orders.root
        )}${ROUTERS.Orders.createOrder.replace(":restaurantId", data.id)}`}
        text={"Забронировать"}
        uppercase={true}
        spacingClass={
          "w-[236px] py-[18px] px-[5px] max-lg:w-[150px] max-lg:py-[8px] max-sm:w-full"
        }
        textClass="text-[15px] leading-[22.5px] font-[600] tracking-tight max-lg:text-center max-lg:text-[12px] max-lg:leading-[16px] max-sm:text-[10px] max-sm:leading-[14px]"
      />
    </div>
  )
}

export default RestaurantItemCard
