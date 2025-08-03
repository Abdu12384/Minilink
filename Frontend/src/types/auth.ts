export interface ISignupPayload{
  name: string,
  email: string,
  password: string,
  phone?: string
}

export interface SingupResponse{
  success: boolean,
  message: string,
  user: any
}



export interface ILoginPayload{
  email: string,
  password: string
}
  