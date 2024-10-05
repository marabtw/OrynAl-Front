import FormSelect from "@ui/Select/FormSelect"

const FormSelectWrapper = ({
  placeholder,
  label,
  placeholderIcon = false,
  options,
  onChange,
	defaultValueIndex,
}) => {
  return (
    <div className="w-full flex flex-col gap-[15px] max-md:gap-[5px]">
      <h3 className="text-[15px] font-[600] max-md:text-[12px]">{label} ▼</h3>
      <FormSelect
        placeholder={placeholder}
        placeholderIcon={placeholderIcon}
        options={options}
        onChange={onChange}
				defaultValueIndex={defaultValueIndex}
      />
    </div>
  )
}

export default FormSelectWrapper
