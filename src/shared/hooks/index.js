import { useEffect, useState, useCallback } from "react"
import { useContext } from "react"
import { UIContext } from "@context/UIContext"
import { axios } from "@lib/axios"

export const useToast = () => {
  const { toast } = useContext(UIContext)
  if (!toast) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return toast
}

export const useLoading = () => {
  const { setIsLoading } = useContext(UIContext)

  const setLoading = (isLoading) => {
    setIsLoading(isLoading)
  }

  return setLoading
}

export const useContextMenu = (index) => {
  const { openedContextMenuIndex, setOpenedContextMenuIndex } =
    useContext(UIContext)

  const closeContextMenuFunction = () => {
    setOpenedContextMenuIndex(null)
  }

  const handleContextMenu = () => {
    if (openedContextMenuIndex === index) {
      setOpenedContextMenuIndex(null)
    } else {
      setOpenedContextMenuIndex(index)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        openedContextMenuIndex === index &&
        !event.target.closest(".context-menu-wrapper")
      ) {
        closeContextMenuFunction()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [openedContextMenuIndex])

  return {
    openedContextMenuIndex,
    handleContextMenu,
    closeContextMenuFunction,
  }
}

export const useHeaderHeight = () => {
  const { headerHeight } = useContext(UIContext)
  return headerHeight
}

export const useCloudinary = () => {
  const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET_NAME
  const cloudinaryUploadUrl = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`
  const cloudinaryDeleteUrl = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/destroy`

  if (!uploadPreset || !cloudinaryUploadUrl) {
    return
  }

  const upload = async (files, transformationSettings = {}) => {
    const uploadPromises = Array.from(files).map((file) => {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("upload_preset", uploadPreset)

			const transformationString = Object.keys(transformationSettings)
        .map(key => `${key}_${transformationSettings[key]}`)
        .join(',')

      if (transformationString) {
        formData.append('transformation', transformationString)
      }

      return axios.post(cloudinaryUploadUrl, formData)
    })

    try {
      const responses = await Promise.all(uploadPromises)
      return responses.map((response) => response.data)
    } catch (err) {
      throw err
    }
  }

  const remove = async (publicId) => {
    const [apiKey, timestamp, signature] = ""
    try {
      const response = await axios.post(cloudinaryDeleteUrl, {
        public_id: publicId,
        api_key: apiKey,
        timestamp: timestamp,
        signature: signature,
      })
      return response.data
    } catch (err) {
      throw err
    }
  }

  return {
    upload,
    remove,
  }
}
