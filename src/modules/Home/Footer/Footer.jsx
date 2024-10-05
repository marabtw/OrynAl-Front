import { useEffect, useState } from "react"
import { axios } from "@lib/axios"

import LinearGradientText from "@ui/LinearGradientText/LinearGradienText"

import logo from "@assets/images/logo.png"

import { getStatisctics } from "../api"
import { useLoading, useToast } from "@hooks"

const Footer = () => {
  const setLoading = useLoading()
  const showNotification = useToast()
  const [statistics, setStatistics] = useState({})

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source()
    setLoading(true)
    getStatisctics({ cancelToken: cancelTokenSource.token })
      .then(({ data }) => {
        setStatistics(data)
      })
      .catch((err) => {
        setStatistics({
          reserved_count: 0,
          people_count: 0,
          restaurants_count: 0,
        })
        showNotification(err, "error")
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <footer className="px-[30px] py-[100px] flex flex-col gap-[150px] max-lg:py-[75px] max-lg:gap-[75px] max-md:py-[50px] max-md:gap-[50px]">
      <div className="grid grid-cols-3 gap-[30px] max-lg:grid-cols-1">
        <div className="text-center mx-auto">
          <LinearGradientText
            tag="h2"
            text={statistics.reserved_count}
            from={"#6AA7FC"}
            to={"#3D6FFB"}
            className="font-[600] text-[100px] leading-[100px] max-lg:text-[70px] max-lg:leading-[80px] max-md:text-[40px] max-md:leading-[45px]"
          />
          <p className="mt-[10px] text-[25px] leading-[22.5px] font-[400] text-center max-lg:text-[20px] max-lg:leading-[19px] max-md:text-[16px] max-md:leading-[16px]">
            Заявок на бронь столиков полученные от нас рестораны, кафе.
          </p>
        </div>
        <div className="text-center mx-auto">
          <LinearGradientText
            tag="h2"
            text={statistics.people_count}
            from={"#6AA7FC"}
            to={"#3D6FFB"}
            className="font-[600] text-[100px] leading-[100px] max-lg:text-[70px] max-lg:leading-[80px] max-md:text-[40px] max-md:leading-[45px]"
          />
          <p className="mt-[10px] text-[25px] leading-[22.5px] font-[400] text-center max-lg:text-[20px] max-lg:leading-[19px] max-md:text-[16px] max-md:leading-[16px]">
            Человека пришли в заведение по нашей брони.
          </p>
        </div>
        <div className="text-center mx-auto">
          <LinearGradientText
            tag="h2"
            text={statistics.restaurants_count}
            from={"#6AA7FC"}
            to={"#3D6FFB"}
            className="font-[600] text-[100px] leading-[100px] max-lg:text-[70px] max-lg:leading-[80px] max-md:text-[40px] max-md:leading-[45px]"
          />
          <p className="mt-[10px] text-[25px] leading-[22.5px] font-[400] text-center max-lg:text-[20px] max-lg:leading-[19px] max-md:text-[16px] max-md:leading-[16px]">
            Кафе, баров, банкетных залов и ресторанов на сайте
          </p>
        </div>
      </div>
      <div className="flex justify-between flex-wrap gap-[20px]">
        <div className="flex items-center gap-[10px] h-[49px] text-[20px] font-[600] leading-[30px] max-md:h-[30px] max-md:text-[16px] max-md:leading-[20px]">
          <img
            src={logo}
            alt="logo"
            className="h-full bg-[#4476FB] rounded-full "
          />
          <h5>OrynBar - 2024</h5>
        </div>
        <div className="flex flex-wrap items-center gap-[40px] text-[20px] leading-[24px] text-[#969696] max-md:text-[16px] max-md:leading-[20px] max-md:gap-[10px]">
          <h5>О нас</h5>
          <h5>Контакты</h5>
          <h5>Стать партнером</h5>
          <h5>Мы в социальных сетях</h5>
        </div>
        <label
          htmlFor="footerInput"
          className="relative w-[585px] max-lg:w-full"
        >
          <input
            id="footerInput"
            type="text"
            placeholder="Написать нам..."
            className="w-full px-[20px] py-[15px] border-[3px] border-[#C4C4C4] rounded-[10px]"
          />
          <button className="absolute top-1/2 right-[10px] translate-y-[-50%] px-[20px] py-[10px] text-[15px] leading-[24px] text-white bg-[#66A2FC] rounded-[10px]">
            Отправить
          </button>
        </label>
      </div>
    </footer>
  )
}

export default Footer
