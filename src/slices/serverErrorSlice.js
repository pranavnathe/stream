import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    errorMessage : "",
}

const serverError = createSlice({
    name: "errorMessage",
    initialState,
    reducers: {
        addMessage: (state, action) => {
            state.errorMessage = action.payload.message;
        },
        clearMessage: (state) => {
            state.errorMessage = "";
        },
    }
})

export const { addMessage, clearMessage } = serverError.actions;

export default serverError.reducer;