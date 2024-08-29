import { baseApi } from "@/redux/api/baseApi"

export const authApi = baseApi.injectEndpoints({
  endpoints:(builder) =>({
    userSignUpApi:builder.mutation({
      query:(userInfo) => ({
        url:"/auth/signup",
        method:"POST",
        body:userInfo
      })
    }),
    userLogInApi: builder.mutation({
      query:(userInfo) =>({
        url:"/auth/login",
        method:"POST",
        body:userInfo
      })
    })
  })
})

export const  { useUserSignUpApiMutation,useUserLogInApiMutation} =  authApi
 