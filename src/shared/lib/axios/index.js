import axios from "axios"
import Cookies from "js-cookie"

export { axios }

const myApi = axios.create({
  baseURL: "http://localhost:5000/",
})

myApi.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken")
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default myApi
