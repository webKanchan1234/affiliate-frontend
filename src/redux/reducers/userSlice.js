import { createSlice } from "@reduxjs/toolkit";
import { allUsersAction, changePasswordAction, deleteUserAction, loadUserAction, loginUserAction, logoutUserAction, updateUserProfileAction, updateUserRoleAction, userProfileAction } from "../actions/userAction";
import { ERROR_FETCHING_ALL_USERS, ERROR_FETCHING_LOGIN_USER, ERROR_FETCHING_UPDATE_USER_PROFILE, ERROR_FETCHING_UPDATE_USER_ROLE, ERROR_FETCHING_USER_PROFILE, LOAD_USER } from "../constants/userConstant";
import { logoutUser } from "../../api/userApi";


export const signupUserReducer=createSlice({
  name:"signup",
  initialState:{user:null,loading:false,error:null},
  reducers:{},
  extraReducers:(builder)=>{
      builder
      .addCase(updateUserRoleAction.pending, (state) => { state.loading = true; })
      .addCase(updateUserRoleAction.fulfilled,(state,action)=>{
          state.loading=false;
          state.user=action.payload
      })
      .addCase(updateUserRoleAction.rejected,(state,action)=>{
          state.loading=false;
          state.error=action.payload || ERROR_FETCHING_UPDATE_USER_ROLE
      })
  }
})

export const loginUserReducer=createSlice({
    name:"login",
    initialState:{user:null,loading:false,error:null},
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(loginUserAction.pending, (state) => { state.loading = true; })
        .addCase(loginUserAction.fulfilled,(state,action)=>{
            state.loading=false;
            state.user=action.payload
        })
        .addCase(loginUserAction.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload || ERROR_FETCHING_LOGIN_USER
        })
    }
})

export const userProfileReducer=createSlice({
    name:"userProfile",
    initialState:{user:null,loading:false,error:null},
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(userProfileAction.pending, (state) => { state.loading = true; })
        .addCase(userProfileAction.fulfilled,(state,action)=>{
            state.loading=false;
            state.user=action.payload
        })
        .addCase(userProfileAction.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload || ERROR_FETCHING_USER_PROFILE
        })

        //update profile
        .addCase(updateUserProfileAction.pending, (state) => { state.loading = true; })
        .addCase(updateUserProfileAction.fulfilled,(state,action)=>{
            state.loading=false;
            state.user=action.payload
        })
        .addCase(updateUserProfileAction.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload || ERROR_FETCHING_UPDATE_USER_PROFILE
        })
    }
})
//  userProfileAPIReducer
const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isAuthenticated: !!localStorage.getItem("user"),
    loading: false,
  };
  
  export const loadUserReducer = createSlice({
    name: "loadUser",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(loadUserAction.pending, (state) => {
          state.loading = true;
        })
        .addCase(loadUserAction.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload;
          state.isAuthenticated = !!action.payload;
          localStorage.setItem("user", JSON.stringify(action.payload)); // ✅ Persist user
        })
        .addCase(loadUserAction.rejected, (state) => {
          state.loading = false;
          state.user = null;
          state.isAuthenticated = false;
          localStorage.removeItem("user"); // ✅ Clear on failure
        });
    },
  });
  
  
export const logoutReducer = createSlice({
    name: "logout",
    initialState:{
        success: false,
        loading: false,
        error: null,
      },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(logoutUserAction.pending, (state) => {
          state.loading = true;
        })
        .addCase(logoutUserAction.fulfilled, (state) => {
          state.loading = false;
          state.success = true;
        })
        .addCase(logoutUserAction.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })


        //delete user
        .addCase(deleteUserAction.pending, (state) => {
            state.loading = true;
          })
          .addCase(deleteUserAction.fulfilled, (state) => {
            state.loading = false;
            state.success = true;
          })
          .addCase(deleteUserAction.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          }
        )


        //update password user
        .addCase(changePasswordAction.pending, (state) => {
          state.loading = true;
        })
        .addCase(changePasswordAction.fulfilled, (state) => {
          state.loading = false;
          state.success = true;
        })
        .addCase(changePasswordAction.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
    },
  });


// fetching all users
export const allUsersReducer=createSlice({
    name:"allUsers",
    initialState:{users:[],loading:false,error:null},
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(allUsersAction.pending,(state)=>{state.loading=true})
        .addCase(allUsersAction.fulfilled,(state,action)=>{
            state.loading=false;
            state.users=action.payload
        })
        .addCase(allUsersAction.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload || ERROR_FETCHING_ALL_USERS
        })
    }
})





export const userReducers={
    loginUser:loginUserReducer.reducer,
    userProfile:userProfileReducer.reducer,
    loadUser:loadUserReducer.reducer,
    allUsers:allUsersReducer.reducer,
    logoutUser:logoutReducer.reducer
}