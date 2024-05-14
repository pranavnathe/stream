import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    videos : [],
    likedVideos : []
}

const videoSlice = createSlice({
    name: "videos",
    initialState,
    reducers: {
        addVids: (state, action) => {
            state.videos = action.payload.videosData;
        },
        deleteVids: (state) => {
            state.videos = [];
        },
        addLikedVideos: (state, action) => {
            state.likedVideos = action.payload.videosData;
        },
        deleteLikedVideos: (state, action) => {
            state.likedVideos = [];
        }
    }
})

export const { addVids, deleteVids, addLikedVideos, deleteLikedVideos } = videoSlice.actions;

export default videoSlice.reducer;