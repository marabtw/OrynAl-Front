import React, { useState, useRef, useEffect } from "react"

const generateTimeOptions = () => {
  const options = []
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 60; j += 15) {
      const hour = i.toString().padStart(2, "0")
      const minute = j.toString().padStart(2, "0")
      options.push({ value: `${hour}:${minute}`, label: `${hour}:${minute}` })
    }
  }
  return options
}

const SelectTime = ({ getValue = () => {} }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const options = generateTimeOptions()
  const containerRef = useRef(null)

  const handleSelect = (option) => {
    setIsOpen(false)
    setSearchTerm(option.label)
    getValue(option.value)
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    setIsOpen(true)
  }

  const filteredOptions = options.filter((option) =>
    option.label.includes(searchTerm)
  )

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative min-w-[120px] max-w-[120px] h-[50px] max-md:h-[30px]
      flex flex-col justify-center items-center
      border-2 border-[#fafafa] rounded-[10px] 
      text-[20px] leading-[30px] font-[400] max-md:text-[14px] max-md:leading-[18px]"
    >
      <div className="relative w-full h-full flex justify-center items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="00:00"
          className="absolute inset-0 w-full h-full px-2 py-1 bg-transparent text-center cursor-pointer placeholder-white outline-none"
          onFocus={() => setIsOpen(true)}
        />
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 w-full max-h-[200px] overflow-auto bg-white border border-[#fafafa] rounded-[10px] z-10 text-black shadow-md mt-2">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <div
                key={option.value}
                className="px-2 py-1 cursor-pointer hover:bg-[#4277FB] hover:text-white"
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </div>
            ))
          ) : (
            <div className="px-2 py-1">Нет совпадений</div>
          )}
        </div>
      )}
    </div>
  )
}

export default SelectTime
