import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CONTACT_BASE_URL, ADMIN_CONTACT_QUERIES_URL  , authToken} from "../../../../config";

// Base URLs
const USER_BASE_URL = CONTACT_BASE_URL;

// ==========================================
// 🧑‍💻 User: Submit Contact Form
// ==========================================
export const addContact = createAsyncThunk(
  "contactForm/addContact",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${USER_BASE_URL}`, formData);
      return response.data; // Backend should return full contact object
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || "An error occurred while submitting the contact.");
    }
  }
);

// ==========================================
// 👩‍💼 Admin: Add Contact (on behalf of user)
// ==========================================
export const adminAddContact = createAsyncThunk(
  "contactForm/adminAddContact",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${ADMIN_CONTACT_QUERIES_URL}/create-user-query`, formData , 
         {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`
                  },
                }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.detail || "An error occurred while submitting the contact.");
    }
  }
);

// ==========================================
// 👩‍💼 Admin: Fetch All Contacts
// ==========================================
export const adminFetchContacts = createAsyncThunk(
  "contactForm/adminFetchContacts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${ADMIN_CONTACT_QUERIES_URL}/get-user-queries`,
         {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`
                  },
                }
      )  
      ;
      return response.data.data; // Assumes { data: [...] }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "An error occurred while fetching contacts.");
    }
  }
);

// ==========================================
// 👩‍💼 Admin: Delete Contact
// ==========================================
export const adminDeleteContact = createAsyncThunk(
  "contactForm/adminDeleteContact",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${ADMIN_CONTACT_QUERIES_URL}/delete-user-query/${id}` , 
         {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`
                  },
                }
      );
      return id; // Return the deleted ID
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "An error occurred while deleting the contact.");
    }
  }
);

// ==========================================
// 🧩 Redux Slice
// ==========================================
const contactFormSlice = createSlice({
  name: "contactForm",
  initialState: {
    contacts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🧑‍💻 User: Add Contact
      .addCase(addContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 👩‍💼 Admin: Add Contact
      .addCase(adminAddContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(adminAddContact.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts.push(action.payload);
      })
      .addCase(adminAddContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 👩‍💼 Admin: Fetch Contacts
      .addCase(adminFetchContacts.pending, (state) => {
        state.loading = true;
      })
      .addCase(adminFetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(adminFetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 👩‍💼 Admin: Delete Contact
      .addCase(adminDeleteContact.pending, (state) => {
        state.loading = true;
      })
      .addCase(adminDeleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = state.contacts.filter((c) => c.id !== action.payload);
      })
      .addCase(adminDeleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default contactFormSlice.reducer;
