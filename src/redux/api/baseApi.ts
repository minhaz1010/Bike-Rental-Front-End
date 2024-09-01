import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/api/",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token

    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }

    return headers
  },
}
)

export const baseApi = createApi({
  reducerPath:"api",
  baseQuery,
  tagTypes:['Profile','Bikes','Rentals'],
  endpoints:() =>({})
})