import myApi from "@lib/axios"

import {
  getAllRestaurantsRequest,
  getAllPopularRestaurantsRequest,
} from "@modules/Restaurants/api"

export { getAllRestaurantsRequest, getAllPopularRestaurantsRequest }

export const searchRestaurants = async ({ searchParams, cancelToken }) => {
  const queryParams = searchParams
    ? {
        page: searchParams.pageIndex,
        limit: searchParams.limit,
        q: searchParams.q,
      }
    : {}
  const response = await myApi.get(`/api/restaurants`, {
    params: queryParams,
    cancelToken: cancelToken ? cancelToken : undefined,
  })
  return response.data
}

export const getStatisctics = async ({ cancelToken }) => {
  const response = await myApi.get(`/api/restaurants/statistics`, {
    cancelToken: cancelToken ? cancelToken : undefined,
  })
  return response.data
}
