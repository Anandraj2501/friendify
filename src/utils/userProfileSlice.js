import { createSlice } from "@reduxjs/toolkit";

const userProfileSlice = createSlice({
    name:"userDetails",
    initialState:{
        token:"",
        userId:"",
        profilePic:"",
        userName:"",
    },
    reducers:{
        addData:(state,action)=>{
            console.log(action.payload);
            const { token, userId, profilePic, userName } = action.payload;
            // Update state immutably
            return {
                ...state,
                token: token,
                userId: userId,
                profilePic: profilePic,
                userName: userName,
            };
        }
    }
})

export const {addData}= userProfileSlice.actions;
export default userProfileSlice.reducer;