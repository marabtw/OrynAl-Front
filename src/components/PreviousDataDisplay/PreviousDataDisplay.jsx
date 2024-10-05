
const PreviousDataDisplay = ({label, value}) => {
  return (
    <div className="grid grid-cols-2 w-full 
		px-[20px] py-[30px] 
		font-poppins text-[15px] leading-[22.5px] 
		border-[3px] border-[#ebebeb] rounded-[20px] 
		bg-[#F0F6FF] 
		max-md:grid-cols-2 max-md:py-[10px] max-md:text-[12px]">
      <h4 className="font-[600]">{label}</h4>
      <h4 className="font-[500]">{Array.isArray(value) ? value.map((item) => item.name) : value}</h4>
    </div>
  )
}

export default PreviousDataDisplay
