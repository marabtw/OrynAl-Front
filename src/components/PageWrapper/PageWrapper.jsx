const PageWrapper = ({ children }) => {
  return (
    <div className="px-[60px] py-[50px] max-lg:px-[10px] max-lg:py-[20px] max-md:px-[10px] max-sm:pt-0">
      {children}
    </div>
  )
}

export default PageWrapper
