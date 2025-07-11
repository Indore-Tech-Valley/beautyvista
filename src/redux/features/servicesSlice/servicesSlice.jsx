// redux/features/services/servicesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import {
  SERVICES_BASE_URL,
  ADMIN_SERVICES_URL,
  authToken,
} from "../../../../config";
import Cookies from "js-cookie";

// ✅ Fetch all public services
export const fetchServices = createAsyncThunk(
  "services/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(SERVICES_BASE_URL);
      // console.log(response)
      return response.data?.data || [];
    } catch (error) {
      toast.error("Failed to fetch services");
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// ✅ Fetch all admin services
export const adminFetchServices = createAsyncThunk(
  "services/adminFetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${ADMIN_SERVICES_URL}/get-parlour-services`,
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      );
      // console.log(response.data.data);
      return response.data?.data || [];
    } catch (error) {
      toast.error("Failed to fetch admin services");
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// ✅ Add service
export const addService = createAsyncThunk(
  "services/add",
  async (serviceData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${ADMIN_SERVICES_URL}/create-parlour-service`,
        serviceData,
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      );
      // console.log(response)
      // console.log(response.data?.message)
      return response.data?.message;
    } catch (error) {
      // toast.error("Failed to add service");
console.log(error.response.data.detail)
      return rejectWithValue(error.response.data.detail[0].msg|| "Something went wrong");
    }
  }
);

// ✅ Update service
export const updateService = createAsyncThunk(
  "services/update",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      // console.log(updates);
      const response = await axios.patch(
        `${ADMIN_SERVICES_URL}/update-parlour-service/${id}`,
        updates,
        {
          headers: {
            "Content-Type": "multipart/form-data",

            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      );
      console.log(response.data?.message)
      return response.data?.message;
    } catch (error) {
        console.log(error)
      return rejectWithValue(error.response.data.detail || "Something went wrong");
    }
  }
);

// ✅ Delete service
export const deleteService = createAsyncThunk(
  "services/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${ADMIN_SERVICES_URL}/delete-parlour-service/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      });
      return "Service deleted successfully";
    } catch (error) {
      console.log(error)
      return rejectWithValue(
        error.response.data.detail || "Something went wrong while deleting service"
      );
    }
  }
);


// ✅ Update service status (active/inactive)
export const updateServiceStatus = createAsyncThunk(
  "services/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      console.log(id, status);
      const formData = new URLSearchParams();
      formData.append("status", status); // status = true/false

      await axios.put(`${ADMIN_SERVICES_URL}/update-status/${id}`, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      });
      return { id, status };
    } catch (error) {
      return rejectWithValue(
        error.response?.data.detail ||
          "An error occurred while updating service status"
      );
    }
  }
);

// export const updateCategoryStatus = createAsyncThunk(
//   "categories/updateStatus",
//   async ({ id, status }, { rejectWithValue }) => {
//     try {
//       const formData = ;new URLSearchParams()
//       formData.append("status", status); // true/false
//       await axios.put(
//         `${ADMIN_CATEGORIES_URL}/update-status/${id}`,
//         formData,

//         {
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//             Authorization: `Bearer ${authToken}`
//           },
//         }
//       );

//       return { id, status }; // return ID and new status
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data || "An error occurred while updating status"
//       );
//     }
//   }
// );

// ✅ Services slice
const servicesSlice = createSlice({
  name: "services",
  initialState: {
    services: [],
    loading: false,
    error: null,
    updatingService: false,
  },
  reducers: {},
  extraReducers: (builder) => {
  builder
    // 🔁 Public Fetch Services
    .addCase(fetchServices.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchServices.fulfilled, (state, action) => {
      state.loading = false;
      state.services = action.payload;
    })
    .addCase(fetchServices.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // 🔁 Admin Fetch Services
    .addCase(adminFetchServices.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(adminFetchServices.fulfilled, (state, action) => {
      state.loading = false;
      state.services = action.payload;
    })
    .addCase(adminFetchServices.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // ➕ Add Service
    .addCase(addService.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(addService.fulfilled, (state, action) => {
      state.loading = false;
      // No change to services list as only message is returned.
    })
    .addCase(addService.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // ✏️ Update Service
    .addCase(updateService.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateService.fulfilled, (state, action) => {
      state.loading = false;
      // No service object returned, just message, so skip update
    })
    .addCase(updateService.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // ❌ Delete Service
    .addCase(deleteService.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(deleteService.fulfilled, (state, action) => {
      state.loading = false;
      // No ID returned, so cannot filter services list here unless thunk returns ID
    })
    .addCase(deleteService.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // 🔄 Update Service Status

    .addCase(updateServiceStatus.fulfilled, (state, action) => {
      state.loading = false;
      const { id, status } = action.payload;
      const service = state.services.find((s) => s.id === id);
      if (service) {
        service.is_active = status;
      }
    })
    .addCase(updateServiceStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to update service status.";
      toast.error(state.error);
    });
}
,
});

export default servicesSlice.reducer;
