import myApi from "@lib/axios"
import {
  deleteByAdminRestaurantRequest,
  getAllCities,
  getTimes,
} from "@modules/Management/api"

import { getAllServicesRequest } from "@modules/Management/api"

export {
  deleteByAdminRestaurantRequest,
  getAllCities,
  getTimes,
  getAllServicesRequest,
}

export const getAllRestaurantsRequest = async ({ params, cancelToken }) => {
  const queryParams = params
    ? {
        page: params.pageIndex,
        limit: params.limit,
      }
    : {}
  const response = await myApi.get(`/api/restaurants`, {
    params: queryParams,
    cancelToken: cancelToken ? cancelToken : undefined,
  })
  return response.data
}

export const getAllPopularRestaurantsRequest = async () => {
  const response = await myApi.get(`/api/restaurants/popular`)
  return response.data
}

export const getByAdminRestaurantRequest = async ({
  restaurantId,
  cancelToken,
}) => {
  const response = await myApi.get(`/api/admin/restaurants/${restaurantId}`, {
    cancelToken: cancelToken ? cancelToken.token : undefined,
  })
  return response.data
}

export const getRestaurantRequest = async ({ restaurantId, cancelToken }) => {
  const response = await myApi.get(`/api/restaurants/${restaurantId}`, {
    cancelToken: cancelToken ? cancelToken.token : undefined,
  })
  return response.data
}

export const updateByAdminRestaurantRequest = async (restaurantId, body) => {
  const response = await myApi.put(
    `/api/admin/restaurants/${restaurantId}`,
    body
  )
  return response.data
}

export const updateByOwnerRestaurantRequest = async (restaurantId, body) => {
  const response = await myApi.put(`/api/restaurants/${restaurantId}`, body)
  return response.data
}

export const getRestaurantReviewsRequest = async ({ restaurantId, cancelToken }) => {
  const response = await myApi.get(`/api/restaurants/${restaurantId}/reviews`, {
    cancelToken: cancelToken ? cancelToken : undefined,
  })
  return response.data
}
