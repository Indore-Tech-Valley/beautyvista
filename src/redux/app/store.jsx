  import { configureStore } from '@reduxjs/toolkit';
  import contactFormReducer from '../features/contactFormSlice/contactFormSlice'
  import faqsReducer from '../features/faqsSlice/faqsSlice';
  import categoriesReducer from '../features/categoriesSlice/categoriesSlice'
  import servicesReducer from '../features/servicesSlice/servicesSlice'
  import appointmentsReducer from '../features/appointmentSlice/appointmentSlice'
  import authReducer from '../features/authSlice/authSlice'
  import notificationReducer from '../features/notificationSlice/notificationSlice'
  import usersReducer from '../features/usersSlice/usersSlice'
import adminProfile from '../features/adminProfileSlice/adminProfileSlice'
import configReducer from '../features/Configs/configs'

  const store = configureStore({
    reducer: {
      contactForm:contactFormReducer,
      faqs: faqsReducer,
      categories: categoriesReducer,
      services:servicesReducer,
      appointments: appointmentsReducer,
      auth: authReducer,
      notifications : notificationReducer,
      usersReducer : usersReducer,
      adminProfile : adminProfile,
      config: configReducer,
    },
  });

  export default store