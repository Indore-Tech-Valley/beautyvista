import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { FAQS_BASE_URL, ADMIN_FAQS_URL } from "../../../../config";
import Cookies from "js-cookie";
// 📥 Fetch all FAQs (public)
export const fetchFAQs = createAsyncThunk(
  "faqs/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(FAQS_BASE_URL);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "An error occurred while fetching FAQs"
      );
    }
  }
);

export const fetchAdminFAQs = createAsyncThunk(
  "faqs/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${ADMIN_FAQS_URL}/get-faqs`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "An error occurred while fetching FAQs"
      );
    }
  }
);

// ➕ Add FAQ (admin)
export const addFAQ = createAsyncThunk(
  "faqs/add",
  async (faqData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${ADMIN_FAQS_URL}/create-faq`,
        faqData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      );
      console.log(response.data.data.message)
      return response.data.data;
    } catch (error) {
        console.log(error)
        console.log(error.response?.data.detail )

      return rejectWithValue(
        error.response?.data.detail || "An error occurred while adding FAQ"
      );
    }
  }
);

// ✏️ Update FAQ (admin)
export const updateFAQ = createAsyncThunk(
  "faqs/update",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${ADMIN_FAQS_URL}/update-faq/${id}`,
        updates,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      );
      return response.data?.message;
    } catch (error) {
      // console.log(error.response.data.detail);
      return rejectWithValue(
        error.response?.data.detail || "An error occurred while updating FAQ"
      );
    }
  }
);

// ❌ Delete FAQ (admin)
export const deleteFAQ = createAsyncThunk(
  "faqs/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${ADMIN_FAQS_URL}/delete-faq/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      });
      return "FAQ deleted successfully";
    } catch (error) {
      console.log(error.response?.data?.details);
      return rejectWithValue(
        error.response?.data?.message || "An error occurred while deleting FAQ"
      );
    }
  }
);

// Update Faq Status

export const updateFAQStatus = createAsyncThunk(
  "faqs/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const formData = new URLSearchParams();
      formData.append("status", status); // must be boolean: true/false

      const response = await axios.put(
        `${ADMIN_FAQS_URL}/update-status/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      );
      // console.log(response)
      return { id, status };
    } catch (error) {
      console.error("Update FAQ status error:", error.response?.data);
      return rejectWithValue(
        error.response?.data || "An error occurred while updating FAQ status"
      );
    }
  }
);

// Slice
const faqSlice = createSlice({
  name: "faqs",
  initialState: {
    faqs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchFAQs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFAQs.fulfilled, (state, action) => {
        state.loading = false;
        state.faqs = action.payload;
      })
      .addCase(fetchFAQs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add
      .addCase(addFAQ.fulfilled, (state, action) => {
        state.faqs.unshift(action.payload);
      })

      // Update
      .addCase(updateFAQ.fulfilled, (state, action) => {
        const index = state.faqs.findIndex(
          (faq) => faq.id === action.payload.id
        );
        if (index !== -1) {
          state.faqs[index] = action.payload;
        }
      })

      // Delete
      .addCase(deleteFAQ.fulfilled, (state, action) => {
        state.faqs = state.faqs.filter((faq) => faq.id !== action.payload);
      })

      .addCase(updateFAQStatus.fulfilled, (state, action) => {
        const index = state.faqs.findIndex(
          (faq) => faq.id === action.payload.id
        );
        if (index !== -1) {
          state.faqs[index].is_active = action.payload.status;
        }
        state.loading = false;
      })
      .addCase(updateFAQStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFAQStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default faqSlice.reducer;
