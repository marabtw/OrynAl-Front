import PageWrapper from "@components/PageWrapper/PageWrapper"
import PageHeading from "@ui/Heading/PageHeading"
import ServicesList from "../ServicesList/ServicesList"

const ServicesPage = () => {
	
  return (
    <PageWrapper>
      <PageHeading location={"Сервисы Ресторана"}/>
      <ServicesList/>
    </PageWrapper>
  )
}

export default ServicesPage
