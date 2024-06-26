import {createSlice} from "@reduxjs/toolkit";

const SearchSlice = createSlice({
    name:"search",
    initialState:{},
    reducers:{
        cacheSearch:(state,action)=>{
            state=Object.assign(state,action.payload);
        }
    }
})

export const {cacheSearch} = SearchSlice.actions;
export default SearchSlice.reducer;