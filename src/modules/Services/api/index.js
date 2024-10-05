import myApi from "@lib/axios"

export const getAllServicesRequest = async ({ cancelToken }) => {
  const response = await myApi.get(`/api/admin/services`, {
    cancelToken: cancelToken ? cancelToken : undefined,
  })
  return response.data
}

export const createServiceRequest = async ({ body, cancelToken }) => {
  const response = await myApi.post(`/api/admin/services`, body, {
    cancelToken: cancelToken ? cancelToken : undefined,
  })
  return response.data
}

export const updateServiceRequest = async ({
  serviceId,
  body,
  cancelToken,
}) => {
  const response = await myApi.put(`/api/admin/services/${serviceId}`, body, {
    cancelToken: cancelToken ? cancelToken : undefined,
  })
  return response.data
}

export const deleteServiceRequest = async ({ serviceId, cancelToken }) => {
  const response = await myApi.delete(`/api/admin/services/${serviceId}`, {
    cancelToken: cancelToken ? cancelToken : undefined,
  })
  return response.data
}
