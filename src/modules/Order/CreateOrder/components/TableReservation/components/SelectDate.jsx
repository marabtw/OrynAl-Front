import { useState, useRef } from "react"

const SelectDate = ({ getDate = () => {} }) => {
  const [selectedDate, setSelectedDate] = useState("")
  const inputRef = useRef(null)
  const today = new Date().toISOString().split("T")[0]

  const handleDateChange = (e) => {
    const date = e.target.value
    setSelectedDate(date)
    if (date) {
      const isoDate = new Date(date).toISOString()
      if (!isNaN(Date.parse(isoDate))) {
        getDate(isoDate.split("T")[0])
      }
    } else {
      getDate(null)
    }
  }

  const handleClick = () => {
    inputRef.current.showPicker()
  }

  const formatDate = (dateString) => {
    if (!dateString) return ""
    const [year, month, day] = dateString.split("-")
    return `${day} - ${month}`
  }

  return (
    <div
      onClick={handleClick}
      className="relative min-w-[120px] h-[50px] max-md:h-[30px]
			flex justify-center items-center
			border-2 border-[#fafafa] rounded-[10px] 
			text-[20px] leading-[30px] font-[400] max-md:text-[14px] max-md:leading-[18px]
			cursor-pointer"
    >
      <p>{selectedDate ? formatDate(selectedDate) : "дд - мм"}</p>
      <input
        ref={inputRef}
        type="date"
        value={selectedDate}
        min={today}
        onChange={handleDateChange}
        className="w-full h-full text-center bg-transparent border-none cursor-pointer outline-none pointer-events-none"
        style={{
          appearance: "none",
          position: "absolute",
          zIndex: "-1",
          opacity: "0",
          width: "100%",
          height: "100%",
          top: "0",
          left: "0",
        }}
      />
    </div>
  )
}

export default SelectDate
