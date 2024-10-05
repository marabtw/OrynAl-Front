import React, { useEffect, useState } from "react"
import logo from "@assets/svg/orderLogo.svg"
import Button from "@ui/Button/Button"
import { CrossIcon, MinusIcon, PlusIcon } from "@ui/icons/icons"
import { useToast } from "@hooks"

const Cart = ({
  show,
  foodsInCart = [],
  updateCart,
  toggleCreateButton,
  closeCart,
}) => {
  const showNotification = useToast()
  const [totalSum, setTotalSum] = useState(0)

  useEffect(() => {
    if (!foodsInCart || foodsInCart.length === 0) {
      setTotalSum(0)
      return
    }
    const totalPrice = foodsInCart.reduce((acc, item) => {
      if (!item) return acc
      return acc + item.price * item.amount
    }, 0)
    setTotalSum(totalPrice)
  }, [foodsInCart])

  const increase = (foodId) => {
    const isFoodInCart = foodsInCart.some((item) => item.id === foodId)
    if (isFoodInCart) {
      updateCart((prev) => ({
        ...prev,
        foods: prev.foods.map((food) => {
          if (food.id === foodId) {
            const newAmount = food.amount + 1
            return {
              ...food,
              amount: newAmount,
              itemTotalPrice: food.price * newAmount,
            }
          } else {
            return { ...food }
          }
        }),
      }))
    } else {
      showNotification("Не найден в корзине", "warning")
    }
  }

  const decrease = (foodId) => {
    let needFilter = false
    const updatedCart = foodsInCart.map((food) => {
      if (food.id === foodId) {
        const newAmount = food.amount - 1
        if (newAmount > 0) {
          needFilter = false
          return {
            ...food,
            amount: newAmount,
            itemTotalPrice: food.price * newAmount,
          }
        } else {
          needFilter = true
          return null
        }
      }
      return food
    })
    if (needFilter) {
      updateCart((prev) => {
        return { ...prev, foods: updatedCart.filter((order) => order !== null) }
      })
      return
    }
    updateCart((prev) => {
      return { ...prev, foods: updatedCart }
    })
  }

  return (
    <div className="max-2xl:absolute">
      <div
        className={`2xl:hidden pointer-events-none fixed top-0 left-0 w-full h-full duration-100 z-[66] ${
          show &&
          "pointer-events-auto max-2xl:bg-[rgba(0,0,0,.2)] backdrop-blur-[5px]"
        }`}
        onClick={() => {
          closeCart()
        }}
      ></div>
      <div
        className={`max-2xl:fixed 
				flex flex-col
				w-[528px] h-[1200px] max-md:w-full max-2xl:h-full
				duration-300 ease-in-out 
				max-2xl:left-full max-2xl:top-0 
				max-2xl:z-[66] 
				${show && "max-2xl:translate-x-[-100%]"}`}
      >
        <div
          className="
						flex justify-between items-center 
						w-full h-[137px] max-2xl:h-[80px] max-md:h-[60px]
						px-[30px]
						text-white font-poppins
						rounded-tr-[50px] rounded-tl-[50px] max-2xl:rounded-tr-[0px] max-2xl:rounded-tl-[25px] max-md:rounded-tl-[0px]
						bg-gradient-to-r from-[#62ADFC] to-[#447BFB] shadow-[0px 4px 21px rgba(0,0,0,.1) "
        >
          <h4
            className="
						relative 
						text-[30px] font-[800] leading-[24px] max-2xl:text-[20px] max-2xl:leading-[24px]
						before:absolute before:top-[120%] before:left-0 
						before:w-[47px] before:h-[5px] max-2xl:before:h-[3px]
						before:translate-y-[100%] before:rounded-[10px]
						before:bg-white "
          >
            Мой заказ
          </h4>
          <img
            src={logo}
            alt=""
            className="w-[85px] aspect-square object-cover max-2xl:w-[50px]"
          />
        </div>
        <div
          className="w-full max-2xl:h-[calc(100%-100px)] flex-1
					p-[5px] 
					rounded-bl-[50px] rounded-br-[50px] max-2xl:rounded-bl-[25px] max-2xl:rounded-br-[0] max-md:rounded-bl-[0]
					bg-gradient-to-r from-[#62ADFC] to-[#447BFB] "
        >
          <div
            className="flex flex-col justify-between 
						w-full h-full 
						px-[30px] py-[40px] max-2xl:px-[10px] max-2xl:py-[10px]
						bg-white 
						rounded-bl-[50px] rounded-br-[50px] max-2xl:rounded-bl-[25px] max-2xl:rounded-br-[0] max-md:rounded-bl-[0] max-2xl:rounded-tl-[10px] max-2xl:rounded-tr-[10px] "
          >
            <ul className="flex-1 overflow-auto px-[10px]">
              {foodsInCart?.length > 0 ? (
                foodsInCart.map((cartItem, index) => (
                  <li key={cartItem?.id}>
                    <div className="flex items-center gap-[20px]">
                      <div className="w-[50px] h-[50px] rounded-full overflow-hidden border bg-slate-100">
                        {cartItem?.photo && (
                          <img
                            src={cartItem.photo.route}
                            alt=""
                            className="w-full aspect-square object-cover"
                          />
                        )}
                      </div>
                      <h4 className="flex flex-1 items-center">
                        {cartItem?.amount}
                        <CrossIcon className="text-[#4983FB]" />
                        {cartItem?.name}
                      </h4>
                      <h4 className="text-[#4983FB]">
                        {cartItem?.itemTotalPrice}
                      </h4>
                      <div className="flex">
                        <button
                          type="button"
                          className="flex justify-center items-center w-[24px] aspect-square text-[20px]"
                          onClick={() => {
                            decrease(cartItem.id)
                          }}
                        >
                          <MinusIcon />
                        </button>
                        <button
                          type="button"
                          className="flex justify-center items-center w-[24px] aspect-square text-[20px]"
                          onClick={() => {
                            increase(cartItem.id)
                          }}
                        >
                          <PlusIcon />
                        </button>
                      </div>
                    </div>
                    {index < foodsInCart.length && (
                      <div className="w-[55%] h-[3px] mb-[10px] mx-auto bg-[#c4c4c4]"></div>
                    )}
                  </li>
                ))
              ) : (
                <p className="text-center text-[#c4c4c4]">Пустая корзина :(</p>
              )}
            </ul>
            <div className="mt-[30px] mx-[10px]">
              <div className="px-[40px] mb-[20px] max-2xl:mb-[10px]">
                <div className="flex justify-between text-[32px] font-[600] leading-[24px] max-2xl:text-[24px] max-md:text-[20px]">
                  <h4 className="">Итого</h4>
                  <h4 className=" text-[#487AFB]">{totalSum}</h4>
                </div>
                <div className="w-full h-[6px] mt-[15px] bg-[#447AFB] rounded-[10px] max-2xl:h-[4px] max-2xl:mt-[10px]"></div>
              </div>
              <Button
                textStyles={"text-[18px] font-[800] leading-[24px]"}
                text="Подтвердить"
                gradient={true}
                rounded={"rounded-[10px]"}
                spacingClass={"px-[10px] py-[20px] w-full max-2xl:py-[15px]"}
                onClick={() => toggleCreateButton()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Cart)
