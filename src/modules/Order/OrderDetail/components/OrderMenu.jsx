import logo from "@assets/svg/orderLogo.svg"
import { CrossIcon } from "@ui/icons/icons"

const OrderMenu = ({ foods, totalPrice }) => {
  return (
    <div className="min-w-[528px] max-md:min-w-0 max-lg:w-2/3 max-sm:w-full">
      <div
        className="flex justify-between items-center 
				w-full h-[137px] px-[30px] py-[20px] max-lg:h-[80px]
				text-white font-poppins shadow-[0px 4px 21px rgba(0,0,0,.1) 
				rounded-tr-[50px] rounded-tl-[50px]  max-lg:rounded-tr-[25px] max-lg:rounded-tl-[25px]
				bg-gradient-to-r from-[#62ADFC] to-[#447BFB]"
      >
        <h4
          className="relative text-[30px] font-[800] leading-[24px] max-lg:text-[20px] max-lg:leading-[24px]
				before:w-[47px] before:h-[5px] before:absolute before:top-[120%] max-lg:before:h-[3px]
				before:left-0 before:translate-y-[100%] before:bg-white before:rounded-[10px]"
        >
          Мой заказ
        </h4>
        <img
          src={logo}
          alt=""
          className="w-[85px] aspect-square max-lg:h-[50px]"
        />
      </div>
      <div
        className="w-full h-[904px] p-[5px] max-lg:h-full
				rounded-bl-[50px] rounded-br-[50px] max-lg:rounded-br-[25px] max-lg:rounded-bl-[25px]
				bg-gradient-to-r from-[#62ADFC] to-[#447BFB]"
      >
        <div
          className="flex flex-col justify-between w-full h-full  max-lg:min-h-[500px]
					px-[30px] py-[40px] bg-white 
					rounded-bl-[50px] rounded-br-[50px] max-lg:rounded-br-[25px] max-lg:rounded-bl-[25px]
					max-md:p-[10px]"
        >
          <ul className="flex-1 overflow-auto px-[10px]">
            {foods?.length > 0 ? (
              foods.map((el, index) => (
                <li key={el.id}>
                  <div className="flex items-center gap-[20px]">
                    <div className="w-[50px] h-[50px] rounded-full overflow-hidden bg-slate-100">
                      {el.photo && (
                        <img
                          src={el.photo.route}
                          alt=""
                          className="w-full aspect-square object-cover"
                        />
                      )}
                    </div>
                    <h4 className="flex flex-1 items-center">
                      {el.amount}
                      <CrossIcon className="text-[#4983FB]" />
                      {el.name}
                    </h4>
                    <h4 className="text-[#4983FB]">{el.price}</h4>
                  </div>
                  {index < foods.length - 1 && (
                    <div className="w-[55%] h-[3px] mb-[10px] mx-auto bg-[#c4c4c4]"></div>
                  )}
                </li>
              ))
            ) : (
              <p></p>
            )}
          </ul>
          <div className="mt-[30px]">
            <div className="px-[40px]">
              <div className="flex justify-between text-[32px] font-[600] leading-[24px] max-lg:text-[24px] max-lg:leading-[24px]">
                <h4 className="">Итого</h4>
                <h4 className="text-[#487AFB] ">{totalPrice}</h4>
              </div>
              <div className="w-full h-[6px] mt-[15px] bg-[#447AFB] rounded-[10px] max-lg:h-[3px]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderMenu
