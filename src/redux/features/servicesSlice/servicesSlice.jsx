// redux/features/services/servicesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import {
  SERVICES_BASE_URL,
  ADMIN_SERVICES_URL,
  authToken,
} from "../../../../config";

// ✅ Fetch all public services
export const fetchServices = createAsyncThunk(
  "services/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(SERVICES_BASE_URL);
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

            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log(response.data.data)
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

            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      toast.success("Service added successfully");
      return response.data?.data;
    } catch (error) {
      toast.error("Failed to add service");
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// ✅ Update service
export const updateService = createAsyncThunk(
  "services/update",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      console.log(updates)
      const response = await axios.patch(
        `${ADMIN_SERVICES_URL}/update-parlour-service/${id}`,
        updates,
        {
          headers: {
                     "Content-Type": "multipart/form-data",

            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      toast.success("Service updated successfully");
      return response.data?.data;
    } catch (error) {
      toast.error("Failed to update service");
      return rejectWithValue(error.response?.data || "Something went wrong");
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
                  "Content-Type": "multipart/form-data",

          Authorization: `Bearer ${authToken}`,
        },
      });
      toast.success("Service deleted successfully");
      return id;
    } catch (error) {
      toast.error("Failed to delete service");
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

// ✅ Update service status (active/inactive)
export const updateServiceStatus = createAsyncThunk(
  "services/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      console.log(id,status)
      const formData = new URLSearchParams();
      formData.append("status", status); // status = true/false

      await axios.put(
        `${ADMIN_SERVICES_URL}/update-status/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      return { id, status };
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "An error occurred while updating service status"
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
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
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

      .addCase(addService.fulfilled, (state, action) => {
        state.services.unshift(action.payload);
      })

      .addCase(updateService.fulfilled, (state, action) => {
        const index = state.services.findIndex(
          (srv) => srv.id === action.payload.id
        );
        if (index !== -1) state.services[index] = action.payload;
      })

      .addCase(deleteService.fulfilled, (state, action) => {
        state.services = state.services.filter(
          (srv) => srv.id !== action.payload
        );
      })

     .addCase(updateServiceStatus.fulfilled, (state, action) => {
  const { id, status } = action.payload;
  const service = state.services.find((s) => s.id === id);
  if (service) {
    service.is_active = status; // ✅ fix here
  }
})


// .addCase(updateCategoryStatus.fulfilled, (state, action) => {
//   const { id, status } = action.payload;
//   const category = state.categories.find((c) => c.id === id);
//   if (category) {
//     category.status = status; // status is "active" or "inactive"
//   }
// })

//   },


      .addCase(updateServiceStatus.rejected, (state, action) => {
        state.error = action.payload || "Failed to update service status.";
        toast.error(state.error);
      });
  },
});

export default servicesSlice.reducer;
