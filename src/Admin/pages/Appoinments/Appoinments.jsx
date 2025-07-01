import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, X, Check, User, Clock, Phone } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import {
  adminFetchAppointments,
  deleteAppointment,
  updateAppointmentStatus
} from '../../../redux/features/appointmentSlice/appointmentSlice';
import AddButton from '../../components/AddButton/AddButton';
import { useParams } from "react-router-dom";
import { useRef } from "react";
import { useLayoutEffect } from "react";

const Appointments = () => {
const services = useSelector((state) => state.services?.services || []);


const getServiceNameById = (id) => {
  const service = services.find((s) => s.id === id);
  return service ? service.name : 'Unknown Service';
};


  const dispatch = useDispatch();

  const selectAppointments = (state) => state.appointments?.appointments ?? [];
  const selectLoading = (state) => state.appointments?.loading;
  const selectError = (state) => state.appointments?.error;

  const appointments = useSelector(selectAppointments);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const [showAddForm, setShowAddForm] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');

    const { id: appointmentIdFromURL } = useParams();
  const appointmentRefs = useRef({});
  
// FIX useLayoutEffect
useEffect(() => {
  if (appointmentIdFromURL && appointmentRefs.current[appointmentIdFromURL]) {
    setTimeout(() => {
      appointmentRefs.current[appointmentIdFromURL]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  }
}, [appointmentIdFromURL, appointments]);




  useEffect(() => {
    dispatch(adminFetchAppointments());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      dispatch(deleteAppointment(id));
    }
  };

  // Filter appointments by status
  const filteredAppointments =
    statusFilter === 'all'
      ? appointments
      : appointments.filter((a) => a.status === statusFilter);


      const formatDateTime = (isoString) => {
  if (!isoString) return '';
  const date = new Date(isoString);

  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0'); // months start from 0
  const dd = String(date.getDate()).padStart(2, '0');

  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');

  return `${yyyy}-${mm}-${dd} at ${hh}:${min}`;
};


  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Appointments Management</h1>
        <AddButton
          label="New Appointment"
          isOpen={showAddForm}
          onClick={() => setShowAddForm(!showAddForm)}
        />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border shadow-sm">
        <div className="p-4 border-b">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="relative w-full sm:w-1/2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search appointments..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <select
              className="w-full sm:w-1/3 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Service ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Date & Time</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Message</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">created_at</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">updated_at</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td className="px-6 py-4" colSpan="6">
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td className="px-6 py-4 text-red-500" colSpan="6">
                    {error}
                  </td>
                </tr>
              ) : filteredAppointments.length === 0 ? (
                <tr>
                  <td className="px-6 py-4 text-gray-500" colSpan="6">
                    No appointments found.
                  </td>
                </tr>
              ) : (
                filteredAppointments.map((appointment) => (
               <tr
  key={appointment.id}
  ref={(el) => (appointmentRefs.current[appointment.id] = el)}
  className={`hover:bg-gray-50 transition ${
    appointment.id === appointmentIdFromURL
      ? 'bg-yellow-100 ring-2 ring-yellow-300 rounded-md'
      : ''
  }`}
>



                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <User className="text-gray-400 mr-2" size={16} />
                        <span className="font-medium text-gray-900">{appointment.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{getServiceNameById(appointment.service_id)}</td>

                    <td className="px-6 py-4 text-gray-600">
                      <div className="flex items-center">
                        <Clock className="mr-1" size={14} />
                        {appointment.appointment_date} at {appointment.appointment_time}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      <div className="flex items-center">
                        <Phone className="mr-1" size={14} />
                        {appointment.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{appointment.message}</td>
                    <td className="px-6 py-4">
                      <select
                        value={appointment.status}
                        onChange={(e) =>
                          dispatch(
                            updateAppointmentStatus({ id: appointment.id, status: e.target.value })
                          )
                        }
                        className="border rounded px-2 py-1 text-sm"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    
                <td>{formatDateTime(appointment.created_at)}</td>
<td>{formatDateTime(appointment.updated_at)}</td>


                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="text-green-600 hover:text-green-800" title="Confirm">
                          <Check size={16} />
                        </button>
                        <button className="text-blue-600 hover:text-blue-800" title="Edit">
                          <Edit size={16} />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800"
                          title="Delete"
                          onClick={() => handleDelete(appointment.id)}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Appointments;