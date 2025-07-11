import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import {  ADMIN_USERS_BASE_URL} from "../../../../config";
import Cookies from "js-cookie";

// ✅ Fetch all users
export const fetchAllUsers = createAsyncThunk(
  "users/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${ADMIN_USERS_BASE_URL}/get-users`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      });
      // console.log(response)
      return response.data?.data || [];
    } catch (err) {
      // toast.error("Failed to fetch users");
      console.log(err)
      return rejectWithValue(err?.message|| "Something went wrong");
    }
  }
);

// ✅ Update user by ID
export const updateUser = createAsyncThunk(
  "users/update",
  async (userData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name || "");
      formData.append("email", userData.email || "");
      // formData.append("role", userData.role || "");
      formData.append("status", userData.is_active);
        if (userData.profile_image instanceof File) {
        formData.append("profile_image", userData.profile_image);
      }

      const response = await axios.patch(
        `${ADMIN_USERS_BASE_URL}/update-user/${userData.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      );
console.log(response.data.message)
      return response.data?.message;
    } catch (err) {
      // console.log(err.response.data.detail)

      // console.log(err.message)
      // toast.error("Failed to update user");
      return rejectWithValue(err.response.data.detail || "Something went wrong");
    }
  }
);


// ✅ Slice
const usersSlice = createSlice({
  name: "users",
  initialState: {
  users: [],
  loadingUsers: false,
  updatingUser: false,
  error: null,
}
,
  reducers: {},
  extraReducers: (builder) => {
    builder
     // Fetch users
.addCase(fetchAllUsers.pending, (state) => {
  state.loadingUsers = true;
  state.error = null;
})
.addCase(fetchAllUsers.fulfilled, (state, action) => {
  state.loadingUsers = false;
  state.users = action.payload;
})
.addCase(fetchAllUsers.rejected, (state, action) => {
  state.loadingUsers = false;
  state.error = action.payload;
})

// Update user
.addCase(updateUser.pending, (state) => {
  state.updatingUser = true;
  state.error = null;
})
.addCase(updateUser.fulfilled, (state, action) => {
  // console.log(state)
  state.updatingUser = false;
  const updatedUser = action.payload;
  const index = state.users.findIndex((u) => u.id === updatedUser.id);
  if (index !== -1) {
    state.users[index] = updatedUser;
  }
})
.addCase(updateUser.rejected, (state, action) => {
  state.updatingUser = false;
  state.error = action.payload;
})

  },
});

export default usersSlice.reducer;
