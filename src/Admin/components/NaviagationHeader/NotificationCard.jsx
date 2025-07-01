// NotificationCard.jsx
import React from 'react';
import { Clock, Eye, X, Mail, Calendar, Bell, User, MessageCircle } from 'lucide-react';

const getNotificationIcon = (type) => {
  const iconClass = "w-5 h-5 flex-shrink-0";
  switch (type) {
    case 'contact':
      return <Mail className={`${iconClass} text-blue-500`} />;
    case 'appointment':
      return <Calendar className={`${iconClass} text-green-500`} />;
    default:
      return <Bell className={`${iconClass} text-gray-500`} />;
  }
};

const getNotificationBorder = (type) => {
  switch (type) {
    case 'contact':
      return 'border-l-4 border-blue-400';
    case 'appointment':
      return 'border-l-4 border-green-400';
    default:
      return 'border-l-4 border-gray-300';
  }
};

const getNotificationBackground = (type, isRead) => {
  if (isRead) return 'bg-gray-50';
  switch (type) {
    case 'contact':
      return 'bg-blue-50/50';
    case 'appointment':
      return 'bg-green-50/50';
    default:
      return 'bg-white';
  }
};

const NotificationCard = ({ notification, onView, onDelete }) => {
  return (
    <div
      className={`
        relative bg-white rounded-xl shadow-sm transition-all duration-300 
        hover:shadow-lg hover:scale-[1.01] transform
        ${getNotificationBorder(notification.type)}
        ${getNotificationBackground(notification.type, notification.isRead)}
        ${!notification.isRead ? 'ring-2 ring-blue-100' : ''}
      `}
    >
      {!notification.isRead && (
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
      )}

      <div className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4 flex-1 min-w-0">
            <div
              className={`p-2 rounded-full flex-shrink-0 ${
                notification.type === 'contact'
                  ? 'bg-blue-100'
                  : notification.type === 'appointment'
                  ? 'bg-green-100'
                  : 'bg-gray-100'
              }`}
            >
              {getNotificationIcon(notification.type)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <h4
                    className={`text-base font-semibold truncate ${
                      notification.isRead ? 'text-gray-700' : 'text-gray-900'
                    }`}
                  >
                    {notification.source === 'contact_form'
                      ? `New Contact Query`
                      : notification.source === 'booking_appointment_form'
                      ? `New Appointment Request`
                      : `Notification`}
                  </h4>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      notification.type === 'contact'
                        ? 'bg-blue-100 text-blue-800'
                        : notification.type === 'appointment'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {notification.type}
                  </span>
                </div>

                <div className="flex items-center text-xs text-gray-500 space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{notification.timestamp}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 mb-3">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-800">
                  {notification.name || 'Unknown'}
                </span>
              </div>

              <div className="mb-3">
                <div className="flex items-start space-x-2">
                  <MessageCircle className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {notification.message}
                  </p>
                </div>
              </div>

              {notification.source === 'booking_appointment_form' && (
                <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                  <h5 className="text-sm font-medium text-green-800 mb-2">Appointment Details</h5>
                  <div className="grid grid-cols-2 gap-3 text-xs text-green-700">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-3 h-3" />
                      <span>Service: {notification.service_id || 'N/A'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-3 h-3" />
                      <span>Date: {notification.appointment_date || 'N/A'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-3 h-3" />
                      <span>Time: {notification.appointment_time || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2 ml-4">
            <button
              onClick={() => onView(notification)}
              className="group p-2 rounded-full hover:bg-blue-100 hover:scale-110 transition"
              title="View"
            >
              <Eye className="w-4 h-4 text-blue-500 group-hover:text-blue-600" />
            </button>
            <button
              onClick={() => onDelete(notification.id)}
              className="group p-2 rounded-full hover:bg-red-100 hover:scale-110 transition"
              title="Delete"
            >
              <X className="w-4 h-4 text-gray-400 group-hover:text-red-500" />
            </button>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 hover:opacity-10 transition-opacity duration-300 rounded-xl pointer-events-none"></div>
    </div>
  );
};

export default NotificationCard;