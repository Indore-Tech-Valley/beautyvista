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
  RefreshCw,
  Wifi,
  WifiOff,
  AlertCircle,
  Info,
  CheckCircle,
  AlertTriangle,
  Clock,
  Eye,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNotifications,
   deleteNotificationById,
  deleteAllNotificationsFromServer,
  markNotificationAsRead,
  markAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  clearAllNotifications,
  startNotificationListener,
  setConnectionStatus,
} from "../../../redux/features/notificationSlice/notificationSlice";
import { adminFetchContacts } from "../../../redux/features/contactFormSlice/contactFormSlice";
import { useNavigate } from "react-router-dom";
import { adminFetchAppointments } from "../../../redux/features/appointmentSlice/appointmentSlice";

const NavigationHeader = ({ currentUser, onLogout, onNavigate }) => {
  const navigate = useNavigate();

  const defaultTitle = "BeautyVista"; // Change to your real site title

  const listenerStarted = useRef(false);
  const dispatch = useDispatch();
  const { notifications, connectionStatus, loading, error } = useSelector(
    (state) => state.notifications
  );

  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);

  const { services } = useSelector((state) => state.services);

  // Helper to get service name by ID
  const getServiceNameById = (id) => {
    const found = services.find((s) => String(s.id) === String(id));
    return found?.name || "N/A";
  };

  useEffect(() => {
    const unreadCount = notifications.filter((n) => !n.isRead).length;

    if (unreadCount > 0 && !showNotifications) {
      // Show persistent unread title while notification panel is closed
      document.title = `🔔 (${unreadCount}) New Notifications`;
    } else {
      // Revert title to default once user opens the notification panel
      document.title = defaultTitle;
    }
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
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setShowDropdown(false);
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target)
      )
        setShowNotifications(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "alert":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getNotificationBorder = (type) => {
    switch (type) {
      case "success":
        return "border-l-4 border-green-500";
      case "alert":
        return "border-l-4 border-yellow-500";
      case "error":
        return "border-l-4 border-red-500";
      default:
        return "border-l-4 border-blue-500";
    }
  };

  return (
    <div className="bg-white px-4 py-3 sticky top-0 z-30 border-gray-200">
      <div className="flex items-center justify-between">
        <div>{/* Logo */}</div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <div>Web Socket Status:</div>
            <div
              className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                connectionStatus === "Connected"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {connectionStatus === "Connected" ? (
                <Wifi className="w-3 h-3" />
              ) : (
                <WifiOff className="w-3 h-3" />
              )}
              {connectionStatus}
            </div>
          </div>

          <div className="relative" ref={notificationRef}>
            <button
              onClick={() => setShowNotifications((prev) => !prev)}
              className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              {unreadCount > 0 ? (
                <BellRing size={20} className="text-blue-600" />
              ) : (
                <Bell size={20} />
              )}
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-[50vw] max-h-96 bg-white rounded-lg border border-gray-200 shadow-lg z-50">
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
                  ) : (
                    // ) : [...notifications].map(notification => (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`bg-white rounded-lg shadow-sm transition-all duration-300 hover:shadow-md ${getNotificationBorder(
                          notification.type
                        )}`}
                      >
                        <div className="p-3">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start space-x-2 flex-1 min-w-0">
                              {getNotificationIcon(notification.type)}
                              <div className="flex-1 min-w-0">
                                {/* Title + Time */}
                                <div className="flex justify-between items-center">
                                  <h4 className="text-sm font-medium text-gray-900 truncate">
                                    {notification.source === "contact_form"
                                      ? `New Contact Query from ${notification.name}`
                                      : notification.source ===
                                        "booking_appointment_form"
                                      ? `New Appointment from ${notification.name}`
                                      : `Notification from ${notification.name}`}
                                  </h4>
                                  <div className="flex items-center text-xs text-gray-500 ml-2">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {notification.timestamp}
                                  </div>
                                </div>

                                {/* Message */}
                                {notification.message && (
                                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                                    {notification.message}
                                  </p>
                                )}

                                {/* Appointment Extra Fields */}
                                {notification.source === "booking_appointment_form" && (
  <div className="text-xs text-gray-600 mt-2 space-y-0.5">
    <p>
      <span className="font-medium">Service:</span>{" "}
      {getServiceNameById(notification.service_id)}
    </p>
    <p>
      <span className="font-medium">Appointment Date:</span>{" "}
      {notification.appointment_date || "N/A"}
    </p>
    <p>
      <span className="font-medium">Appointment Time:</span>{" "}
      {notification.appointment_time || "N/A"}
    </p>
  </div>
)}

                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col gap-1 ml-2">
                              <button
                                onClick={() => {
                                  dispatch(markNotificationAsRead(notification.id));
dispatch(markAsRead(notification.id)); // For local state update

                                  if (notification.source === "contact_form") {
                                    // dispatch(fetchAllContactForms());
                                    dispatch(adminFetchContacts());
                                    navigate(
                                      `/admin/contactforms/${notification.dataId}`
                                    );
                                  } else if (
                                    notification.source ===
                                    "booking_appointment_form"
                                  ) {
                                    dispatch(adminFetchAppointments());
                                    navigate(
                                      `/admin/appointments/${notification.dataId}`
                                    );
                                  }
                                }}
                                className="p-1 rounded-full hover:bg-blue-100"
                                title="View details"
                              >
                                <Eye className="w-4 h-4 text-blue-500" />
                              </button>

                              <button
                                onClick={() =>
                                 dispatch(deleteNotificationById(notification.id))

                                }
                                className="p-1 rounded-full hover:bg-gray-100"
                                title="Delete"
                              >
                                <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
            >
              <img
                src={currentUser.avatar || "/placeholder.jpg"}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="hidden sm:flex flex-col text-left">
                <p className="text-sm font-medium text-gray-700">
                  {currentUser.name}
                </p>
                <p className="text-xs text-gray-500">{currentUser.role}</p>
              </div>
              <ChevronDown
                className={`text-gray-400 ${showDropdown ? "rotate-180" : ""}`}
                size={16}
              />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg border border-gray-200 shadow-lg py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-700">
                    {currentUser.name}
                  </p>
                  <p className="text-xs text-gray-500">{currentUser.email}</p>
                </div>
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    onNavigate("/admin/profile");
                  }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
                >
                  <User size={14} /> Profile Settings
                </button>
                <button
                  onClick={() => {
                    setShowDropdown(false);
                    onNavigate("/admin/settings");
                  }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
                >
                  <Settings size={14} /> App Settings
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
