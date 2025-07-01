import Cookies from 'js-cookie';
export const BASE_URL="http://192.168.1.119:8000/api/v1"

export const CONTACT_BASE_URL=`${BASE_URL}/contact/user-query`;
export const FAQS_BASE_URL=`${BASE_URL}/faq/get-faqs`;
export const CATEGORIES_BASE_URL=`${BASE_URL}/category/get-categories`;
export const SERVICES_BASE_URL=`${BASE_URL}/services/get-parlour-services`;
export const APPOINTMENT_BASE_URL=`${BASE_URL}/services/book-appointment`;


//Admin apis

export const ADMIN_BASE_URL="http://192.168.1.119:8000/api/v1/admin"
// export const ADMIN_BASE_URL=`{${BASE_URL}/admin}`


// 🔐 Admin Auth
// export const ADMIN_LOGIN_URL = `${ADMIN_BASE_URL}/auth/login`;
// export const ADMIN_PROFILE_URL = `${ADMIN_BASE_URL}/auth/profile`;

// 🧴 Admin Services
export const ADMIN_SERVICES_URL = `${ADMIN_BASE_URL}/services`;

// 🧭 Admin Categories
export const ADMIN_CATEGORIES_URL = `${ADMIN_BASE_URL}/category`;

// 📅 Admin Appointments
export const ADMIN_APPOINTMENTS_URL = `${ADMIN_BASE_URL}/services`;

// ❓ Admin FAQs
export const ADMIN_FAQS_URL = `${ADMIN_BASE_URL}/faq`;

// 📬 Admin Contact Forms
export const ADMIN_CONTACT_QUERIES_URL = `${ADMIN_BASE_URL}/contact`;

// 🌟 Admin Testimonials
export const ADMIN_TESTIMONIALS_URL = `${ADMIN_BASE_URL}/testimonials`;

// ⚙️ Admin Frontend Config
export const ADMIN_CONFIG_URL = `${ADMIN_BASE_URL}/config`;
//admmin login
export const ADMIN_LOGIN_URL = `${BASE_URL}/auth/login`;

export const ADMIN_USERS_BASE_URL = `${ADMIN_BASE_URL}/user`

export const authToken=Cookies.get("authToken")

export const NOTIFICATION_URL = `${BASE_URL}/notification`