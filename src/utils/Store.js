import { configureStore } from "@reduxjs/toolkit";
import userProfileSlice from "./userProfileSlice";
import SearchSlice from "./SearchSlice";


const userData = JSON.parse(localStorage.getItem("userData"));


const Store = configureStore({
    reducer: {
        userDetails:userProfileSlice,
        search: SearchSlice
    },
    preloadedState: {
        userDetails: userData || '' // Set preloadedState here
    }
})

export default Store;