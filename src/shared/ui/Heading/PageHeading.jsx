import CreateButton from "@ui/Button/CreateButton"

const PageHeading = ({ preLocation, location, to, onClick }) => {
  return preLocation ? (
    <div className="flex items-center gap-[10px] mb-[40px] font-poppins text-[32px] leading-[48px] font-[500] 
		max-lg:text-[24px] max-lg:mb-[20px] max-sm:text-[18px] max-lg:justify-center max-sm:mb-0">
      <h2 className="flex items-center gap-[10px]">
        <span>{preLocation}</span>
        <span className="font-[700]">{" - "}</span>
        <span className="font-[700]">{location}</span>
      </h2>
      {to && <CreateButton to={to} />}
      {onClick && <CreateButton onClick={onClick} />}
    </div>
  ) : (
    <div className="flex gap-[10px] items-center mb-[40px] font-poppins text-[32px] leading-[48px] font-[700] 
		max-lg:text-[24px] max-lg:mb-[20px] max-sm:text-[18px] max-lg:justify-center max-sm:mb-0">
      <h2 className="flex items-center ">
        {location}
      </h2>
      {to && <CreateButton to={to} />}
      {onClick && <CreateButton onClick={onClick} />}
    </div>
  )
}

export default PageHeading
