import { createSlice } from "@reduxjs/toolkit";

type TInitialState  = {
  token:null | string
}

const initialState:TInitialState = {
  token:null 
}



export const authSlice = createSlice({
  name:"auth",
  initialState,
  reducers:{
    logInAUser:(state,action) =>{
     const {accessToken} = action.payload;
      state.token = accessToken
    },
    logOutAUser:(state) =>{
      state.token = null
    }
  }

})

export const {logInAUser,logOutAUser} = authSlice.actions

export default authSlice.reducer