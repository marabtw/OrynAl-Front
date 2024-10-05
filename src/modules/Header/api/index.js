import myApi from "@lib/axios"

export const searchByOwnerRestaurants = async ({
  searchQuery,
  cancelToken,
}) => {
  const response = await myApi.get(`/api/restaurants?q=${searchQuery}`, {
    cancelToken: cancelToken ? cancelToken.token : undefined,
  })
  return response.data
}
