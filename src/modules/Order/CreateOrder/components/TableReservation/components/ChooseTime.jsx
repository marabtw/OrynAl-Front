import { ClockIcon } from "@ui/icons/icons"
import SelectTime from "./SelectITime"
import SelectDate from "./SelectDate"

const ChooseTime = ({ getFilter }) => {
  return (
    <div
      className="flex items-center 
				w-full min-h-[124px] 
				px-[180px] max-xl:px-[50px] max-lg:px-0 max-sm:py-[10px]
				font-poppins text-white 
				bg-gradient-to-r from-[#62ADFC] to-[#4277FB] 
				rounded-[20px]"
    >
      <div className="relative flex justify-between items-center w-full max-lg:flex-col max-lg:gap-[10px]">
        <h2 className="relative text-[30px] leading-[45px] font-[600] text-center max-lg:text-[20px] max-lg:leading-[25px] max-md:text-[18px] max-md:leading-[18px]">
          <ClockIcon className="absolute top-[50%] left-[0%] translate-x-[-110%] translate-y-[-50%] text-[76px] max-xl:hidden" />
          Выберите дату и время
        </h2>
        <div className="flex justify-between items-center gap-[100px] max-2xl:gap-[40px] max-md:gap-[20px] max-sm:flex-col max-sm:gap-[10px]">
          <div className="flex items-center gap-[20px]">
            <h4 className="text-[20px] leading-[30px] max-lg:text-[16px] max-lg:leading-[20px]">
              Дата
            </h4>
            <SelectDate
              getDate={(date) => {
                getFilter((prev) => ({
                  ...prev,
                  date,
                }))
              }}
            />
          </div>
          <div className="flex items-center gap-[20px]">
            <h4 className="text-[20px] leading-[30px] max-lg:text-[16px] max-lg:leading-[20px]">
              Время
            </h4>
            <SelectTime
              getValue={(time) => {
                getFilter((prev) => ({
                  ...prev,
                  time,
                }))
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChooseTime
