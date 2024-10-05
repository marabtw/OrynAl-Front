import myApi from "@lib/axios"
// import { v4 as uuidv4 } from "uuid"

import { getAllServicesRequest } from "@modules/Services/api/"

export { getAllServicesRequest }

export const getByAdminAllOwnersRequest = async ({ params, cancelToken }) => {
  const queryParams = params
    ? {
        page: params.pageIndex,
        limit: params.limit,
      }
    : {}
  const response = await myApi.get(`/api/admin/owners`, {
    params: queryParams,
    cancelToken: cancelToken ? cancelToken.token : undefined,
  })
  return response.data
}

export const createByAdminOwnerRequest = async (body) => {
  const response = await myApi.post("/api/admin/owners", body)
  return response.data
}

export const deleteByAdminOwnerRequest = async (ownerId) => {
  if (!ownerId) {
    throw new Error("Owner not found")
  }
  const response = await myApi.delete(`/api/admin/owners/${ownerId}`)
  return response.data
}

export const getByAdminAllRestaurantsRequest = async ({
  params,
  cancelToken,
}) => {
  const queryParams = params
    ? {
        page: params.pageIndex,
        limit: params.limit,
      }
    : {}
  const response = await myApi.get("/api/admin/restaurants", {
    params: queryParams,
    cancelToken: cancelToken ? cancelToken.token : undefined,
  })
  return response.data
}

export const сreateByAdminRestaurantRequest = async (body) => {
  const response = await myApi.post("/api/admin/restaurants", body)
  return response.data
}

export const deleteByAdminRestaurantRequest = async (restaurantId) => {
  const response = await myApi.delete(`/api/admin/restaurants/${restaurantId}`)
  return response.data
}

export const getByAdminAllClientsRequest = async ({ params, cancelToken }) => {
  const queryParams = params
    ? {
        page: params.pageIndex,
        limit: params.limit,
      }
    : {}
  const response = await myApi.get("/api/admin/clients", {
    params: queryParams,
    cancelToken: cancelToken ? cancelToken.token : undefined,
  })
  return response.data
}

export const deleteByAdminClientRequest = async (clientId) => {
  const response = await myApi.delete(`/api/admin/clients/${clientId}`)
  return response.data
}

export const getAllCities = () => {
  return [
    {
      label: "Astana",
      value: "Astana",
    },
    {
      label: "Almaty",
      value: "Almaty",
    },
    {
      label: "Aktau",
      value: "Aktau",
    },
  ]
}

export const getTimes = () => {
  const currentDate = new Date()

  currentDate.setMinutes(0)

  const options = []
  for (let hour = 0; hour < 24; hour++) {
    for (let minute of [0, 30]) {
      const dateCopy = new Date(currentDate.getTime())
      dateCopy.setHours(hour)
      dateCopy.setMinutes(minute)
      const isoString = dateCopy.toISOString()
      options.push({
        value: isoString,
        label: `${String(hour).padStart(2, "0")}:${String(minute).padStart(
          2,
          "0"
        )}`,
      })
    }
  }
  return options
}
