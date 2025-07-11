import React, { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../../redux/features/servicesSlice/servicesSlice";
import { addAppointment } from "../../redux/features/appointmentSlice/appointmentSlice";
import { toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { fetchConfig } from "../../redux/features/Configs/configs";
import MessageModal from "../MessageModal/MessageModal";

const Appointment = () => {
  const dispatch = useDispatch();
  const config = useSelector((state) => state.config?.config || {});

  const { services = [], loading } = useSelector(
    (state) => state.services || {}
  );
  const [booking, setBooking] = useState(false);

  const [modal, setModal] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const openModal = (type, message) => {
    setModal({ show: true, type, message });
  };

  const closeModal = () => {
    setModal({ ...modal, show: false });
  };

  const [formData, setFormData] = useState({
    service_id: "",
    appointment_date: new Date().toISOString().split("T")[0],
    appointment_time: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const location = useLocation(); // <-- Put this at the top of the Appointment component

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const serviceId = params.get("serviceId");

    if (serviceId && services.length > 0) {
      const exists = services.find((s) => String(s.id) === serviceId);
      if (exists) {
        setFormData((prev) => ({ ...prev, service_id: serviceId }));
      }
    }

    const handleServiceSelect = (e) => {
      if (e.detail) {
        setFormData((prev) => ({ ...prev, service_id: e.detail }));
      }
    };

    window.addEventListener("select-service", handleServiceSelect);
    return () =>
      window.removeEventListener("select-service", handleServiceSelect);
  }, [location.search, services]); // ✅ <-- This is the key update!

  useEffect(() => {
    dispatch(fetchServices());
    dispatch(fetchConfig()); // Fetch configuration from backend
  }, [dispatch]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     if (!formData.service_id || !formData.name || !formData.email || !formData.phone || !formData.appointment_time) {
  //       toast.error("Please fill in all required fields.");
  //       return;
  //     }

  //     // // Convert selected time to ISO string
  //     // const appointmentDateTime = new Date(formData.appointment_date);
  //     // const [time, meridiem] = formData.appointment_time.split(" ");
  //     // let [hours, minutes] = time.split(":").map(Number);

  //     // if (meridiem === "PM" && hours < 12) hours += 12;
  //     // if (meridiem === "AM" && hours === 12) hours = 0;
  //     // appointmentDateTime.setHours(hours, minutes, 0, 0);

  //       // Convert time string like "12:30 PM" to hours and minutes
  // const [timeStr, meridiem] = formData.appointment_time.split(" ");
  //   let [hours, minutes] = timeStr.split(":").map(Number);

  //   if (meridiem === "PM" && hours < 12) hours += 12;
  //   if (meridiem === "AM" && hours === 12) hours = 0;

  //   // Combine date and time into one Date object
  // const dateObj = new Date(formData.appointment_date);
  //   dateObj.setHours(hours, minutes, 0, 0);

  //     const payload = {
  //       ...formData,
  //       appointment_time: dateObj.toISOString()
  //     };

  //     try {
  //       console.log(payload)
  //       await dispatch(addAppointment(payload)).unwrap();
  //       toast.success("Appointment booked successfully!");

  //       setFormData({
  //         service_id: "",
  //         appointment_date: new Date().toISOString().split("T")[0],
  //         appointment_time: "",
  //         name: "",
  //         email: "",
  //         phone: "",
  //         message: "",
  //       });
  //     } catch (err) {
  //       toast.error(err?.message || "Failed to book appointment.");
  //     }
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (booking) return; // prevent double submit
    setBooking(true);

    const {
      service_id,
      name,
      email,
      phone,
      appointment_date,
      appointment_time,
      message,
    } = formData;

    if (
      !service_id ||
      !name ||
      !email ||
      !phone ||
      !appointment_time ||
      !appointment_date
    ) {
      // toast.error("Please fill in all required fields.");
      setBooking(false);
      return;
    }

    // Convert "12:30 PM" → "12:30:00"
    const [timeStr, meridiem] = appointment_time.split(" ");
    let [hours, minutes] = timeStr.split(":").map(Number);

    if (meridiem === "PM" && hours < 12) hours += 12;
    if (meridiem === "AM" && hours === 12) hours = 0;

    const formattedTime = `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:00`;

    const payload = {
      service_id,
      name,
      email,
      phone,
      appointment_date,
      appointment_time: formattedTime,
      message,
    };

    try {
      const res = await dispatch(addAppointment(payload)).unwrap();
      console.log(res.message) 
     openModal("success", res.message || "Appointment booked !");

      // Reset form
      setFormData({
        service_id: "",
        appointment_date: new Date().toISOString().split("T")[0],
        appointment_time: "",
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (err) {
      // console.error(err);
      openModal("error", err || "Failed to book appointment");
    } finally {
      setBooking(false);
    }
  };

  useEffect(() => {
    if (window.location.hash === "#appointment") {
      const el = document.getElementById("appointment");
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
      }
    }
  }, []);

  return (
    <div className="lg:py-8 py-6">
      <section className="max-w-7xl mx-auto px-6">
        {modal.show && (
        <MessageModal
          type={modal.type}
          message={modal.message}
          onClose={closeModal}
        />
      )}
        <div className="md:flex md:items-start md:gap-8">
          {/* Form */}

          <div className="md:w-1/2  bg-white rounded-2xl p-3 lg:p-6 shadow min-h-[480px] flex flex-col justify-between lg:h-[800px] md:h-[780px] sm:h-full">
            <div>
              {/* <h2 className="text-4xl font-bold text-rose-700 mb-2">Book Your Appointment</h2> */}
              <h2 className="text-4xl font-bold text-rose-700 mb-2">
                {config.booking_appointment_title}
              </h2>

              {/* <p className="mb-6 text-gray-500">At BeautyVista, we believe that true beauty lies in confidence, and confidence begins with self-care. Nestled in the heart of the city, BeautyVista is your premium destination for rejuvenation and transformation. Whether you're preparing for a special occasion or simply indulging in a well-deserved treat, our expert professionals are here to help you look and feel your absolute best.</p>
               */}
              <p className="mb-6 text-gray-500">
                {config.booking_appointment_description}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Service */}
                <div>
                  <label
                    htmlFor="service_id"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Select Service
                  </label>
                  <select
                    id="service_id"
                    value={formData.service_id}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-md px-4 py-3"
                  >
                    <option value="">Select Service</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name} (
                        {service.price ? `₹${service.price}` : "₹0"})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date & Time */}
                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label
                      htmlFor="appointment_date"
                      className="block mb-1 font-medium text-gray-700"
                    >
                      Date
                    </label>
                    <input
                      id="appointment_date"
                      type="date"
                      value={formData.appointment_date}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md p-3"
                      required
                    />
                  </div>
                  <div className="w-1/2">
                    <label
                      htmlFor="appointment_time"
                      className="block mb-1 font-medium text-gray-700"
                    >
                      Time
                    </label>
                    <select
                      id="appointment_time"
                      value={formData.appointment_time}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md p-3"
                      required
                    >
                      <option value="">Select Time</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="12:30 PM">12:30 PM</option>
                      <option value="3:00 PM">3:00 PM</option>
                      <option value="5:30 PM">5:30 PM</option>
                    </select>
                  </div>
                </div>

                {/* Contact Details */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {["name", "email", "phone"].map((field) => (
                    <div key={field}>
                      <label
                        htmlFor={field}
                        className="block mb-1 font-medium text-gray-700"
                      >
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <input
                        id={field}
                        type={
                          field === "email"
                            ? "email"
                            : field === "phone"
                            ? "tel"
                            : "text"
                        }
                        value={formData[field]}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-3"
                        required
                      />
                    </div>
                  ))}
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows="3"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md p-3"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={booking}
                  className="lg:w-full relative group block w-full text-center bg-rose-700 hover:bg-rose-800 text-white px-6 py-4 rounded-lg font-semibold text-md overflow-hidden min-w-[160px] h-[50px] transition-colors duration-300 ease-in-out"
                >
                  <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-full">
                    {booking ? (
                      <>
                        <FaSpinner className="animate-spin h-5 w-5 mr-2" />
                        Booking...
                      </>
                    ) : (
                      <>Book Now</>
                    )}
                  </span>
                  <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 translate-y-full group-hover:translate-y-0">
                    {booking ? (
                      <>
                        <FaSpinner className="animate-spin h-5 w-5 mr-2" />
                        Booking...
                      </>
                    ) : (
                      <>Book Now</>
                    )}
                  </span>
                </button>
              </form>
            </div>
          </div>

          {/* Image */}
          <div className="md:w-1/2 mt-10 md:mt-0 relative rounded-2xl overflow-hidden shadow lg:h-[800px] md:h-[780px] sm:h-full">
            <img
              src="https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg"
              alt="BeautyVista"
              className="w-full h-full object-cover rounded-2xl"
            />
            <div className="absolute bottom-6 left-6 bg-black/60 text-white rounded-xl px-6 py-4 flex items-center gap-4 backdrop-blur-sm shadow-lg">
              <Clock className="w-6 h-6 text-white" />
              <div>
                <p className="font-bold text-lg">Opening Hours</p>
                {/* <p className="text-sm text-white/80">Mon to Sun 09:00 - 21:00</p> */}
                <p className="text-sm text-white/80">{config.opening_hour}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Appointment;
