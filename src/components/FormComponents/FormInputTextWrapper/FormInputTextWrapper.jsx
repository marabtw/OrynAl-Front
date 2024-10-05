import FormInputText from "@ui/Field/FormInputText"

const FormInputTextWrapper = ({
  placeholder,
  label = "No Label",
  type,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-[15px] w-full max-md:gap-[5px]">
      <h3 className="text-[15px] font-[600] max-md:text-[12px]">{label}</h3>
      <FormInputText
        placeholder={placeholder}
        type={type}
        onChange={onChange}
      />
    </div>
  )
}

export default FormInputTextWrapper
