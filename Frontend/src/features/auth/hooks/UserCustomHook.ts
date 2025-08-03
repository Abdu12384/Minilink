import { useMutation } from "@tanstack/react-query"
import { getUserProfile, getAllUrls, userLogout, shortenUrl, deleteUrl } from "../service/userService"




export const useGetUserProfileMutation = () =>{
  return useMutation({
    mutationFn: () => getUserProfile(),
  })
}



export const useLogoutMutation = () =>{
  return useMutation({
    mutationFn: () => userLogout(),
  })
}


export const useGetAllUrlsMutation = () => {
  return useMutation({
    mutationFn: (params: { limit: number; page: number }) => getAllUrls(params),
  })
}


export const useShortenUrlMutation = () => {
  return useMutation({
    mutationFn: (url: string) => shortenUrl(url),
  })
}


export const useDeleteUrlMutation = () => {
  return useMutation({
    mutationFn: (id: string) => deleteUrl(id),
  })
}



