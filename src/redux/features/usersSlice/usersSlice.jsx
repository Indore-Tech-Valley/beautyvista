import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import {  ADMIN_USERS_BASE_URL, authToken } from "../../../../config";

// ✅ Fetch all users
export const fetchAllUsers = createAsyncThunk(
  "users/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${ADMIN_USERS_BASE_URL}/get-users`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      return response.data?.data || [];
    } catch (err) {
      toast.error("Failed to fetch users");
      return rejectWithValue(err.response?.data || "Something went wrong");
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
      formData.append("role", userData.role || "");
      formData.append("is_active", userData.is_active ? "true" : "false");
        if (userData.profile_image instanceof File) {
        formData.append("profile_image", userData.profile_image);
      }

      const response = await axios.patch(
        `${USERS_BASE_URL}/update-user/${userData.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      toast.success("User updated successfully");
      return response.data?.data;
    } catch (err) {
      toast.error("Failed to update user");
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);


// ✅ Slice
const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const updatedUser = action.payload;
        const index = state.users.findIndex((u) => u.id === updatedUser.id);
        if (index !== -1) {
          state.users[index] = updatedUser;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default usersSlice.reducer;
