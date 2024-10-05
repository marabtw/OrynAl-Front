import { useParams } from "react-router-dom"

import { removeWildcard } from "@helpers"

import MyRestaurantMenuList from "../MyRestaurantsMenuList/MyRestaurantMenuList"
import { ROUTERS } from "@router/Router.config"
import PageWrapper from "@components/PageWrapper/PageWrapper"

import PageHeading from "@ui/Heading/PageHeading"

const MyRestaurantMenus = () => {
  const { restaurantId } = useParams()
  return (
    <PageWrapper>
      <PageHeading
        location={"Меню"}
        preLocation={"Мои рестораны"}
        to={`${removeWildcard(
          ROUTERS.RestaurantMenu.root.replace(":restaurantId", restaurantId)
        )}${ROUTERS.RestaurantMenu.createFood}`}
      />
      <MyRestaurantMenuList restaurantId={restaurantId} />
    </PageWrapper>
  )
}

export default MyRestaurantMenus
