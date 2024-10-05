const OrderReceipt = ({ table, date }) => {
  const formatLocalDate = (dateString) => {
    const date = new Date(dateString)

    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = String(date.getFullYear()).slice(-2)
    const hours = String(date.getHours()).padStart(2, "0")
    const minutes = String(date.getMinutes()).padStart(2, "0")

    return [`${day}.${month}.${year}`, `${hours}:${minutes}`]
  }

  return (
    <div
      className="w-full max-lg:w-2/3 max-sm:w-full
			px-[60px] py-[60px] max-xl:px-[30px] max-xl:py-[30px] max-lg:px-[30px] max-lg:py-[30px]
			font-poppins rounded-[20px] bg-white "
    >
      <div>
        <h2 className="font-[700] text-[32px] leading-[48px] max-xl:text-[24px] max-xl:leading-[30px] max-md:text-[20px] max-md:leading-[24px]">
          Ваш столик, дата и время
        </h2>
        <div className="w-[70%] h-[3px] bg-black rounded-full max-xl:mt-[5px] max-xl:h-[2px]"></div>
      </div>
      <div
        className="flex mt-[30px] text-[20px] leading-[30px] 
				max-xl:mt-[15px] max-xl:text-[16px] max-xl:leading-[20px] max-md:text-[14px] max-md:leading-[16px]"
      >
        <div className="w-[50%] font-[700]">
          <h4>ID столика:</h4>
          <h4>Название столика:</h4>
          <h4>Вместимость:</h4>
          <h4>Дата:</h4>
          <h4>Время:</h4>
        </div>
        <div className="w-[50%] ">
          <h4>{table?.id}</h4>
          <h4>{table?.name}</h4>
          <h4>{table?.capacity}</h4>
          <h4>{formatLocalDate(date)[0]}</h4>
          <h4>{formatLocalDate(date)[1]}</h4>
        </div>
      </div>
    </div>
  )
}

export default OrderReceipt
