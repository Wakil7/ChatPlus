// import { createSlice } from "@reduxjs/toolkit"
// import { sendMessageThunk, getMessagesThunk } from './message.thunk'

// const initialState = {
//     buttonLoading: false,
//     screenLoading: false,
//     messages: null,
// }

// export const messageSlice = createSlice({
//     name:"message",
//     initialState,
//     reducers: {
//         pushMessage: (state, action)=>{
//             const oldMessages = state.messages??[];
//             state.messages = [...oldMessages, action.payload];
//         }
//     },
//     extraReducers: (builder) => {
//         // Send Message
//         builder.addCase(sendMessageThunk.pending, (state, action)=>{
//             state.buttonLoading = true;
//         });
//         builder.addCase(sendMessageThunk.fulfilled, (state, action)=>{
//             state.messages.push(action.payload?.responseData);
//             state.buttonLoading = false;
//         });
//         builder.addCase(sendMessageThunk.rejected, (state, action)=>{
//             state.buttonLoading = false;
//         });

//         // Get Messages
//         builder.addCase(getMessagesThunk.pending, (state, action)=>{
//             state.screenLoading = true;
//         });
//         builder.addCase(getMessagesThunk.fulfilled, (state, action)=>{
//             state.messages = action.payload?.responseData?.messages;
//             state.screenLoading = false;
//         });
//         builder.addCase(getMessagesThunk.rejected, (state, action)=>{
//             state.screenLoading = false;
//         });

        

//     },
// });

// export const { pushMessage } = messageSlice.actions;
// export default messageSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name: "message",

    initialState: {
        messages: [], // ✅ FIX (was null)
    },

    reducers: {

        setMessages: (state, action) => {
            state.messages =
                action.payload || [];
        },

        pushMessage: (state, action) => {
            state.messages.push(action.payload);
        },

        clearMessages: (state) => {
            state.messages = [];
        },

    },

});

export const {
    setMessages,
    pushMessage,
    clearMessages,
} = messageSlice.actions;

export default messageSlice.reducer;