import { ROUTERS } from "@router/Router.config"
import { removeWildcard } from "@helpers"

import PageWrapper from "@components/PageWrapper/PageWrapper"
import PageHeading from "@ui/Heading/PageHeading"

import OwnersList from "../Owners/OwnersList/OwnersList"

const OwnersPage = () => {
  return (
    <PageWrapper>
      <PageHeading
        location={"Владельцы"}
        to={`${removeWildcard(ROUTERS.Management.root)}${
          ROUTERS.Management.createOwner
        }`}
      />
      <OwnersList />
    </PageWrapper>
  )
}

export default OwnersPage
