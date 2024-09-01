import { baseApi } from "@/redux/api/baseApi";
import { TBikeFormData } from "@/types/schema.type";

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
    fullPayment:builder.mutation({
      query:(id)=>{
        console.log(id,'id from api');
        return {
          url:`/rentals/full-payment/${id}`,
          method:"POST"
        }
      },
      invalidatesTags:['Bikes']
    }),
    getStatusOfMyRentalBike:builder.query({
      query:()=>({
        url:"/rentals",
        method:"GET"
      })
    }),
    getAllRentalDetails:builder.query({
      query:()=>({
        url:"/rentals/all-rentals",
        method:"GET"
      }),
      providesTags:['Rentals'],

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
    calculateTotalCost:builder.mutation({
      query:(bookingInfo)=>{
    console.log('dhukse ekhane',bookingInfo);
        const {id,returnTime} = bookingInfo;
        console.log('id',id);
        console.log('return time',returnTime);
        return {
          url:`/rentals/calculate-total-cost/${id}`,
          method:"PATCH",
          body:{returnTime}
        }
      },
      invalidatesTags:['Rentals']
    }),
  
    addABike:builder.mutation({
      query:(bikeInfo:TBikeFormData)=>{
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
      invalidatesTags:['Bikes'],
      
     
    })
  })
})


export const {useGetAllBikesQuery,useGetSingleBikeQuery,useRentABikeMutation,useGetStatusOfMyRentalBikeQuery,useDeleteABikeMutation,useUpdateABikeInformationMutation,useAddABikeMutation,useGetAllRentalDetailsQuery,useCalculateTotalCostMutation,useFullPaymentMutation} = bikeApi;