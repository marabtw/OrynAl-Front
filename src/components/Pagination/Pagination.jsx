import { useEffect, useState } from "react"

const Pagination = ({ totalPage = 0, getCurrentPage = () => {} }) => {
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    getCurrentPage(currentPage)
  }, [currentPage])
  
	useEffect(() => {
    setCurrentPage(1)
  }, [totalPage])

  if (totalPage < 1) return

  const renderPages = () => {
    if (totalPage <= 5) {
      return [...Array(totalPage).keys()].map((page) => (
        <li key={page}>
          <button
            className={`flex items-center justify-center w-8 h-8 leading-tight border border-[#b2b2b2] rounded-md transition-all ease-out duration-150
						${
              currentPage === page + 1
                ? "bg-[#6aa7fc] text-white border-[#6aa7fc]"
                : "text-gray-500 hover:bg-[#e0e0e0]"
            }`}
            onClick={() => setCurrentPage(page + 1)}
          >
            {page + 1}
          </button>
        </li>
      ))
    } else {
      let pagesToShow = []
      if (currentPage < 5) {
        pagesToShow = [1, 2, 3, 4, 5, "more", totalPage]
      } else if (currentPage > totalPage - 4) {
        pagesToShow = [
          1,
          "more",
          totalPage - 4,
          totalPage - 3,
          totalPage - 2,
          totalPage - 1,
          totalPage,
        ]
      } else {
        pagesToShow = [
          1,
          "more",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "more",
          totalPage,
        ]
      }

      return (
        <>
          {pagesToShow?.map((page, index) => {
            if (page === "more")
              return (
                <li key={page + index}>
                  <span
                    className={`flex items-center justify-center w-8 h-8 leading-tight text-gray-500`}
                  >
                    ...
                  </span>
                </li>
              )
            else
              return (
                <li key={page + index}>
                  <button
                    className={`flex items-center justify-center w-8 h-8 leading-tight border border-[#b2b2b2] rounded-md transition-all ease-out duration-150
                  ${
                    currentPage === page
                      ? "bg-[#6aa7fc] text-white border-[#6aa7fc]"
                      : "text-gray-500 hover:bg-[#e0e0e0]"
                  }`}
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                </li>
              )
          })}
        </>
      )
    }
  }

  return (
    totalPage > 1 && (
      <nav
        aria-label="Page navigation"
        className="px-2	 py-1 bg-white max-w-max rounded-lg mx-auto"
      >
        <ul className="flex items-center -space-x-px h-8 text-sm font-bold gap-1">
          <li>
            <button
              onClick={() =>
                setCurrentPage((prevPage) => {
                  if (prevPage - 1 > 0) return prevPage - 1
                  return prevPage
                })
              }
              className={`flex items-center justify-center w-8 h-8 ms-0 leading-tight border rounded-md border-[#b2b2b2] transition-all ease-out duration-150
              ${
                currentPage === 1
                  ? "text-gray-300"
                  : "text-gray-500 hover:bg-[#e0e0e0]"
              }`}
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-2.5 h-2.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </button>
          </li>
          {renderPages()}
          <li>
            <button
              className={`flex items-center justify-center w-8 h-8 leading-tight border border-[#b2b2b2] rounded-md transition-all ease-out duration-150
              ${
                currentPage === totalPage
                  ? "text-gray-300"
                  : "text-gray-500 hover:bg-[#e0e0e0]"
              }
              `}
              onClick={() =>
                setCurrentPage((prevPage) => {
                  if (prevPage + 1 <= totalPage) return prevPage + 1
                  return prevPage
                })
              }
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-2.5 h-2.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    )
  )
}

export default Pagination
