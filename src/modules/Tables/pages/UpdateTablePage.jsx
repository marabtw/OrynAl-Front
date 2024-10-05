import { useParams } from "react-router-dom"

import PageWrapper from "@components/PageWrapper/PageWrapper"
import UpdateRestaurantTable from "../UpdateRestaurantTableForm/UpdateTableForm"

import PageHeading from "@ui/Heading/PageHeading"

const UpdateTablePage = () => {
  const { restaurantId } = useParams()

  return (
    <PageWrapper>
      <PageHeading location={"Изменить столик"} preLocation={"Мои рестораны"} />
      <UpdateRestaurantTable restaurantId={restaurantId} />
    </PageWrapper>
  )
}

export default UpdateTablePage
