const CreateFormsWrapper = ({ children }) => {
  return (
    <div
      className="bg-white px-[40px] py-[80px] font-poppins rounded-[10px] 
			max-xl:py-[40px] max-lg:px-[20px] max-lg:py-[30px] max-sm:py-[15px] max-sm:px-[10px]"
    >
      <div className="w-1/2 max-2xl:w-[75%] max-lg:w-full">{children}</div>
    </div>
  )
}

export default CreateFormsWrapper
