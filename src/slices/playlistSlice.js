import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    playlists : [],
}

const playlistSlice = createSlice({
    name: "playlist",
    initialState,
    reducers: {
        addPlaylist: (state, action) => {
            state.playlists = action.payload.playlistData;
        },
        deletePlaylist: (state) => {
            state.playlists = [];
        },
    }
})

export const { addPlaylist, deletePlaylist } = playlistSlice.actions;

export default playlistSlice.reducer;