import { useState } from "react"
import FormInputText from "@ui/Field/FormInputText"
import Button from "@ui/Button/Button"

const Modal = ({ close, updateService }) => {
  const [data, setData] = useState("")

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) {
      close()
    }
  }

  return (
    <>
      <div
        className="fixed top-0 left-0 z-[111] w-full h-full flex justify-center items-center bg-[rgba(0,0,0,.5)] backdrop-blur-sm"
        onClick={handleClickOutside}
      >
        <form className="flex flex-col gap-[10px] w-[500px] px-[30px] py-[30px] bg-slate-200 rounded-md">
          <h2 className="font-poppins font-semibold text-[18px] text-center">
            Изменить
          </h2>
          <div className="h-[60px]">
            <FormInputText
              placeholder="Сервиc"
              onChange={(value) => setData(value)}
            />
          </div>
          <Button
            gradient={true}
            text="Изменить"
            onClick={() => {
              updateService(data)
            }}
          />
        </form>
      </div>
    </>
  )
}

export default Modal
