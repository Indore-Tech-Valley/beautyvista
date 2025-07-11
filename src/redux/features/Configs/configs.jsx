import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CONFIGS_URL } from "../../../../config"; // Ensure this points to your backend API

// ─────────────────────────────────────────────
// 🟡 Thunk to fetch all config data
// ─────────────────────────────────────────────
export const fetchConfig = createAsyncThunk(
  "config/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(CONFIGS_URL);
      return response.data?.data || {};
    } catch (error) {
      return rejectWithValue(
        error.response?.data.detail || "Failed to fetch configuration"
      );
    }
  }
);

// ─────────────────────────────────────────────
// 🟢 Thunk to update config fields (partial)
// ─────────────────────────────────────────────
export const updateConfig = createAsyncThunk(
  "config/update",
  async (updatedData, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${CONFIGS_URL}/update`, {
        data: updatedData,
      });
      return response.data.message || updatedData;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.detail || "Failed to update configuration"
      );
    }
  }
);

// ─────────────────────────────────────────────
// 🔵 Thunk to upload site logo image
// ─────────────────────────────────────────────
export const uploadSiteLogo = createAsyncThunk(
  "config/uploadSiteLogo",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("site_logo", file);

      const response = await axios.put(
        `${CONFIGS_URL}/upload-site-logo`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.detail || "Failed to upload site logo"
      );
    }
  }
);

// ─────────────────────────────────────────────
// 🔧 Slice Definition
// ─────────────────────────────────────────────
const configSlice = createSlice({
  name: "config",
  initialState: {
    config: {},      // Store configuration as key-value pairs
    loading: false,  // Global loading state
    error: null,     // Error state
  },
  reducers: {},

  extraReducers: (builder) => {
    builder

      // ── Fetch Config ──────────────────────────────
      .addCase(fetchConfig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConfig.fulfilled, (state, action) => {
        state.loading = false;
        state.config = action.payload;
      })
      .addCase(fetchConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ── Update Config ─────────────────────────────
      .addCase(updateConfig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateConfig.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.config = {
          ...state.config,
          ...action.payload,
        };
      })
      .addCase(updateConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ── Upload Site Logo ──────────────────────────
      .addCase(uploadSiteLogo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadSiteLogo.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.config = {
          ...state.config,
          ...action.payload,
        };
      })
      .addCase(uploadSiteLogo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default configSlice.reducer;
