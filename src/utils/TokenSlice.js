import { createSlice } from "@reduxjs/toolkit";

const TokenSlice = createSlice({
    name:"auth",
    initialState:"",
    reducers:{
        addToken:(state,action)=>{
            console.log(action.payload.token);
            return action.payload;
        }
    }
})

export const {addToken} = TokenSlice.actions;
export default TokenSlice.reducer;