import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Clock,
  Phone,
  User,
  Calendar,
  MessageCircle,
  Trash2,
  ChevronDown,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  adminFetchAppointments,
  deleteAppointment,
  updateAppointmentStatus,
} from "../../../redux/features/appointmentSlice/appointmentSlice";
import AddButton from "../../components/AddButton/AddButton";
import { useParams , useNavigate} from "react-router-dom";
import { adminFetchServices } from "../../../redux/features/servicesSlice/servicesSlice";
import DeleteModal from "../../components/DeleteModal/deleteModal";
import MessageModal from "../../../components/MessageModal/MessageModal";

const Appointments = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const services = useSelector((state) => state.services?.services || []);
  const appointments = useSelector(
    (state) => state.appointments?.appointments ?? []
  );
  const loading = useSelector((state) => state.appointments?.loading);
  const error = useSelector((state) => state.appointments?.error);

  const [modal, setModal] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const openModal = (type, message) => {
    setModal({ show: true, type, message });
    setTimeout(() => {
      setModal((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  const closeModal = () => setModal({ ...modal, show: false });

  const [updatingStatusId, setUpdatingStatusId] = useState(null);

  const [highlightedId, setHighlightedId] = useState(null);


  const [showAddForm, setShowAddForm] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);

  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const formatDate = (date) => new Date(date).toLocaleString();

  const { id: appointmentIdFromURL } = useParams();
  const appointmentRefs = useRef({});

  const formatDateTime = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  const getServiceById = (id) => services.find((s) => s.id === id);

  const getStatusColor = (status) => {
    const colors = {
      confirmed: "bg-green-100 text-green-800 border-green-200",
      pending: "bg-amber-100 text-amber-800 border-amber-200",
      completed: "bg-blue-100 text-blue-800 border-blue-200",
      cancelled: "bg-red-100 text-red-800 border-red-200",
    };
    return colors[status] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const handleDelete = (appointment) => {
    setAppointmentToDelete(appointment);
    setShowDeleteModal(true);
  };

  const handleStatusChange = async (appointmentId, newStatus) => {
    setUpdatingStatusId(appointmentId);
    try {
      const res = await dispatch(
        updateAppointmentStatus({ id: appointmentId, status: newStatus })
      ).unwrap();
      openModal("success", `Status updated to ${newStatus}`);
      dispatch(adminFetchAppointments());
    } catch (err) {
      openModal("error", err || "Failed to update status");
    } finally {
      setUpdatingStatusId(null);
    }
  };

  const confirmDeleteAppointment = async () => {
    try {
      const res = await dispatch(
        deleteAppointment(appointmentToDelete.id)
      ).unwrap();
      openModal("success", res?.message || "Appointment deleted successfully");
      dispatch(adminFetchAppointments());
    } catch (err) {
      openModal("error", err?.message || "Failed to delete appointment");
    } finally {
      setShowDeleteModal(false);
      setAppointmentToDelete(null);
    }
  };

  useEffect(() => {
    if (appointments.length <= 0) {
      dispatch(adminFetchServices());
      dispatch(adminFetchAppointments());
    }
  }, [dispatch]);


useEffect(() => {
  if (!appointmentIdFromURL || appointments.length === 0) return;

  setHighlightedId(appointmentIdFromURL); // Set for UI highlight

  const targetRef = appointmentRefs.current[appointmentIdFromURL];

  if (targetRef) {
    targetRef.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  // Remove ID from URL after short delay
  const cleanURL = setTimeout(() => {
    navigate("/admin/appointments", { replace: true });
  }, 500); // Short delay is fine

  // Remove highlight after a longer delay
  const removeHighlight = setTimeout(() => {
    setHighlightedId(null);
  }, 2000);

  return () => {
    clearTimeout(cleanURL);
    clearTimeout(removeHighlight);
  };
}, [appointmentIdFromURL, appointments, navigate]);




  // useEffect(() => {
  //   if (appointmentIdFromURL && appointmentRefs.current[appointmentIdFromURL]) {
  //     setTimeout(() => {
  //       appointmentRefs.current[appointmentIdFromURL]?.scrollIntoView({
  //         behavior: "smooth",
  //         block: "center",
  //       });
  //     }, 100);
  //   }
  // }, [appointmentIdFromURL, appointments]);

  

  const filteredAppointments =
    statusFilter === "all"
      ? appointments
      : appointments.filter((a) => a.status === statusFilter);

  return (
    <div className=" px-4 lg:px-8 py-4">
      {modal.show && (
        <MessageModal
          type={modal.type}
          message={modal.message}
          onClose={closeModal}
        />
      )}

      {showDeleteModal && appointmentToDelete && (
        <DeleteModal
          message={`Are you sure you want to delete the appointment for "${appointmentToDelete.name}"?`}
          onConfirm={confirmDeleteAppointment}
          onCancel={() => {
            setShowDeleteModal(false);
            setAppointmentToDelete(null);
          }}
        />
      )}
{/* 
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
        <AddButton
          label="New Appointment"
          isOpen={showAddForm}
          onClick={() => setShowAddForm(!showAddForm)}
        />
      </div> */}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
  <h1 className="text-3xl font-bold text-gray-900 mb-4">All Appointments</h1>
  {/* <AddButton
    label="Add Service"
    isOpen={showAddForm}
    onClick={() => setShowAddForm(!showAddForm)}
  /> */}
</div>


      {/* Filter */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 px-4 py-4 mb-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h3 className="text-base font-semibold text-gray-800">
            Filter by Status:
          </h3>
          <div className="flex flex-wrap gap-2">
            {["all", "pending", "confirmed", "completed", "cancelled"].map(
              (status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-2 rounded-full text-xs font-medium transition-all ${
                    statusFilter === status
                      ? getStatusColor(status)
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Cards */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-gray-600 mt-2">Loading appointments...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      ) : filteredAppointments.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-500">No appointments found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAppointments.map((appointment) => {
            const service = getServiceById(appointment.service_id);
            return (
              <div
                onClick={() => {
                  setSelectedAppointment(appointment);
                  setShowViewModal(true);
                }}
                key={appointment.id}
                ref={(el) => (appointmentRefs.current[appointment.id] = el)}
                className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border ${
                 appointment.id === highlightedId

                    ? "ring-2 ring-blue-500 border-blue-500"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {/* Image */}
                <div className="relative h-40 bg-gray-100">
                  {service?.images?.[0] ? (
                    <img
                      src={service.images[0]}
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                      <Calendar size={32} />
                    </div>
                  )}

                  {/* Status Badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`bg-pink-600 text-white px-3 py-2 rounded-full text-sm font-medium   ${getStatusColor(
                        appointment.status
                      )}`}
                    >
                      {appointment.status?.charAt(0).toUpperCase() +
                        appointment.status?.slice(1) || "Unknown"}
                    </span>
                  </div>

                  {/* Price */}
                  {service?.price && (
                    <div className="absolute top-3 right-3">
                      <span className="bg-white/95 backdrop-blur-sm px-2 py-1 rounded-lg text-sm font-semibold text-gray-800 shadow-sm">
                        ₹{service.price}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  {/* Client Info */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <User size={16} className="text-gray-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {appointment.name}
                      </h3>
                      <p className="text-sm text-gray-600 truncate">
                        {service?.name || "Unknown Service"}
                      </p>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-3 text-sm">
                      <Clock
                        size={16}
                        className="text-gray-500 flex-shrink-0"
                      />
                      <span className="text-gray-700">
                        {appointment.appointment_date} at{" "}
                        {appointment.appointment_time}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                      <Phone
                        size={16}
                        className="text-gray-500 flex-shrink-0"
                      />
                      <span className="text-gray-700">{appointment.phone}</span>
                    </div>

                    {appointment.message && (
                      <div className="flex items-start gap-3 text-sm">
                        <MessageCircle
                          size={16}
                          className="text-gray-500 mt-0.5 flex-shrink-0"
                        />
                        <p className="text-gray-700 bg-gray-50 p-2 rounded text-xs leading-relaxed line-clamp-1">
                          {appointment.message}
                        </p>
                      </div>
                    )}
                     {/* status Change */}
            <div className="relative w-max">
<div className="relative w-max">
  <div className="flex items-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-full px-3 py-1 w-max">
    <select
      value={appointment.status}
      onClick={(e) => e.stopPropagation()}
      onChange={(e) => handleStatusChange(appointment.id, e.target.value)}
      className="bg-transparent text-white text-sm font-medium appearance-none pr-6 pl-2 py-1 focus:outline-none cursor-pointer"
      disabled={updatingStatusId === appointment.id}
    >
      {["pending", "confirmed", "completed", "cancelled"].map((status) => (
        <option key={status} value={status} className="text-black">
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </option>
      ))}
    </select>

    {/* Chevron inside the same relative container */}
    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white w-4 h-4 pointer-events-none" />
  </div>
</div>


  {updatingStatusId === appointment.id && (
    <span className="absolute right-0 -bottom-5 text-xs text-white/80">
      Updating...
    </span>
  )}
</div>


                  </div>

                  {/* Footer */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-3 border-t border-gray-100 gap-2">
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <Clock size={14} className="text-gray-400" />
                      <span>
                        {appointment.appointment_date} at{" "}
                        {appointment.appointment_time}
                      </span>
                    </div>
                    <div className="flex items-center justify-end">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(appointment);
                        }}
                        className="text-red-600 hover:text-red-800 px-2 py-1 rounded-md transition-colors hover:bg-red-50 flex items-center gap-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                 
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showViewModal && selectedAppointment && (
        <div className="fixed p-4 inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-center items-center ">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 sm:px-6 py-4 sm:py-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                    Appointment Details
                  </h1>
                  <div className="flex flex-wrap gap-2 text-purple-100 text-sm sm:text-base">
                    <span className="flex items-center gap-1 bg-white/90 px-3 py-1 rounded-md text-sm font-semibold text-gray-800">
                      Name: {selectedAppointment.name}
                    </span>
                    <span className="flex items-center gap-1 bg-white/90 px-3 py-1 rounded-md text-sm font-semibold text-gray-800">
                      Status:{" "}
                      <span
                        className={`font-semibold ${
                          selectedAppointment.status === "pending"
                            ? "text-yellow-600"
                            : selectedAppointment.status === "confirmed"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {selectedAppointment.status}
                      </span>
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="bg-white/20 hover:bg-white/30 text-white px-3 py-2 rounded-full transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-4 sm:p-6 space-y-6 sm:space-y-8 text-sm sm:text-base">
              {/* Basic Info */}
              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  Client Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-700">Name</p>
                    <p>{selectedAppointment.name}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Email</p>
                    <p>{selectedAppointment.email}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Phone</p>
                    <p>{selectedAppointment.phone}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Service ID</p>
                    <p className="font-mono break-words">
                      {selectedAppointment.service_id}
                    </p>
                  </div>
                </div>
              </section>

              {/* Appointment Time */}
              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  Appointment Schedule
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-700">Date</p>
                    <p>{selectedAppointment.appointment_date}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Time</p>
                    <p>{selectedAppointment.appointment_time}</p>
                  </div>
                </div>
              </section>

              {/* Message */}
              {selectedAppointment.message && (
                <section>
                  <h2 className="text-xl font-bold text-gray-800 mb-3">
                    Message
                  </h2>
                  <p className="text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg">
                    {selectedAppointment.message}
                  </p>
                </section>
              )}

              {/* Metadata */}
              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-3">
                  Metadata
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-700">
                      Appointment ID
                    </p>
                    <p className="font-mono break-words">
                      {selectedAppointment.id}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Created At</p>
                    <p>{formatDate(selectedAppointment.created_at)}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-700">Updated At</p>
                    <p>{formatDate(selectedAppointment.updated_at)}</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
