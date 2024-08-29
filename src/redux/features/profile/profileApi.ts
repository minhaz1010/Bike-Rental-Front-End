import { baseApi } from "@/redux/api/baseApi";

export const profileApi = baseApi.injectEndpoints({
  endpoints:(builder) =>({
    getMyProfile:builder.query({
      query:()=>({
        url:"/users/me",
        method:"GET",
      }),
      providesTags:['Profile']
    }),
    updateMyProfile:builder.mutation({
      query:(userInfo)=>{
        return{
          url:"/users/me",
          method:"PUT",
          body:userInfo
        }
      },
      invalidatesTags:['Profile']
    }),
    changePassword:builder.mutation({
      query:(secrets) =>({
        url:"/auth/change-password",
        method:"PUT",
        body:secrets
      })
    }),
    getAllUsers:builder.query({
      query:()=>({
        url:"/users/all-users",
        method:"GET"
      }),
      providesTags:['Profile']
    }),
    updateUserRole:builder.mutation({
      query:(userInfo) =>{
        return {
          url:"/users/update-user-role",
          method:"PATCH",
          body:userInfo
        }
      },
      invalidatesTags:['Profile']
    }),
    deleteAUser:builder.mutation({
      query:(id)=>{
        console.log(id,'id from api');
        return {
          url:"/users/delete-a-user",
          method:"DELETE",
          body:id
        }
      },
      invalidatesTags:['Profile']
    })
    
  })
})

export const  { useGetMyProfileQuery,useUpdateMyProfileMutation,useChangePasswordMutation,useGetAllUsersQuery,useUpdateUserRoleMutation,useDeleteAUserMutation} =  profileApi
 