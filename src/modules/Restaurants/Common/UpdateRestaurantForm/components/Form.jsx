import { getAllCities, getTimes } from "../../../api"

import FormInputTextWrapper from "@components/FormComponents/FormInputTextWrapper/FormInputTextWrapper"
import FormInputFileWrapper from "@components/FormComponents/FormInputFileWrapper/FormInputFileWrapper"
import FormSelectWrapper from "@components/FormComponents/FormSelectWrapper/FormSelectWrapper"

import FormCheckbox from "@ui/Field/FormCheckbox"
import FormSelect from "@ui/Select/FormSelect"

const Form = ({ services, restaurantData, setDataForUpdate }) => {
  const handleChange = (key, value) => {
    setDataForUpdate((prevState) => {
      // Обработка иконки
      if (key === "icon") {
        return {
          ...prevState,
          [key]: value[0] || {},
        }
      }

      // Обработка фотографий
      if (key === "photos") {
        return {
          ...prevState,
          [key]: value?.length > 0 ? value : [],
        }
      }

      // Обработка булевых значений
      if (typeof value === "boolean") {
        return {
          ...prevState,
          [key]: value,
        }
      }

      // Обработка сервисов
      if (key === "services") {
        const existingService = prevState[key]?.some(
          (item) => item.id === value.id
        )
        const updatedServices = existingService
          ? prevState[key].filter((item) => item.id !== value.id)
          : prevState[key]
          ? [...prevState[key], value]
          : [value]

        return {
          ...prevState,
          [key]: updatedServices.length > 0 ? updatedServices : null,
        }
      }

      // Обработка всех остальных случаев
      return {
        ...prevState,
        [key]: value ? value : restaurantData[key],
      }
    })
  }

  return (
    <form className="flex flex-col gap-[30px] w-full px-[20px] py-[40px] border-[3px] border-[#ebebeb] rounded-[20px] ">
      <div className="grid grid-cols-2 gap-[30px] max-md:grid-cols-1">
        <FormInputTextWrapper
          placeholder="Sandyq"
          label="Название:"
          onChange={(value) => handleChange("name", value)}
        />
        <FormInputFileWrapper
          placeholder="Добавить логотип"
          label="Логотип:"
          currentPhoto={restaurantData.icon}
          getFiles={(files) => {
            handleChange("icon", files)
          }}
        />
      </div>
      <div className="grid grid-cols-2 gap-[30px] max-md:grid-cols-1">
        <FormInputTextWrapper
          placeholder="Абай, 101"
          label="Адрес"
          onChange={(value) => handleChange("address", value)}
        />
        <FormInputFileWrapper
          placeholder="Добавить фото"
          label="Фотографии:"
          currentPhoto={restaurantData.photos}
          multiple={true}
          getFiles={(files) => {
            handleChange("photos", files)
          }}
        />
      </div>
      <FormInputTextWrapper
        placeholder="Напишите краткое описание меню...."
        label="Описание"
        onChange={(value) => handleChange("description", value)}
      />
      <div className="grid grid-cols-2 gap-[30px] max-md:grid-cols-1">
        <div className="flex flex-col gap-[15px]">
          <h3 className="text-[15px] font-[600] left-[22.5px]">
            Режим работы ▼
          </h3>
          <div className="flex items-center gap-[10px]">
            <div className="w-1/2">
              <FormSelect
                placeholder={"10:00"}
                options={getTimes()}
                onChange={(value) => handleChange("modeFrom", value)}
              />
            </div>
            <p className="text-[#C6C6C6] text-[15px]">-</p>
            <div className="w-1/2">
              <FormSelect
                placeholder={"22:00"}
                options={getTimes()}
                onChange={(value) => handleChange("modeTo", value)}
              />
            </div>
          </div>
        </div>
        <FormSelectWrapper
          label={"Город"}
          placeholder={"Алматы"}
          options={getAllCities()}
          onChange={(value) => handleChange("city", value)}
        />
        <FormInputTextWrapper
          placeholder="+0 (000) 000 00 00"
          type={"tel"}
          label="Номер телефона:"
          onChange={(value) => {
            handleChange("phone", value)
          }}
        />
        <FormSelectWrapper
          label={"Статус русторана"}
          options={[
            { label: "Активный", value: true },
            { label: "Не активный", value: false },
          ]}
          onChange={(value) => handleChange("status", value)}
          defaultValueIndex={restaurantData.status ? 1 : 0}
        />
      </div>
      <div className="grid grid-cols-2 gap-[10px] max-md:grid-cols-1">
        {services?.map((service) => (
          <FormCheckbox
            key={service.id}
            service={service}
            initialChecked={restaurantData.services?.some(
              (obj) => obj.id === service.id
            )}
            onChange={(service) => {
              handleChange("services", service)
            }}
          />
        ))}
      </div>
    </form>
  )
}
export default Form
