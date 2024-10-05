import { useEffect, useState } from "react"
import { CrossIcon } from "@ui/icons/icons"
import { v4 as uuidv4 } from "uuid"

import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/pagination"
import { useToast } from "@hooks"

//always return array
const FormInputFile = ({
  placeholder = "didn't give a placeholder",
  multiple,
  getFiles = () => {},
  currentPhoto,
  fileSizeLimit = 1,
}) => {
  const showNotification = useToast()
  const id = uuidv4()
  const [temporaryFilesForShow, setTemporaryFilesForShow] = useState([])

  useEffect(() => {
    setTemporaryFilesForShow(
      Array.isArray(currentPhoto)
        ? currentPhoto
        : currentPhoto
        ? [currentPhoto]
        : []
    )
  }, [currentPhoto])

  useEffect(() => {
    getFiles(temporaryFilesForShow)
  }, [temporaryFilesForShow])

  const handleFileChange = (event) => {
    const files = event.target.files
    const newTemporaryFilesForShow = []

    for (let i = 0; i < files.length; i++) {
      if (
        files[i].size <= fileSizeLimit * 1000000 &&
        files[i].type.startsWith("image/")
      ) {
        newTemporaryFilesForShow.push({
          id: uuidv4(),
          route: URL.createObjectURL(files[i]),
          file: files[i],
        })
      } else {
        showNotification(
          `Размер файла: ${files[i].name} превышает ${fileSizeLimit}MB`,
          "warning"
        )
      }
    }

    setTemporaryFilesForShow(
      multiple
        ? [...temporaryFilesForShow, ...newTemporaryFilesForShow]
        : newTemporaryFilesForShow
    )
  }

  const deleteTemporaryFile = (index) => {
    if (index === null) return
    const newTemporaryFilesForShow = [...temporaryFilesForShow]
    URL.revokeObjectURL(newTemporaryFilesForShow[index.route])
    newTemporaryFilesForShow.splice(index, 1)
    setTemporaryFilesForShow(newTemporaryFilesForShow)
  }

  return (
    <div className="flex flex-col relative max-md:flex-row max-md:items-center max-md:gap-x-[10px]">
      <label
        htmlFor={`file-upload${id}`}
        className="relative w-full h-[80px] max-md:h-[60px]"
      >
        <input
          id={`file-upload${id}`}
          type="file"
          className="hidden"
          onChange={handleFileChange}
          multiple={multiple}
        />
        <div
          className="absolute top-0 left-0 flex flex-col justify-center items-center w-full h-full
			border-dashed border-[3px] border-[#ebebeb] rounded-[20px] text-[#C6C6C6] select-none cursor-pointer
			hover:border-[#60aafc] hover:text-[#60aafc] max-md:text-[14px]"
        >
          <span>+</span>
          <span>{placeholder}</span>
        </div>
      </label>
      {temporaryFilesForShow?.length > 0 && (
        <div className="w-full border-dashed border-[3px] rounded-[20px] mt-[10px] p-[5px] max-md:mt-0">
          <Swiper
            slidesPerView={"auto"}
            spaceBetween={10}
            pagination={false}
            style={{ overflow: "visible" }}
          >
            {temporaryFilesForShow.map((file, index) => (
              <SwiperSlide
                key={file?.id}
                style={{
                  overflow: "visible",
                  transition: "z-index 0s ease 0.05s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.zIndex = "2"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.zIndex = "1"
                }}
              >
                <div className="w-[40px] aspect-square relative rounded-lg border">
                  <div
                    className="absolute top-0 right-0 translate-y-[-40%] translate-x-[40%]
										flex justify-center items-center 
										w-[25px] aspect-square 
										cursor-pointer rounded-full 
										bg-red-300
										hover:bg-red-400 hover:text-white"
                    onClick={() => {
                      deleteTemporaryFile(index)
                    }}
                  >
                    <CrossIcon />
                  </div>
                  <img
                    src={file?.route}
                    alt={""}
                    className="hover:scale-[5] transition-all duration-150 rounded-lg"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  )
}

export default FormInputFile
