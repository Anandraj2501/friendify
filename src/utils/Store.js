import { configureStore } from "@reduxjs/toolkit";
import TokenSlice from "./TokenSlice";

const persistedToken = localStorage.getItem('token');
const preloadedState = {
    auth: persistedToken || '' // Initialize with token from localStorage, if available
};
const Store = configureStore({
    reducer: {
        auth: TokenSlice
    },
    preloadedState
})

export default Store;