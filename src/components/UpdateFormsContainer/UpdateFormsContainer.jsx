const UpdateFormsContainer = ({ children }) => {
  return (
    <div
      className="grid grid-cols-2 gap-x-7 gap-y-[20px] 
			px-[40px] py-[70px] 
			font-poppins 
			rounded-[10px] 
			bg-white 
			max-xl:grid-cols-1 max-xl:py-[40px] max-lg:px-[20px] max-lg:py-[30px] max-sm:py-[15px] max-sm:px-[10px]"
    >
      {children}
    </div>
  )
}

export default UpdateFormsContainer
