import { useHeaderHeight } from "@hooks"

import LinkButton from "@ui/Button/LinkButton"
import LinearGradientText from "@ui/LinearGradientText/LinearGradienText"
import LocationInfo from "@components/LocationInfo/LocationInfo"

import laptop from "@assets/images/laptop.png"

const HeroSection = ({ nextSectionRef }) => {
  const headerHeight = useHeaderHeight()
  const scrollToNextSection = () => {
    const nextSection = nextSectionRef.current
    if (nextSection) {
      window.scrollTo({
        top: nextSection.offsetTop - headerHeight - 20,
        behavior: "smooth",
      })
    }
  }

  return (
    <div
      className={`relative grid grid-cols-2 max-lg:grid-cols-1 font-poppins transition-all duration-150`}
      style={{ height: `calc(100vh - ${headerHeight}px)` }}
    >
			<LocationInfo text="Алматы" top="78%" left="-65px"/>
      <div className="flex flex-col w-full mt-[160px] px-[40px] max-lg:justify-center max-lg:mt-0">
        <h1 className="flex flex-col">
          <LinearGradientText
            tag={"h1"}
            text={"Бронируйте столики"}
            from={"#62AEFC"}
            to={"#3D6FFB"}
            className="font-ttcommon text-[70px] leading-[103.5px] font-[700] tracking-tight 
						max-2xl:text-[50px] max-2xl:leading-[70px] max-md:leading-[55px]"
          />
          <span
            className="font-[700] font-ttcommon text-[60px] leading-[82px] tracking-tight 
					max-2xl:text-[40px] max-2xl:leading-[62px] max-md:leading-[45px]"
          >
            в любимых заведениях
          </span>
        </h1>
        <p
          className="mt-[20px] text-[#657392] text-[25px] leading-[41px] font-[400] tracking-tight
				max-2xl:text-[20px] max-2xl:leading-[30px] max-md:leading-[25px]"
        >
          «Oryn Bar» — это платформа для онлайн-заказа и бронирования столиков в
          ресторанах, которое позволяет клиентам легко бронировать столики прямо
          через веб-сайт.
        </p>
        <LinkButton
          text={"Забронировать стол"}
          uppercase={true}
          className={
            "mt-[60px] w-[300px] h-[70px] shadow-[0px_4px_9px_rgba(0,0,0,.25)] max-xl:mt-[30px] max-sm:h-[50px] max-md:text-[16px]"
          }
          spacingClass={"px-[16px]"}
          onClick={scrollToNextSection}
        />
      </div>
      <div className="flex items-center w-full max-lg:hidden">
        <div className="relative translate-x-[5%] transition-all duration-300">
          <img
            src={laptop}
            alt="laptop"
            className="max-w-[888px] w-full rotate-[5.5deg] z-0"
          />
          <span
            className="absolute top-0 left-[5%] translate-y-[-10px] w-[250px] min-w-max px-[40px] py-[10px] rounded-[10px]
						text-center text-[30px] leading-[45px] font-[600] 
						bg-[#B33FFA] text-white shadow-[0px_4px_9px_rgba(0,0,0,.25)]
						max-xl:text-[25px] max-xl:leading-[30px] max-xl:py-[5px] max-xl:w-[200px]"
          >
            Бесплатно
          </span>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
