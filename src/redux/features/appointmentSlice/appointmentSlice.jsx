import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { APPOINTMENT_BASE_URL, ADMIN_APPOINTMENTS_URL } from "../../../../config";
import Cookies from "js-cookie";

// 📥 Fetch all appointments (admin view)
export const adminFetchAppointments = createAsyncThunk(
  "appointments/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${ADMIN_APPOINTMENTS_URL}/get-appointments`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data.detail || "Failed to fetch appointments.");
    }
  }
);

// ➕ Add a new appointment
export const addAppointment = createAsyncThunk(
  "appointments/add",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(APPOINTMENT_BASE_URL, formData, {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      });
      return response.data.message;
    } catch (error) {
    console.log(error.response.data.detail)
      return rejectWithValue(error.response?.data.detail || "Failed to book appointment.");
    }
  }
);

// ❌ Delete an appointment
export const deleteAppointment = createAsyncThunk(
  "appointments/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${ADMIN_APPOINTMENTS_URL}/delete-booking-appointment/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data.detail || "Failed to delete appointment.");
    }
  }
);

// 🔁 Update appointment status
export const updateAppointmentStatus = createAsyncThunk(
  "appointments/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      await axios.put(
        `${ADMIN_APPOINTMENTS_URL}/update-appointment-status/${id}?status=${status}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      );
      return { id, status };
    } catch (error) {
      return rejectWithValue(error.response?.data.detail || "Failed to update appointment status");
    }
  }
);

// 🔄 Appointments slice
const appointmentSlice = createSlice({
  name: "appointments",
  initialState: {
    appointments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 📦 Fetch Appointments
      .addCase(adminFetchAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminFetchAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload;
      })
      .addCase(adminFetchAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ➕ Add Appointment
      .addCase(addAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments.push(action.payload);
      })
      .addCase(addAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add appointment.";
      })

      // ❌ Delete Appointment
      .addCase(deleteAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = state.appointments.filter(
          (appt) => appt.id !== action.payload
        );
      })
      .addCase(deleteAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete appointment.";
      })

      // 🔁 Update Appointment Status
      .addCase(updateAppointmentStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAppointmentStatus.fulfilled, (state, action) => {
        state.loading = false;
        const { id, status } = action.payload;
        const appointment = state.appointments.find((a) => a.id === id);
        if (appointment) {
          appointment.status = status;
        }
      })
      .addCase(updateAppointmentStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update appointment status.";
      });
  },
});

export default appointmentSlice.reducer;
