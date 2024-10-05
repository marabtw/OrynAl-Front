import Select from "react-select"

const SelectItems = ({
  placeholder = "Иван Петров",
  options = [],
  placeholderIcon = false,
  onChange,
  defaultValueIndex,
}) => {
  const customStyles = {
    container: (provided, state) => ({
      ...provided,
      width: "100%",
      height: "100%",
    }),
    control: (provided, state) => ({
      ...provided,
      width: "100%",
      height: "100%",
      border: "3px solid #EBEBEB",
      borderRadius: "20px",
      cursor: "pointer",
      fontSize: "15px",
      fontWeight: "600",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#4277FB",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#4277FB" : "transparent",
      color: state.isSelected ? "#fff" : "#333",
      "&:hover": {
        backgroundColor: "#4277FB",
        color: "#fff",
      },
    }),
    indicatorSeparator: (provided, state) => ({ display: "none" }), // Убираем разделитель
    dropdownIndicator: (provided, state) => ({ display: "none" }), // Убираем стрелку
    placeholder: (provided, state) => ({
      ...provided,
      color: "#C6C6C6",
    }),
  }

  const defaultValue = options[defaultValueIndex] || null

  return (
    <div className="h-[80px] max-md:h-[60px] max-sm:h-[50px] max-md:text-[14px]">
      <Select
        options={options}
        styles={customStyles}
        placeholder={`${placeholder} ${placeholderIcon ? "▼" : ""}`}
        onChange={(e) => onChange(e.value)}
        defaultValue={defaultValue}
      />
    </div>
  )
}

export default SelectItems
