const Button = ({
  type = "button",
  text = "button",
  uppercase = false,
  spacingClass,
  textStyles,
  backgroundColor,
  gradient,
  rounded,
  onClick,
}) => {
  return (
    <button
      type={type}
      className={`flex items-center justify-center text-white font-poppins
			${textStyles ? textStyles : "text-[15px] font-[600] leading-[22.5px]"} 
			${gradient ? "bg-gradient-to-r from-customLightBlue to-customBLue" : ""} 
			${rounded ? rounded : "rounded-[10px]"} 
			${uppercase ? "uppercase" : ""} 
			${spacingClass ? spacingClass : "px-[16px] py-[10px]"} 
			max-sm:mx-0 max-sm:px-[10px]
			transition-all duration-150
			hover:scale-105
			`}
      style={{
        backgroundColor: backgroundColor,
      }}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default Button
