import OrdersHistory from "../OrdersHistory/OrdersHistory"
import PageWrapper from "@components/PageWrapper/PageWrapper"
import PageHeading from "@ui/Heading/PageHeading"

const OrdersHistoryPage = () => {
  
  return (
    <PageWrapper>
      <PageHeading location={"История заказов"} />
      <OrdersHistory />
    </PageWrapper>
  )
}

export default OrdersHistoryPage
