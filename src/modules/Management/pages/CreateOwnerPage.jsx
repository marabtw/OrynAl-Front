import CreateOwnerForm from "../Owners/CreateOwner/CreateOwner"
import PageWrapper from "@components/PageWrapper/PageWrapper"
import PageHeading from "@ui/Heading/PageHeading"
import CreateFormsWrapper from "@components/CreateFormsWrapper/CreateFormsWrapper"

const CreateOwner = () => {
  return (
    <PageWrapper>
      <PageHeading location={"Создать владельца"} preLocation={"Владельцы"} />
      <CreateFormsWrapper>
        <CreateOwnerForm />
      </CreateFormsWrapper>
    </PageWrapper>
  )
}

export default CreateOwner
