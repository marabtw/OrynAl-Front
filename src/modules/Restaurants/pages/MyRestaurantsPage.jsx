import MyRestaurantsList from "../Owner/MyRestaurantsList/MyRestaurantsList"
import PageWrapper from "@components/PageWrapper/PageWrapper"
import PageHeading from "@ui/Heading/PageHeading"

const MyRestaurantsPage = () => {
  return (
    <PageWrapper>
      <PageHeading location={"Мои рестораны"} />
      <MyRestaurantsList />
    </PageWrapper>
  )
}

export default MyRestaurantsPage
