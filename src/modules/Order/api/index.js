import myApi from "@lib/axios"

import {
  getRestaurantRequest,
  getRestaurantReviewsRequest,
} from "@modules/Restaurants/api"
import {
  getAllTablesRequest,
  getTableCategoriesRequest,
} from "@modules/Tables/api"
import {
  getRestaurantMenuRequest,
  getByOwnerMenuCategoriesRequest,
} from "@modules/Menu/api"

export {
  getRestaurantRequest,
  getAllTablesRequest,
  getRestaurantMenuRequest,
  getByOwnerMenuCategoriesRequest,
  getTableCategoriesRequest,
  getRestaurantReviewsRequest,
}

export const getByOwnerAllOrders = async ({
  restaurantId,
  params,
  cancelToken,
}) => {
  const queryParams = params
    ? {
        page: params.pageIndex,
        limit: params.limit,
      }
    : {}
  const response = await myApi.get(`/api/restaurants/${restaurantId}/orders`, {
    params: queryParams,
    cancelToken: cancelToken ? cancelToken : undefined,
  })
  return response.data
}

export const getByUserAllOrders = async ({ params, cancelToken }) => {
  const queryParams = params
    ? {
        page: params.pageIndex,
        limit: params.limit,
      }
    : {}
  const response = await myApi.get("/api/orders", {
    params: queryParams,
    cancelToken: cancelToken ? cancelToken : undefined,
  })
  return response.data
}

export const getOrder = async ({ orderId, cancelToken }) => {
  const response = await myApi.get(`/api/orders/${orderId}`, {
    cancelToken: cancelToken ? cancelToken : undefined,
  })
  return response.data
}

export const getByOwnerOrder = async ({
  restaurantId,
  orderId,
  cancelToken,
}) => {
  const response = await myApi.get(
    `/api/restaurants/${restaurantId}/orders/${orderId}`,
    {
      cancelToken: cancelToken ? cancelToken : undefined,
    }
  )
  return response.data
}

export const createByUserOrder = async (body) => {
  const response = await myApi.post(`/api/orders/create`, body)
  return response.data
}

export const updateByOwnerOrder = async ({ restaurantId, orderId, body }) => {
  const response = await myApi.put(
    `/api/restaurants/${restaurantId}/orders/${orderId}`,
    body
  )
  return response.data
}

export const updateOrder = async ({ orderId, body }) => {
  const response = await myApi.put(`/api/orders/${orderId}`, body)
  return response.data
}

export const deleteOrder = async (orderId) => {
  const response = await myApi.delete(`/api/orders/${orderId}`)
  return response.data
}

export const createReviewRequest = async ({ restaurantId, body }) => {
  const response = await myApi.post(
    `/api/restaurants/${restaurantId}/reviews`,
    body
  )
  return response.data
}
