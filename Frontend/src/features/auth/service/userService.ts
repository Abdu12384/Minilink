import { userAxiosInstance } from "@/api/user.axios"
import { isAxiosError } from "axios"



export const getUserProfile = async () => {
  try {
    const response = await userAxiosInstance.get('/user/profile')
    return response.data
  } catch (error) {
    console.error('Failed to fetch user profile', error)
    throw new Error(isAxiosError(error) ? error.response?.data.message : 'error while fetching user profile')
  }
}


export const userLogout = async () => {
  try {
    await userAxiosInstance.post('/user/logout')
  } catch (error) {
    console.error('Logout failed', error)
    throw new Error(isAxiosError(error) ? error.response?.data.message : 'error while logout')
  }
}



export const getAllUrls = async (params: { limit: number; page: number }) => {
  try {
    const response = await userAxiosInstance.get('/urls', { params })
    return response.data
  } catch (error) {
    console.error('Failed to fetch user urls', error)
    throw new Error(isAxiosError(error) ? error.response?.data.message : 'error while fetching user urls')
  }
}
  


export const shortenUrl = async (originalUrl: string) => {
  try {
    const response = await userAxiosInstance.post('/shorten', { originalUrl })
    return response.data
  } catch (error) {
    console.error('Failed to shorten url', error)
    throw new Error(isAxiosError(error) ? error.response?.data.message : 'error while shortening url')
  }
}


export const deleteUrl = async (id: string) => {
  try {
    const response = await userAxiosInstance.patch(`/url/${id}`)
    return response.data
  } catch (error) {
    console.error('Failed to delete url', error)
    throw new Error(isAxiosError(error) ? error.response?.data.message : 'error while deleting url')
  }
}
