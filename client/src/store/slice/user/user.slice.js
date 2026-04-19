import { createSlice } from "@reduxjs/toolkit"
import { loginUserThunk, registerUserThunk, logoutUserThunk, getUserProfileThunk, getOtherUsersThunk } from './user.thunk'

const initialState = {
    isAuthenticated: false,
    screenLoading: true,
    userProfile: null,
    selectedUser: JSON.parse(localStorage.getItem("SelectedUser")),
    otherUsers: null,
    buttonLoading: false,
}

export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers: {
        // Login: () => {
        //     console.log("Hello Login")
        // }
        setSelectedUser: (state, action)=>{
            localStorage.setItem("SelectedUser", JSON.stringify(action.payload));
            state.selectedUser = action.payload;
        }
    },
    extraReducers: (builder) => {
        // Login User
        builder.addCase(loginUserThunk.pending, (state, action)=>{
            state.buttonLoading = true;
        });
        builder.addCase(loginUserThunk.fulfilled, (state, action)=>{
            state.buttonLoading = false;
            state.userProfile = action.payload?.responseData?.user;
            state.isAuthenticated = true;
        });
        builder.addCase(loginUserThunk.rejected, (state, action)=>{
            state.buttonLoading = false;
        });

        // Register User
        builder.addCase(registerUserThunk.pending, (state, action)=>{
            state.buttonLoading = true;
        });
        builder.addCase(registerUserThunk.fulfilled, (state, action)=>{
            state.buttonLoading = false;
            state.userProfile = action.payload?.responseData?.user;
            state.isAuthenticated = true;

        });
        builder.addCase(registerUserThunk.rejected, (state, action)=>{
            state.buttonLoading = false;
        });

        // Logout User
        builder.addCase(logoutUserThunk.pending, (state, action)=>{
            state.buttonLoading = true;
        });
        builder.addCase(logoutUserThunk.fulfilled, (state, action)=>{
            state.buttonLoading = false;
            state.userProfile = null;
            state.otherUsers = null;
            state.selectedUser = null;
            localStorage.clear();
            state.isAuthenticated = false;

        });
        builder.addCase(logoutUserThunk.rejected, (state, action)=>{
            state.buttonLoading = false;
        });

        // Get Other Users
        builder.addCase(getOtherUsersThunk.pending, (state, action)=>{
            state.screenLoading = true;
        });
        builder.addCase(getOtherUsersThunk.fulfilled, (state, action)=>{
            state.screenLoading = false;
            state.otherUsers = action.payload?.responseData;

        });
        builder.addCase(getOtherUsersThunk.rejected, (state, action)=>{
            state.screenLoading = false;
        });

        // Get User Profile
        builder.addCase(getUserProfileThunk.pending, (state, action)=>{
            state.screenLoading = true;
        });
        builder.addCase(getUserProfileThunk.fulfilled, (state, action)=>{
            state.screenLoading = false;
            state.userProfile = action.payload?.responseData?.user;
            state.isAuthenticated = true;

        });
        builder.addCase(getUserProfileThunk.rejected, (state, action)=>{
            state.screenLoading = false;
        });

    },
});

export const { setSelectedUser } = userSlice.actions;
export default userSlice.reducer;