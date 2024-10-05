import myApi from "@lib/axios"

export const getRestaurantMenuRequest = async ({
  restaurantId,
  params,
  cancelToken,
}) => {
  const queryParams = params
    ? {
        page: params.pageIndex,
        limit: params.limit,
        q: params.q,
      }
    : {}
  const response = await myApi.get(`/api/restaurants/${restaurantId}/menu`, {
    params: queryParams,
    cancelToken: cancelToken ? cancelToken.token : undefined,
  })
  return response.data
}
export const getByOwnerMenuItemRequest = async ({
  restaurantId,
  foodId,
  cancelToken,
}) => {
  const response = await myApi.get(
    `/api/restaurants/${restaurantId}/menu/${foodId}`,
    {
      cancelToken: cancelToken ? cancelToken : undefined,
    }
  )
  return response.data
}
export const getByOwnerMenuCategoriesRequest = async ({
  restaurantId,
  cancelToken,
}) => {
  const response = await myApi.get(
    `/api/restaurants/${restaurantId}/menu/categories`,
    {
      cancelToken: cancelToken ? cancelToken.token : undefined,
    }
  )
  return response.data
}
export const createByOwnerMenuItemRequest = async ({ restaurantId, body }) => {
  const response = await myApi.post(
    `/api/restaurants/${restaurantId}/menu`,
    body
  )
  return response.data
}
export const updateByOwnerMenuItemRequest = async ({
  restaurantId,
  foodId,
  body,
}) => {
  const response = await myApi.put(
    `/api/restaurants/${restaurantId}/menu/${foodId}`,
    body
  )
  return response.data
}

export const deleteByOwnerMenuItemRequest = async ({
  restaurantId,
  foodId,
}) => {
  const response = await myApi.delete(
    `/api/restaurants/${restaurantId}/menu/${foodId}`
  )
  return response.data
}

export const getMenuTypes = () => {
  return [
    { label: "Первый", value: "Первый" },
    { label: "Второй", value: "Второй" },
    { label: "Десерт", value: "Десерт" },
    { label: "Фаст-фуд", value: "Фаст-фуд" },
  ]
}
