import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { APPOINTMENT_BASE_URL, ADMIN_APPOINTMENTS_URL , authToken } from "../../../../config";

// 📥 Fetch all appointments (admin view)
export const adminFetchAppointments = createAsyncThunk(
  "appointments/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${ADMIN_APPOINTMENTS_URL}/get-appointments` , 
         {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`
          },
        }
      );
      return response.data.data; // expecting an array of appointments
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch appointments.");
    }
  }
);

// ➕ Add a new appointment (user booking)
export const addAppointment = createAsyncThunk(
  "appointments/add",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(APPOINTMENT_BASE_URL, formData , 
         {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`
          },
        }
      );
      return response.data; // expecting the newly created appointment
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to book appointment.");
    }
  }
);

// ❌ Delete an appointment (admin only)
export const deleteAppointment = createAsyncThunk(
  "appointments/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${ADMIN_APPOINTMENTS_URL}/delete-booking-appointment/${id}` , 
         {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`
          },
        }
      );
      return id; // return ID to remove from state
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete appointment.");
    }
  }
);

// 🔁 Update appointment status (admin only)
export const updateAppointmentStatus = createAsyncThunk(
  "appointments/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      await axios.put(
        `${ADMIN_APPOINTMENTS_URL}/update-appointment-status/${id}?status=${status}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      return { id, status };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update appointment status");
    }
  }
);



// 🔄 Appointments slice
const appointmentSlice = createSlice({
  name: "appointments",
  initialState: {
    appointments: [], // stores all appointments
    loading: false,   // tracks loading state
    error: null,      // stores error messages
  },
  reducers: {},

  // 🚀 Handle async thunk states
  extraReducers: (builder) => {
    builder
      // 🟡 Fetch appointments - loading
      .addCase(adminFetchAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // ✅ Fetch appointments - success
      .addCase(adminFetchAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })

      // ❌ Fetch appointments - error
      .addCase(adminFetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Add appointment - success
      .addCase(addAppointment.fulfilled, (state, action) => {
        state.appointments.push(action.payload); // add new appointment to state
      })

      // ✅ Delete appointment - success
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        // filter out the deleted appointment
        state.appointments = state.appointments.filter(appt => appt.id !== action.payload);
      })

      
.addCase(updateAppointmentStatus.fulfilled, (state, action) => {
  const { id, status } = action.payload;
  const appointment = state.appointments.find((a) => a.id === id);
  if (appointment) {
    appointment.status = status;
  }
})



// ❌ Update appointment status - error
.addCase(updateAppointmentStatus.rejected, (state, action) => {
  state.error = action.payload || "Failed to update appointment status.";
})
;
  },
});

export default appointmentSlice.reducer;
