import { LocationIcon } from "@ui/icons/icons"

const Location = ({ text = "no text" }) => {
  return (
    <div
      className={`ml-[-60px]
			flex items-center gap-[10px] z-[44]
			pl-[60px] pr-[40px] max-w-max h-[50px] max-md:h-[40px] 
			rounded-tr-[20px] rounded-br-[20px] pointer-events-auto
			text-[20px] font-semibold leading-[30px] max-lg:text-[16px] max-lg:leading-[21px] max-sm:text-[12px] max-sm:leading-[14px]
			bg-[#6AA7FC] text-white shadow-[0px_4px_9px_rgba(0,0,0,.25)]`}
    >
      <LocationIcon />
      <span>{text}</span>
    </div>
  )
}

export default Location
