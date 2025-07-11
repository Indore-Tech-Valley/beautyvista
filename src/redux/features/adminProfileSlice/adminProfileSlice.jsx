import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ADMIN_PROFILE_URL } from "../../../../config";
import Cookies from "js-cookie";

// ✅ Dynamic Auth Headers
const getAuthHeaders = () => ({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${Cookies.get("authToken")}`,
  },
});

const getImageHeaders = () => ({
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${Cookies.get("authToken")}`,
  },
});

// ========================================
// 🧠 GET Profile: /profile/me
// ========================================
export const fetchAdminProfile = createAsyncThunk(
  "adminProfile/fetchAdminProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${ADMIN_PROFILE_URL}/profile/me`, getAuthHeaders());
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.detail || "Failed to fetch admin profile.");
    }
  }
);

// ========================================
// 🔐 UPDATE Password: /security/update-creds
// ========================================
export const updateAdminPassword = createAsyncThunk(
  "adminProfile/updateAdminPassword",
  async ({ old_password, new_password, confirm_password }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${ADMIN_PROFILE_URL}/security/update-credential`,
        { old_password, new_password, confirm_password },
        getAuthHeaders()
      );
      return res.data.message || "Password updated successfully.";
    } catch (err) {
      return rejectWithValue(err.response?.data?.detail || "Failed to update password.");
    }
  }
);

// ========================================
// ✏️ UPDATE Name + Email: /profile/update
// ========================================
export const updateAdminProfile = createAsyncThunk(
  "adminProfile/updateAdminProfile",
  async ({ name, email }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `${ADMIN_PROFILE_URL}/profile/update-profile`,
        { name, email },
        getAuthHeaders()
      );
      return res.data.message || "Profile updated successfully.";
    } catch (err) {
      return rejectWithValue(err.response?.data?.detail || "Failed to update admin profile.");
    }
  }
);

// ========================================
// 📸 UPDATE Profile Image: /profile/upload-image
// ========================================
export const updateProfileImage = createAsyncThunk(
  "adminProfile/updateProfileImage",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${ADMIN_PROFILE_URL}/profile/update-profile-image`,
        formData,
        getImageHeaders()
      );
      return res.data.message || "Profile image updated successfully.";
    } catch (err) {
      return rejectWithValue(err.response?.data?.detail || "Failed to update profile image.");
    }
  }
);

// ========================================
// 🧩 Slice
// ========================================
const adminProfileSlice = createSlice({
  name: "adminProfile",
  initialState: {
    data: null,
    loading: false,
    error: null,
    success: null,
    isUpdating: false,
  },
  reducers: {
    clearAdminProfileMessages: (state) => {
      state.error = null;
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // FETCH PROFILE
      .addCase(fetchAdminProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAdminProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE PROFILE
      .addCase(updateAdminProfile.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateAdminProfile.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.success = action.payload;
      })
      .addCase(updateAdminProfile.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload;
      })

      // UPDATE IMAGE
      .addCase(updateProfileImage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateProfileImage.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(updateProfileImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE PASSWORD
      .addCase(updateAdminPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(updateAdminPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(updateAdminPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAdminProfileMessages } = adminProfileSlice.actions;

export default adminProfileSlice.reducer;
