import { useEffect, useState } from "react"
import { formatPhoneNumber, formatNumber } from "@utils"
import { ShowIcon, HideIcon } from "../icons/icons"

const FormInputText = ({
  placeholder = "no placeholder",
  type = "text",
  onChange = () => {},
}) => {
  const [inputValue, setInputValue] = useState("")
  const [inputType, setInputType] = useState(type)

  const handleInputChange = (value) => {
    if (type === "tel") {
      const formattedValue = formatPhoneNumber(value)
      if (formattedValue === inputValue) return
      setInputValue(formattedValue)
    } else if (type === "number") {
      const formattedValue = formatNumber(value)
      if (formattedValue === inputValue) return
      setInputValue(formattedValue)
    } else {
      setInputValue(value)
    }
  }

  useEffect(() => {
    onChange(inputValue)
  }, [inputValue])

  const togglePasswordVisibility = () => {
    setInputType((prevType) => (prevType === "password" ? "text" : "password"))
  }

  return (
    <label className="relative font-poppins h-[80px] max-md:h-[60px] max-sm:h-[50px]">
      <input
        value={inputValue}
        type={inputType === "number" ? "default" : inputType}
        placeholder={placeholder}
        className="w-full h-full px-[10px] text-[15px] font-[600] border-[3px] border-[#ebebeb] rounded-[20px] outline-none  placeholder-[#C6C6C6] 
				hover:border-[#60aafc] focus:border-[#60aafc]
				max-md:text-[14px]"
        onChange={(e) => {
          handleInputChange(e.target.value)
        }}
      />
      {type === "password" && (
        <div
          className="absolute right-5 top-1/2 translate-y-[-50%] text-[30px] cursor-pointer"
          onClick={(e) => {
            e.preventDefault()
            togglePasswordVisibility()
          }}
        >
          {inputType === "password" ? <ShowIcon /> : <HideIcon />}
        </div>
      )}
    </label>
  )
}

export default FormInputText
