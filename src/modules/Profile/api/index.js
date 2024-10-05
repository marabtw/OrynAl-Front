import myApi from "@lib/axios"

export const getProfileRequest = async () => {
  const response = await myApi.get("/api/profile")
  return response.data
}

export const updateProfileRequest = async (body) => {
  const response = await myApi.put("/api/profile", body)
  return response
}

export const deleteProfileRequest = async () => {
  const response = await myApi.delete("/api/profile")
  return response.data
}
