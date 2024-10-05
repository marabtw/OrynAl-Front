import { useEffect, useState } from "react"

import {
  getProfileRequest,
  updateProfileRequest,
  deleteProfileRequest,
} from "../api"
import { useToast, useLoading } from "@hooks"
import { isArraysEqualByIdWithSet } from "@utils/index"

import UserDetails from "./components/UserDetails"
import UserUpdateForm from "./components/UserUpdateForm"

const MyProfile = () => {
  const showNotification = useToast()
  const setLoading = useLoading()
  const [userData, setUserdata] = useState({})

  useEffect(() => {
    setLoading(true)
    getProfileRequest()
      .then(({ data }) => {
        setUserdata({ data })
      })
      .catch((error) => {
        showNotification(error.toString(), "error")
      })
      .finally(() => setLoading(false))
  }, [])

  const updateUserData = (data) => {
    setLoading(true)
    updateProfileRequest(data)
      .then(() => {
        showNotification("Успешно update", "success")
      })
      .catch((error) => {
        showNotification(error.toString(), "error")
      })
      .finally(() => setLoading(false))
  }

  const deleteUser = () => {
    // deleteProfileRequest()
    //   .then((res) => {
    //     console.log(res)
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })
  }

  return (
    <div className="flex justify-between gap-[30px] px-[40px] py-[60px] bg-white rounded-[10px] max-md:flex-col max-lg:py-[30px] max-lg:px-[10px]">
      <UserDetails currentUserData={userData} deleteUser={deleteUser} />
      <UserUpdateForm
        currentUserData={userData}
        updateUserData={updateUserData}
      />
    </div>
  )
}

export default MyProfile
