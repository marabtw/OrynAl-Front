import FormInputFile from "@ui/Field/FormInputFile"

const FormInputFileWrapper = ({ placeholder,multiple, label = "No Label data", getFiles, currentPhoto}) => {
  return (
    <div className="w-full h-full flex flex-col gap-[15px] max-md:gap-[5px]">
      <h3 className="text-[15px] font-[600] leading-[22.5px] max-md:text-[12px]	max-md:leading-[16px]">{label}</h3>
      <FormInputFile placeholder={placeholder} multiple={multiple} getFiles={getFiles} currentPhoto={currentPhoto}/>
    </div>
  )
}

export default FormInputFileWrapper
