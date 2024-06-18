import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   status: false,
   token: null,
};



const userSlice = createSlice({


   name: "user",
   initialState,
   reducers: {

      signin: (state, action) => {
         state.token = action.payload;
         state.status = true;
      },

      signout: (state) => {
         state.token = null;
         state.status = false;
      },

   },

})


export const { signin, signout } = userSlice.actions;
export default userSlice.reducer;