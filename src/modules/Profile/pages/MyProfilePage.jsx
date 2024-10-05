import PageWrapper from "@components/PageWrapper/PageWrapper"
import PageHeading from "@ui/Heading/PageHeading"
import MyProfile from "../MyProfile/MyProfile"

const MyProfilePage = () => {
  return (
    <PageWrapper>
      <PageHeading location={"Мой аккаунт"} />
      <MyProfile />
    </PageWrapper>
  )
}

export default MyProfilePage
