import { ROUTERS } from "@router/Router.config"
import { removeWildcard } from "@helpers"

import PageWrapper from "@components/PageWrapper/PageWrapper"
import PageHeading from "@ui/Heading/PageHeading"

import RestaurantsList from "../Restaurants/RestaurantsList/RestaurantsList"

const RestaurantsPage = () => {
  return (
    <PageWrapper>
      <PageHeading
        location={"Рестораны"}
        to={`${removeWildcard(ROUTERS.Management.root)}${
          ROUTERS.Management.createRestaurant
        }`}
      />
      <RestaurantsList />
    </PageWrapper>
  )
}

export default RestaurantsPage
