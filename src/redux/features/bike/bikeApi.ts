import { BikeFormData } from "@/pages/Dashboard/AddBike/AddBike";
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
        return {
          url:`/bikes/${id}`,
          method:"DELETE"
        }
      },
      invalidatesTags:['Bikes']
    }),
    updateABikeInformation:builder.mutation({
      query:(bikeInfo)=>{
        return {
          url:`/bikes/${bikeInfo.id}`,
          method:"PUT",
          body:bikeInfo
        }
      },
      invalidatesTags:['Bikes']
    }),
    addABike:builder.mutation({
      query:(bikeInfo:BikeFormData)=>{
        const updatedBikeInfo = {
          name:bikeInfo.name,
          description:bikeInfo.description,
          pricePerHour:bikeInfo.pricePerHour,
          imageUrl:bikeInfo.imageUrl,
          isAvailable:bikeInfo.isAvailable,
          cc:bikeInfo.cc,
          year:bikeInfo.year,
          model:bikeInfo.model,
          brand:bikeInfo.brand
        }
        return {
          url:`/bikes`,
          method:"POST",
          body:updatedBikeInfo
        }
      },
      invalidatesTags:['Bikes']
     
    })
  })
})


export const {useGetAllBikesQuery,useGetSingleBikeQuery,useRentABikeMutation,useGetStatusOfMyRentalBikeQuery,useDeleteABikeMutation,useUpdateABikeInformationMutation,useAddABikeMutation} = bikeApi;