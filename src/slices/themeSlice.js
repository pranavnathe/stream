import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    themeMode : "",
}

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        updateThemeMode: (state, action) => {
            state.themeMode = action.payload.theme;
        },
    }
})

export const { updateThemeMode } = themeSlice.actions;

export default themeSlice.reducer;