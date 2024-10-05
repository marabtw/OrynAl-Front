import { useState, useEffect } from "react"
import { formatPhoneNumber, formatNumber } from "@utils/index"
import { ShowIcon, HideIcon } from "@ui/icons/icons"

const LoginInput = ({
  label = "no label",
  placeholder = "no placeholder",
  type = "text",
  required = false,
  onChange = () => {},
}) => {
  const [inputValue, setInputValue] = useState("")
  const [inputType, setInputType] = useState(type)

  useEffect(() => {
    onChange(inputValue)
  }, [inputValue])

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

  const togglePasswordVisibility = () => {
    setInputType((prevType) => (prevType === "password" ? "text" : "password"))
  }

  return (
    <div className="text-[20px] leading-[30px] font-poppins">
      <h4 className="text-[#989898] font-[700]">{label}</h4>
      <label className="relative font-poppins">
        <input
          value={inputValue}
          type={inputType === "number" ? "default" : inputType}
          placeholder={placeholder}
          className="w-full p-[15px] font-[500] border-2 border-[#447DFB] rounded-[10px]"
          // required={required ? "required" : ""}
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
    </div>
  )
}

export default LoginInput
