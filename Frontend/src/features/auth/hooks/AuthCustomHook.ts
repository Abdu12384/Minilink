import { useMutation } from '@tanstack/react-query';
import { userSignup,userLogin } from '../service/authService';
import type { ILoginPayload, ISignupPayload } from '@/types/auth';



export const useSignupMutation = () =>{
  return useMutation({
    mutationFn: (values: ISignupPayload) => userSignup(values),
  })
}


export const useLoginMutation = () =>{
  return useMutation({
    mutationFn: (values: ILoginPayload) => userLogin(values),
  })
}

