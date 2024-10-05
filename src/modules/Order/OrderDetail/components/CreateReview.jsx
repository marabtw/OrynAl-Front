import { useState } from "react"
import { axios } from "@lib/axios"

import { useLoading, useToast } from "@hooks"
import { createReviewRequest } from "../../api"

import SetRating from "./SetRating"
import Button from "@ui/Button/Button"

const CreateReview = ({ restaurantId }) => {
  const setLoading = useLoading()
  const showNotification = useToast()

  const [isSend, setIsSend] = useState(false)
  const [reviewData, setReviewData] = useState({
    stars: 0,
    description: "",
  })

  const isValid = () => {
    return reviewData.stars > 0 && reviewData.description
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isValid()) {
      showNotification("Не валидна", "warning")
      return
    }

    setLoading(true)

    const updatedReviewData = {
      ...reviewData,
      review: reviewData.description.replace("\n", " "),
      date: new Date().toISOString(),
    }

    createReviewRequest({ restaurantId, body: updatedReviewData })
      .then((res) => {
        setReviewData({
          stars: 0,
          description: "",
        })
        setIsSend(true)
      })
      .catch((err) => {
        showNotification(`Не удалось отправить комментарию: ${err}`, "error")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div
      className="mt-[50px] px-[40px] py-[20px] max-xl:px-[20px] max-xl:py-[15px] max-lg:mt-[20px]
			border border-[#F1F1F1] rounded-[34px] max-xl:rounded-[20px]
			bg-[#FDFDFD] shadow-[0px_16px_35px_-17px_rgba(0,0,0,.2)]"
    >
      <h2 className="mb-[10px] text-[25px] font-[700] leading-[37.5px] max-lg:text-[18px] max-lg:left-[20px]">
        Напишите отзыв
      </h2>
      {!isSend ? (
        <form
          className="flex flex-col items-center gap-[10px] w-full"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-between items-center px-[20px] py-[10px] gap-3 border border-[#d1d1d1] rounded-[14px] w-full max-md:flex-col">
            <textarea
              className="flex-1 w-full outline-none resize-none"
              placeholder="Отзыв..."
              value={reviewData.description}
              multiple={true}
              onChange={(e) =>
                setReviewData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
            <SetRating
              getRate={(stars) => {
                setReviewData((prev) => ({ ...prev, stars }))
              }}
            />
          </div>
          <Button
            type="button"
            text="Отправить"
            gradient={true}
            onClick={handleSubmit}
          />
        </form>
      ) : (
        <div className="flex justify-center px-[20px] py-[10px] gap-3 border border-[#d1d1d1] rounded-[14px] w-full max-md:flex-col">
          <p>Спасибо за ваш отзыв</p>
        </div>
      )}
    </div>
  )
}

export default CreateReview
