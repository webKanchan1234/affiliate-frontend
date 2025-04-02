import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  ALL_USERS,
  CHANGE_PASSWORD,
  DELETE_USER,
  ERROR_FETCHING_ALL_USERS,
  ERROR_FETCHING_LOGIN_USER,
  ERROR_FETCHING_LOGOUT_USER,
  ERROR_FETCHING_USER_PROFILE,
  LOAD_USER,
  LOGIN_USER,
  LOGOUT_USER,
  UPDATE_USER_PROFILE,
  UPDATE_USER_ROLE,
  USER_PROFILE,
} from "../constants/userConstant";
import { allUsers, changePassword, deleteUser, loginUser, logoutUser, updateUserProfile, updateUserRole, userProfile } from "../../api/userApi";
import { handleApiError } from "../../utils/handleApiError";





// ✅ Login and store user info
export const loginUserAction = createAsyncThunk(LOGIN_USER, async (data, { rejectWithValue }) => {
  try {
    const { token, user } = await loginUser(data);
    return { token, user };
  } catch (error) {
    // console.error("Login Error:", error.response?.data || error.message);
    return rejectWithValue(error.response?.data || ERROR_FETCHING_LOGIN_USER);
  }
});

// ✅ Fetch user profile (Uses local storage if available)
export const userProfileAction = createAsyncThunk(USER_PROFILE, async (_, { rejectWithValue }) => {
  try {
    return await userProfile();
  } catch (error) {
    return rejectWithValue(error.response?.data || ERROR_FETCHING_USER_PROFILE);
  }
});

// ✅ Load user only if necessary
export const loadUserAction = createAsyncThunk(LOAD_USER, async (_, { rejectWithValue }) => {
  try {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : await userProfile();
  } catch (error) {
    return rejectWithValue(error.response?.data || LOAD_USER);
  }
});


// ✅ all users 
export const allUsersAction = createAsyncThunk(ALL_USERS, async (_, { rejectWithValue }) => {
  try {
    return await allUsers();
  } catch (error) {
    return rejectWithValue(error.response?.data || ERROR_FETCHING_ALL_USERS);
  }
});


// ✅ Logout User Action
export const logoutUserAction = createAsyncThunk(
  LOGOUT_USER,
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await logoutUser(); // API call to logout
    } catch (error) {
      return rejectWithValue(error.response?.data || ERROR_FETCHING_LOGOUT_USER);
    } finally {
      localStorage.removeItem("user"); 
      localStorage.removeItem("token");

      // ✅ Dispatch logout reducer to clear Redux state
      // dispatch(logout());
    }
  }
);


export const deleteUserAction = createAsyncThunk(DELETE_USER, async (id, { rejectWithValue }) => {
  try {
    return await deleteUser(id);
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});


export const updateUserProfileAction = createAsyncThunk(UPDATE_USER_PROFILE, async (data, { rejectWithValue }) => {
  try {
    const response = await updateUserProfile(data);
    // console.log(response)
    localStorage.setItem("user", JSON.stringify(response));


      // ✅ Dispatch loadUserAction to re-fetch user profile
      // loadUserAction()
    return response;
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});

export const updateUserRoleAction = createAsyncThunk(UPDATE_USER_ROLE, async ({id,data}, { rejectWithValue }) => {
  try {
    return await updateUserRole(id,data);
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});



export const changePasswordAction = createAsyncThunk(CHANGE_PASSWORD, async (data, { rejectWithValue }) => {
  try {
    return await changePassword(data);
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});