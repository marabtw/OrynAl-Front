import MobileMenuNavItem from "./MobileMenuNavItem"

const MobileMenuNavigation = ({ items, closeMobileNav }) => {
  return (
    <div className="fixed left-0 top-0 w-full h-full text-[24px] font-poppins font-[600] md:hidden">
      <div className="absolute top-0 left-0 flex flex-col justify-center gap-[5%] h-full px-[10%] w-[70%] bg-white max-sm:w-full z-10">
        <h3 className="text-center">
          Welcome, <span className="text-[#bac6cc]">Name</span>
        </h3>
        <hr />
        <div className="flex flex-col gap-4 text-[18px]">
          {items.map((el) => (
            <MobileMenuNavItem item={el} closeMobileNav={closeMobileNav}/>
          ))}
        </div>
        <button
          className="px-[35px] py-[5px] text-[18px] font-[500] mx-auto bg-[#d3dbde] rounded-full"
          onClick={() => closeMobileNav()}
        >
          Close
        </button>
      </div>
      <div className="h-full w-full bg-[rgba(0,0,0,.4)] backdrop-blur-sm"></div>
    </div>
  )
}

export default MobileMenuNavigation
