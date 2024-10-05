import { useState, useEffect} from "react"

const FormCheckbox = ({ service = {}, onChange, initialChecked }) => {
  const [checked, setChecked] = useState(initialChecked)

	useEffect(() => {
    setChecked(initialChecked)
  }, [initialChecked])

  return (
    <label
      htmlFor={`checkbox-${service.id}`}
      className="relative flex gap-x-[10px] items-center max-w-max max-md:text-[14px]"
    >
      <input
        id={`checkbox-${service.id}`}
        type="checkbox"
        className="hidden"
        onChange={() => {
          setChecked(!checked)
          onChange(service)
        }}
      />
      <span
        className={`p-[2px] w-[21px] aspect-square border border-[#EBEBEB] cursor-pointer`}
      >
        {checked && <div className="w-full h-full bg-[#05FF00]"></div>}
      </span>
      <p className="cursor-pointer">{service.name}</p>
    </label>
  )
}

export default FormCheckbox
