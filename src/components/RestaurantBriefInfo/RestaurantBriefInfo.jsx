import { CallIcon, ClockIcon } from "@ui/icons/icons"
import { formatTimeString } from "@utils"
import icon from "@assets/images/icons/workIcon.png"

const RestaurantBriefInfo = ({ data, className }) => {
  const getService = (name) => {
    return (
      <div className="flex py-[10px] px-[20px] gap-x-[10px] h-[53px] items-center shadow-[0px_4px_10px_-2px_rgba(0,0,0,.2)] rounded-[20px]">
        <img src={icon} alt="icon" className="w-[30px] rounded-full" />
        <p>{name}</p>
      </div>
    )
  }

  return (
    <div
      className={`flex flex-col gap-[40px] w-full bg-white rounded-[20px] ${className} max-md:gap-[20px]`}
    >
      <div className="flex gap-[30px] max-md:flex-col max-md:items-center max-md:gap-[10px]">
        <div className="min-w-[140px] w-[140px]">
          {data?.icon ? (
            <img
              src={data?.icon?.route}
              alt=""
              className="w-full aspect-square rounded-full object-cover"
            />
          ) : (
            <div className="w-full h-full border-2 rounded-full bg-slate-100"></div>
          )}
        </div>
        <div className="flex flex-col gap-[10px]">
          <div className="max-md:text-center">
            <h1 className="text-[35px] font-[600] leading-[52.5px] max-lg:text-[25px] max-lg:leading-[30px]">
              {data?.name}
            </h1>
            <p className="text-[20px] leading-[30px] font-[500] max-lg:text-[16px] max-lg:leading-[20px]">
              {data?.description}
            </p>
          </div>
          <div className="flex gap-[15px] flex-wrap max-md:justify-center">
            <div
              className="flex items-center gap-[10px] 
							px-[40px] py-[10px] max-lg:px-[20px]
							text-[15px] max-lg:text-[12px]
							bg-gradient-to-t from-[#599AFF] to-[#4577FB] text-white 
							rounded-[15px] 
						"
            >
              <CallIcon />
              <span>{data?.phone ? data.phone : "+0 (000) 000 00 00"}</span>
            </div>
            <div
              className="flex items-center gap-[10px] 
							px-[40px] py-[10px] max-lg:px-[20px]
							text-[15px] max-lg:text-[12px]
							bg-gradient-to-t from-[#599AFF] to-[#4577FB] text-white 
							rounded-[15px] "
            >
              <ClockIcon />
              <span className="flex items-center text-center">{`${formatTimeString(
                data?.modeFrom
              )} - ${formatTimeString(data?.modeTo)}`}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-[20px] max-sm:grid-cols-1 max-md:text-[12px] max-md:gap-y-[5px]">
        {data?.services?.map((service) => (
          <div
            key={service + Math.random()}
            className="flex gap-x-[10px] items-center  
							py-[10px] px-[20px] h-[53px] max-md:h-[34px]
							shadow-[0px_4px_10px_-2px_rgba(0,0,0,.2)] rounded-[20px] max-md:shadow-[0px_1px_5px_-1px_rgba(0,0,0,.2)]
						"
          >
            {service?.image && (
              <img
                src={service.image}
                alt=""
                className="h-full aspect-square rounded-full bg-slate-100 object-cover"
              />
            )}
            <p>{service?.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RestaurantBriefInfo
