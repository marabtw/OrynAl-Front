import UpdateRestaurantForm from "../Common/UpdateRestaurantForm/UpdateRestaurantForm"
import PageWrapper from "@components/PageWrapper/PageWrapper"
import PageHeading from "@ui/Heading/PageHeading"

const UpdateRestaurantPage = () => {
  return (
    <PageWrapper>
      <PageHeading
        location={"Изменить Ресторан"}
        preLocation={"Мои рестораны"}
      />
      <UpdateRestaurantForm />
    </PageWrapper>
  )
}

export default UpdateRestaurantPage
