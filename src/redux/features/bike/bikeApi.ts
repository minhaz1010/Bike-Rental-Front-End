import { baseApi } from "@/redux/api/baseApi";

export const bikeApi = baseApi.injectEndpoints({
  endpoints:(builder) =>({
    getAllBikes:builder.query({
      query:()=>({
        url:"/bikes",
        method:"GET"
      }),
      providesTags:['Bikes']
    }),
    getSingleBike:builder.query({
      query:(id)=>({
        url:`/bikes/${id}`,
        method:"GET"
      }),
      providesTags:['Bikes']
    }),
    rentABike:builder.mutation({
      query:(bikeInfo)=>({
        url:"/rentals",
        method:"POST",
        body:bikeInfo
      }),
      invalidatesTags:['Bikes']
    }),
    getStatusOfMyRentalBike:builder.query({
      query:()=>({
        url:"/rentals",
        method:"GET"
      })
    }),
    deleteABike:builder.mutation({
      query:(userInfo)=>{
        const {id} = userInfo;
        console.log(id,'id from api');
        return {
          url:`/bikes/${id}`,
          method:"DELETE"
        }
      },
      invalidatesTags:['Bikes']
    }),
    updateABikeInformation:builder.mutation({
      query:(bikeInfo)=>{
        console.log('bikeInf',bikeInfo);
        console.log(bikeInfo.id);
        return {
          url:`/bikes/${bikeInfo.id}`,
          method:"PUT",
          body:bikeInfo
        }
      },
      invalidatesTags:['Bikes']
    })
  })
})


export const {useGetAllBikesQuery,useGetSingleBikeQuery,useRentABikeMutation,useGetStatusOfMyRentalBikeQuery,useDeleteABikeMutation,useUpdateABikeInformationMutation} = bikeApi;