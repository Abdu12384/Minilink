import authAxiosInstance from "@/api/auth.axios"
import type { ILoginPayload, ISignupPayload,SingupResponse } from "@/types/auth"
import { isAxiosError } from "axios"






export const refreshUserSession = async (): Promise<SingupResponse> => {
  const response = await authAxiosInstance.get<SingupResponse>(
    "/refresh"
  );
  return response.data;
};



export const userSignup = async (values: ISignupPayload): Promise<SingupResponse> =>{
  try {
    const response = await authAxiosInstance.post('/register',values)
    return response.data
  } catch (error) {
    console.error('Signup failed',error)
    throw new Error(isAxiosError(error) ? error.response?.data.message : 'error while signup')	
  }
}




export const userLogin = async (values: ILoginPayload): Promise<SingupResponse> =>{
  try {
    const response = await authAxiosInstance.post('/login',values)
    return response.data
  } catch (error) {
    console.error('Login failed',error)
    throw new Error(isAxiosError(error) ? error.response?.data.message : 'error while login')	
  }
}





