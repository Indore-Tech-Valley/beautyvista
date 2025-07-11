import React, { useEffect, useRef, useState } from "react";
import {
  Bell,
  BellRing,
  ChevronDown,
  User,
  LogOut,
  Settings,
  Check,
  X,
  Trash2,
  Wifi,
  WifiOff,
  AlertCircle,
  Info,
  CheckCircle,
  AlertTriangle,
  Clock,
  Eye,
  EyeOff
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotifications,
  deleteNotificationById,
  deleteAllNotificationsFromServer,
  markNotificationAsRead,
  markAsRead,
  markAllNotificationsAsRead,
  clearAllNotifications,
  startNotificationListener,
} from "../../../redux/features/notificationSlice/notificationSlice";
import { adminFetchContacts } from "../../../redux/features/contactFormSlice/contactFormSlice";
import { adminFetchAppointments } from "../../../redux/features/appointmentSlice/appointmentSlice";
import { useNavigate } from "react-router-dom";
import { fetchAdminProfile } from "../../../redux/features/adminProfileSlice/adminProfileSlice";


const NavigationHeader = ({ onLogout }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { notifications, connectionStatus } = useSelector((state) => state.notifications);
  const { services } = useSelector((state) => state.services);
  const { data: currentUser } = useSelector((state) => state.adminProfile);


useEffect(() => {
  dispatch(fetchAdminProfile());
}, [dispatch]);




  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);
  const listenerStarted = useRef(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  const getServiceNameById = (id) => services.find((s) => String(s.id) === String(id))?.name || "N/A";

  useEffect(() => {
    document.title = unreadCount && !showNotifications
      ? `🔔 (${unreadCount}) New Notifications`
      : "BeautyVista";
  }, [notifications, showNotifications]);

  useEffect(() => {
    dispatch(fetchNotifications());
    if (!listenerStarted.current) {
      dispatch(startNotificationListener());
      listenerStarted.current = true;
    }
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!dropdownRef.current?.contains(e.target)) setShowDropdown(false);
      if (!notificationRef.current?.contains(e.target)) setShowNotifications(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getIcon = (type) => {
    const icons = {
      success: <CheckCircle className="w-5 h-5 text-green-500" />,
      alert: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
      error: <AlertCircle className="w-5 h-5 text-red-500" />,
      default: <Info className="w-5 h-5 text-blue-500" />,
    };
    return icons[type] || icons.default;
  };

  const getBorder = (type) => {
    const borders = {
      success: "border-l-4 border-green-500",
      alert: "border-l-4 border-yellow-500",
      error: "border-l-4 border-red-500",
      default: "border-l-4 border-blue-500",
    };
    return borders[type] || borders.default;
  };

  return (
    <div className="bg-white px-4 lg:pt-2 lg:pb-1 sticky top-0 z-30 border-gray-200">
      <div className="flex items-center justify-between">
        <div />
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <span>Web Socket Status:</span>
            <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
              connectionStatus === "Connected"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}>
              {connectionStatus === "Connected" ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
              {connectionStatus}
            </span>
          </div>

          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setShowNotifications((prev) => !prev)}
              className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              {unreadCount > 0 ? <BellRing size={20} className="text-blue-600" /> : <Bell size={20} />}
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
             <div className="fixed mt-2 max-h-96 bg-white rounded-lg border border-gray-200 shadow-lg z-50 
                left-5 right-5 w-[90vw] 
                md:left-90 md:right-0 md:w-[50vw]">

                <div className="p-3 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-sm font-semibold">Notifications</h3>
                  <div className="flex gap-1">
                    <button
                      onClick={() => dispatch(markAllNotificationsAsRead())}
                      className="hover:bg-gray-100 p-1 rounded"
                      title="Mark all as read"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        dispatch(deleteAllNotificationsFromServer());
                        dispatch(clearAllNotifications());
                      }}
                      className="hover:bg-gray-100 p-1 rounded"
                      title="Clear all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="max-h-80 overflow-y-auto space-y-4 px-2 py-4">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">
                      <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                      <p className="text-sm">No notifications</p>
                    </div>
                  ) : notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-all ${getBorder(n.type)}`}
                    >
                      <div className="p-3 flex items-start justify-between gap-3">
                        <div className="flex items-start space-x-2 flex-1 min-w-0">
                          {getIcon(n.type)}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap justify-between items-center">
                              <h4 className="text-sm font-medium text-gray-900 truncate">
                                {n.source === "contact_form"
                                  ? `New Contact Query from ${n.name}`
                                  : n.source === "booking_appointment_form"
                                  ? `New Appointment from ${n.name}`
                                  : `Notification from ${n.name}`}
                              </h4>
                              <div className="flex items-center text-xs text-gray-500 ml-2">
                                <Clock className="w-3 h-3 mr-1" />
                                {n.timestamp}
                              </div>
                            </div>
                            {n.message && (
                              <p className="text-xs text-gray-600 mt-1 line-clamp-2">{n.message}</p>
                            )}
                            {n.source === "booking_appointment_form" && (
                              <div className="text-xs text-gray-600 mt-2 space-y-0.5">
                                <p><strong>Service:</strong> {getServiceNameById(n.service_id)}</p>
                                <p><strong>Appointment Date:</strong> {n.appointment_date || "N/A"}</p>
                                <p><strong>Appointment Time:</strong> {n.appointment_time || "N/A"}</p>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col gap-1 ml-2">
                         <button
  onClick={() => {setShowNotifications(false)
    dispatch(markNotificationAsRead(n.id));
    dispatch(markAsRead(n.id));
    if (n.source === "contact_form") {
      dispatch(adminFetchContacts());
      navigate(`/admin/contactforms/${n.dataId}`);
    } else if (n.source === "booking_appointment_form") {
      dispatch(adminFetchAppointments());
      navigate(`/admin/appointments/${n.dataId}`);
    }
  }}
  className="p-1 rounded-full hover:bg-blue-100"
  title={n.isRead ? "Already seen" : "View details"}
>
  {n.isRead ? (
    <EyeOff className="w-4 h-4 text-gray-400" />
  ) : (
    <Eye className="w-4 h-4 text-blue-500" />
  )}
</button>

                          <button
                            onClick={() => dispatch(deleteNotificationById(n.id))}
                            className="p-1 rounded-full hover:bg-gray-100"
                            title="Delete"
                          >
                            <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative" ref={dropdownRef}>
           <button
  onClick={() => setShowDropdown(!showDropdown)}
  className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
>
  {currentUser ? (
    <>
      <img
        src={currentUser.profile_image}
        alt={currentUser.name || "Admin"}
        className="w-8 h-8 rounded-full object-cover"
      />
      <div className="hidden sm:flex flex-col text-left">
        <p className="text-sm font-medium text-gray-700">{currentUser.name}</p>
        <p className="text-xs text-gray-500">{currentUser.email}</p>
      </div>
    </>
  ) : (
    <>
      <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
      <div className="hidden sm:flex flex-col text-left space-y-1">
        <div className="w-24 h-3 bg-gray-200 rounded animate-pulse" />
        <div className="w-16 h-2 bg-gray-100 rounded animate-pulse" />
      </div>
    </>
  )}

  <ChevronDown
    className={`text-gray-400 ${showDropdown ? "rotate-180" : ""}`}
    size={16}
  />
</button>


            {showDropdown && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg border border-gray-200 shadow-lg py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-700">{currentUser?.name}</p>
                  <p className="text-xs text-gray-500">{currentUser?.email}</p>
                </div>
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    navigate("/admin/profile");
                  }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
                >
                  <User size={14} /> Profile Settings
                </button>
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    navigate("/admin/config");
                  }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
                >
                  <Settings size={14} /> Website Settings
                </button>
                <div className="border-t border-gray-200 mt-1 pt-1">
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      onLogout();
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <LogOut size={14} /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationHeader;
