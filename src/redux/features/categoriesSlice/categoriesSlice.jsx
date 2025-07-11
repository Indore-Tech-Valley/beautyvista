// redux/features/categories/categoriesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CATEGORIES_BASE_URL, ADMIN_CATEGORIES_URL } from "../../../../config";
import Cookies from "js-cookie";

// ✅ Fetch all categories (public view)
export const fetchCategories = createAsyncThunk(
  "categories/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(CATEGORIES_BASE_URL);
      return response.data?.data || []; // Returns an array of categories
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "An error occurred while fetching categories"
      );
    }
  }
);

// ✅ Fetch all categories (admin view)
export const adminFetchCategories = createAsyncThunk(
  "categories/adminFetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${ADMIN_CATEGORIES_URL}/get-categories`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      );
      console.log(response.data.data)
      return response.data?.data || [];
    } catch (error) {
      console.log(error)
      return rejectWithValue(
        error.response?.data || "An error occurred while fetching categories"
      );
    }
  }
);

// ✅ Add new category (admin)
export const addCategory = createAsyncThunk(
  "categories/add",
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${ADMIN_CATEGORIES_URL}/create-category`,
        categoryData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      );
      return response.data?.message || "Category added successfully"; // ✅ return message
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "An error occurred while adding category"
      );
    }
  }
);

// ✅ Update category details (admin)
export const updateCategory = createAsyncThunk(
  "categories/update",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${ADMIN_CATEGORIES_URL}/update-category/${id}`,
        updates,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      );
      // console.log(response.data.message);
      return response.data?.message;
    } catch (error) {
      return rejectWithValue(
        error.response?.data.detail ||
          "An error occurred while updating category"
      );
    }
  }
);

// ✅ Delete category by ID (admin)
export const deleteCategory = createAsyncThunk(
  "categories/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${ADMIN_CATEGORIES_URL}/delete-category/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      });
      return id; // Return the deleted category's ID
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "An error occurred while deleting category"
      );
    }
  }
);

// ✅ Toggle category status (active/inactive)
export const updateCategoryStatus = createAsyncThunk(
  "categories/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      console.log(id, status);
      const formData = new URLSearchParams();
      formData.append("status", status); // true/false
      await axios.put(`${ADMIN_CATEGORIES_URL}/update-status/${id}`, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      });

      return { id, status }; // return ID and new status
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "An error occurred while updating status"
      );
    }
  }
);

// 🔄 Categories slice
const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [], // stores all categories
    loading: false, // true while API call in progress
    error: null, // holds any error message
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      // 🔁 Public fetch
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔁 Admin fetch
      .addCase(adminFetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminFetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(adminFetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ➕ Add category
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories.unshift(action.payload); // Add new category to top
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✏️ Update category
      .addCase(updateCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex(
          (cat) => cat.id === action.payload.id
        );
        if (index !== -1) state.categories[index] = action.payload;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ❌ Delete category
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = state.categories.filter(
          (cat) => cat.id !== action.payload
        );
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // 🔄 Update status (active/draft)
      // 🔄 Update status (active/inactive)
      .addCase(updateCategoryStatus.fulfilled, (state, action) => {
        const { id, status } = action.payload;
        const category = state.categories.find((c) => c.id === id);
        if (category) {
          category.is_active = status; // status is "active" or "inactive"
        }
      })
      .addCase(updateCategoryStatus.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload || "Failed to update category status.";
  // toast.error(state.error); // if using react-toastify
})
;
  },
});

export default categoriesSlice.reducer;
