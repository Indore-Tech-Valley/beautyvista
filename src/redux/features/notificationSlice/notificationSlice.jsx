import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { NOTIFICATION_URL } from "../../../../config";
import Cookies from "js-cookie";

// const BASE_URL = "http://192.168.1.108:8000/api/v1/notification";
const BASE_URL = NOTIFICATION_URL;

// ✅ Fetch all stored notifications
export const fetchNotifications = createAsyncThunk(
  "notifications/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      
      const res = await axios.get(`${BASE_URL}/get-all-notifications` , {
         headers: {
                  Authorization: `Bearer ${Cookies.get("authToken")}`,
                },
      }
        
      );
      
      // console.log(res);
      return res.data.data
        .slice()
        .reverse()
        .slice(0, 10)
        .map((n) => ({
          id: n.id || Date.now() + Math.random(),
          name: n.data?.name || "Unknown",
          message: n.data?.message || "",
          type: n.notification_type || "info",
          timestamp: new Date(n.received_at || Date.now()).toLocaleString(
            "en-IN",
            {
              dateStyle: "medium",
              timeStyle: "short",
              timeZone: "Asia/Kolkata",
            }
          ),
          isRead: n.is_read,
          source: n.source || "unknown", // 👈 this decides the prefix
          dataId: n.data?.id || null,
          service_id: n.data.service_id,
          appointment_date: n.data.appointment_date,
          appointment_time: n.data.appointment_time,

          // Service ID: N/A

          // Appointment Date: N/A

          // Appointment Time: N/A

          // Message: No message
        }));
    } catch (err) {
      toast.error("Failed to load notifications");
      return rejectWithValue(err.response?.data || "Unexpected error");
    }
  }
);

export const markNotificationAsRead = createAsyncThunk(
  "notifications/markAsRead",
  async (id, { rejectWithValue }) => {
    try {
      console.log(id)
      const res = await axios.put(
        `${BASE_URL}/mark-as-read/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("authToken")}`,
          },
        }
      );
      console.log(res)
      return id;
    } catch (err) {
      toast.error("Failed to mark as read");
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);

export const markAllNotificationsAsRead = createAsyncThunk(
  "notifications/markAllAsRead",
  async (_, { rejectWithValue }) => {
    try {
      await axios.put(`${BASE_URL}/mark-all-as-read`, {}, {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      });
      return true;
    } catch (err) {
      toast.error("Failed to mark all as read");
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);



export const deleteNotificationById = createAsyncThunk(
  "notifications/deleteOne",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/delete-notification/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      });
      return id;
    } catch (err) {
      toast.error("Failed to delete notification");
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);


export const deleteAllNotificationsFromServer = createAsyncThunk(
  "notifications/deleteAll",
  async (_, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/delete-all-notifications`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("authToken")}`,
        },
      });
      return true;
    } catch (err) {
      toast.error("Failed to delete all notifications");
      return rejectWithValue(err.response?.data || "Something went wrong");
    }
  }
);




// ✅ Start SSE listener; dispatches actions for each incoming notification
export const startNotificationListener = createAsyncThunk(
  "notifications/startListener",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const es = new EventSource(`${BASE_URL}/get-updates?token=${Cookies.get("authToken")}` );

      es.onopen = () => dispatch(setConnectionStatus("Connected"));
      es.onerror = () => {
        es.close();
        dispatch(setConnectionStatus("Disconnected"));
        console.error("SSE connection closed due to error");
        // Don't return rejectWithValue here (no try/catch context)
      };
      es.onmessage = (e) => {
        if (["ping", "heartbeat"].includes(e.data)) return;

        try {
          const p = JSON.parse(e.data);
            console.log(p)
          const notif = {
            // id: p.data?.id || Date.now() + Math.random(),
            id: p.id ,
            name: p.data?.name || "Unknown",
            message: p.data?.message || "",
            type: p.notification_type || "info",
            source: p.source || null, // ✅ store the source
            dataId: p.data?.id || null,
            timestamp: new Date(p.received_at || Date.now()).toLocaleString(
              "en-IN",
              {
                dateStyle: "medium",
                timeStyle: "short",
                timeZone: "Asia/Kolkata",
              }
            ),
            isRead: false,
            service_id: p.data.service_id,
          appointment_date: p.data.appointment_date,
          appointment_time: p.data.appointment_time,
          };
          dispatch(addNotification(notif));
        } catch (_) {
          console.warn("Failed to parse SSE message", e.data);
        }
      };

      // Don't return `es` – it's non-serializable!
      return null;
    } catch (err) {
      toast.error("Failed to start SSE listener");
      return rejectWithValue("SSE init failed");
    }
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    notifications: [],
    loading: false,
    connectionStatus: "Disconnected",
    error: null,
  },
  reducers: {
    addNotification: (state, { payload }) => {
      state.notifications.unshift(payload);
    },
    markAsRead: (state, { payload: id }) => {
      const n = state.notifications.find((i) => i.id === id);
      if (n) n.isRead = true;
    },
    markAllAsRead: (state) => {
      state.notifications.forEach((n) => (n.isRead = true));
    },
    deleteNotification: (state, { payload: id }) => {
      state.notifications = state.notifications.filter((n) => n.id !== id);
    },
    clearAllNotifications: (state) => {
      state.notifications = [];
    },
    setConnectionStatus: (state, { payload }) => {
      state.connectionStatus = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.notifications = payload;
      })
      .addCase(fetchNotifications.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(startNotificationListener.rejected, (state, { payload }) => {
        state.error = payload;
        state.connectionStatus = "Disconnected";
      })
      .addCase(markNotificationAsRead.fulfilled, (state, { payload: id }) => {
  const n = state.notifications.find((n) => n.id === id);
  if (n) n.isRead = true;
})
.addCase(deleteNotificationById.fulfilled, (state, { payload: id }) => {
  state.notifications = state.notifications.filter((n) => n.id !== id);
})
.addCase(deleteAllNotificationsFromServer.fulfilled, (state) => {
  state.notifications = [];
})
.addCase(markAllNotificationsAsRead.fulfilled, (state) => {
  state.notifications.forEach((n) => {
    n.isRead = true;
  });
})

  },
})

;

export const {
  addNotification,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  clearAllNotifications,
  setConnectionStatus,
} = notificationSlice.actions;

export default notificationSlice.reducer;
