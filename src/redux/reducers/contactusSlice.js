import { createSlice } from "@reduxjs/toolkit";
import { allMessageAction, contactusAction, deleteMessageAction } from "../actions/contactusAction";




export const getAllMessagesSlice = createSlice({
    name: "getAllMessages",
    initialState: { messages: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(allMessageAction.pending, (state) => { state.loading = true })
            .addCase(allMessageAction.fulfilled, (state, action) => {
                state.loading = false;
                state.messages = action.payload
            })
            .addCase(allMessageAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })


            // Delete message
            .addCase(deleteMessageAction.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteMessageAction.fulfilled, (state, action) => {
                state.loading = false;
                // Remove deleted brand from state
                state.messages = state.messages.filter((msg) => msg.contactusId !== action.payload);
            })
            .addCase(deleteMessageAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    }
})



export const messageSlice = createSlice({
    name: "message",
    initialState: { message: {}, loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(contactusAction.pending, (state) => { state.loading = true })
            .addCase(contactusAction.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload
            })
            .addCase(contactusAction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })

    }
})

export const contactusReducers={
    allMessages:getAllMessagesSlice.reducer,
    message:messageSlice.reducer
}