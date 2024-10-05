import { CircleAddIcon, TrashIcon } from "@ui/icons/icons"

const FoodCard = ({ foodData = {}, getFoodForCart, selectedFoodsId = [] }) => {
  return (
    <div
      className="relative px-[30px] py-[40px] max-lg:py-[25px] max-lg:px-[20px]
				flex flex-col items-center justify-between 
				w-full h-[362px] max-lg:h-[280px] max-sm:h-[250px]
				font-poppins 
				transition-all duration-200 
				border border-[#c4c4c4] rounded-[50px] hover:border-[#447bfb] max-lg:rounded-[30px]
				shadow-[0px_4px_4px_rgba(0,0,0,.25)]"
    >
      <div className="absolute top-0 translate-y-[-50%] w-[150px] aspect-square rounded-full bg-slate-100 overflow-hidden max-lg:w-[100px] max-sm:w-[80px]">
        {foodData?.photo && (
          <img
            src={foodData.photo.route}
            alt={foodData.name}
            className="h-full aspect-square object-cover"
          />
        )}
      </div>
      <div
        className={`w-full relative before:w-[10px] before:aspect-square before:absolute before:right-0 before:top-[50%] before:translate-y-[-50%]
			 ${
         foodData.available ? "before:bg-[#c4c4c4]" : "before:bg-[#b91c1c]"
       } before:rounded-full`}
      ></div>
      <div className="w-[238px] flex flex-col items-center gap-[10px] text-center">
        <h3 className="text-[20px] font-[800] leading-[24px] max-md:text-[16px] max-md:leading-[20px]">
          {foodData.name}
        </h3>
        <hr className="w-[193px] h-[2px] text-center" />
        <p className="text-[15px] leading-[24px] overflow-auto max-md:text-[12px] max-md:leading-[14px]">
          {foodData.description}
        </p>
      </div>
      <div className="flex justify-between items-center w-full">
        {selectedFoodsId.includes(foodData.id) ? (
          <div
            className="flex justify-center items-center text-[24px] text-white w-[50px] aspect-square cursor-pointer bg-[#b91c1c] rounded-full hover:scale-105 max-md:w-[40px] max-md:text-[20px]"
            onClick={() => {
              getFoodForCart({
                id: foodData.id,
              })
            }}
          >
            <TrashIcon />
          </div>
        ) : (
          <div
            className="flex justify-center items-center text-[24px] text-white w-[50px] aspect-square cursor-pointer bg-[#6AA7FC] rounded-full hover:scale-105 max-md:w-[40px] max-md:text-[20px]"
            onClick={() => {
              getFoodForCart({
                id: foodData.id,
                amount: 1,
                photo: foodData.photo ? foodData.photo : { route: "" },
                name: foodData.name,
                price: foodData.price,
                itemTotalPrice: foodData.price,
              })
            }}
          >
            <CircleAddIcon />
          </div>
        )}
        <h3 className="font-[600] text-[24px] leading-[24px] max-md:text-[20px] max-md:leading-[20px]">
          {foodData.price} ₸
        </h3>
      </div>
    </div>
  )
}

export default FoodCard
