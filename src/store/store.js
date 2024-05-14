import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../slices/authSlice";
import videoSlice from "../slices/videoSlice" 
import playlistSlice from "../slices/playlistSlice";
import serverErrorSlice from "../slices/serverErrorSlice";
import themeSlice from "../slices/themeSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        videos: videoSlice,
        playlist: playlistSlice,
        theme: themeSlice,
        serverError: serverErrorSlice
    }
});

export default store