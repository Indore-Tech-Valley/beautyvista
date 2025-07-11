import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo.png";
import { fetchConfig } from "../../redux/features/Configs/configs";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchConfig());
  }, [dispatch]);

  const config = useSelector((state) => state.config.config);
  // const logo = config.find((item) => item.key === "site_logo")?.value;

  const isHomePage = location.pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // ✅ Handle screen resize to detect mobile view
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);

    // ✅ Scroll behavior to show/hide navbar and apply background
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      setShowNavbar(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    if (window.location.hash === "#appointment") {
      const el = document.getElementById("appointment");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // ✅ Toggle hamburger menu
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // ✅ Navigate to homepage and scroll to #appointment
  const goToAppointment = () => {
    if (isHomePage) {
      const appointmentElement = document.getElementById("appointment");
      if (appointmentElement) {
        appointmentElement.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/#appointment");
    }
    setMenuOpen(false); // close mobile menu
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 ${
        scrolled || isMobile ? "bg-white shadow-md" : "bg-transparent"
      } ${showNavbar ? "translate-y-0" : "-translate-y-full"}`}
    >
      {/* ✅ Fixed height container that doesn't change regardless of logo size */}
      <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
        {/* ✅ Logo Container with fixed dimensions */}
        <Link to="/" className="flex-shrink-0">
          <div className="h-16 w-auto flex items-center justify-start">
            {logo ? (
              <img
                src={config.site_logo}
                alt="Site Logo"
                className="max-h-full max-w-full w-auto h-auto object-contain"
                style={{ maxHeight: "64px" }} // Ensures logo never exceeds container
              />
            ) : (
              <span className="text-xl font-bold text-rose-800 whitespace-nowrap">
                BeautyVista
              </span>
            )}
          </div>
        </Link>

        {/* ✅ Desktop Navigation - Fixed positioning */}
        <nav
          className={`hidden md:flex gap-8 text-md font-semibold flex-1 justify-center ${
            isHomePage || scrolled || isMobile ? "text-[#0a1d42]" : "text-white"
          }`}
        >
          <NavLink to="/" label="Home" />
          <NavLink to="/services" label="Services" />
          <NavLink to="/categories" label="Categories" />
          <NavLink to="/beautyWellnessPage" label="Beauty & Wellness" />
          <NavLink to="/workshop" label="Workshop" />
          <NavLink to="/about" label="About Us" />
          <NavLink to="/contact" label="Contact Us" />
        </nav>

        {/* ✅ Book Now Button (Desktop) - Fixed positioning */}
        <div className="hidden md:block flex-shrink-0">
          <button
            onClick={goToAppointment}
            className="relative group block text-center bg-rose-700 hover:bg-rose-800 text-white px-6 py-3 rounded-md font-semibold text-md overflow-hidden min-w-[140px] h-[48px] transition-colors duration-300 ease-in-out"
          >
            <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-full">
              Book Now
            </span>
            <span className="absolute inset-0 flex items-center justify-center transition-transform duration-300 translate-y-full group-hover:translate-y-0">
              Book Now
            </span>
          </button>
        </div>

        {/* ✅ Hamburger Icon (Mobile) - Fixed positioning */}
        <button
          className="md:hidden focus:outline-none flex-shrink-0 w-7 h-7 flex items-center justify-center"
          onClick={toggleMenu}
        >
          <svg
            className="w-7 h-7 text-rose-900"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* ✅ Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden bg-white ${
          menuOpen
            ? "max-h-screen opacity-100 pb-6 px-4 shadow-md"
            : "max-h-0 opacity-0 py-0 px-4"
        }`}
      >
        <MobileLink to="/" label="Home" onClick={() => setMenuOpen(false)} />
        <MobileLink
          to="/services"
          label="Services"
          onClick={() => setMenuOpen(false)}
        />
        <MobileLink
          to="/categories"
          label="Categories"
          onClick={() => setMenuOpen(false)}
        />
        <MobileLink
          to="/about"
          label="About Us"
          onClick={() => setMenuOpen(false)}
        />
        <MobileLink
          to="/contact"
          label="Contact Us"
          onClick={() => setMenuOpen(false)}
        />

        {/* ✅ Book Now Button (Mobile) */}
        <div className="mt-6">
          <button
            onClick={goToAppointment}
            className="w-full bg-rose-900 text-white px-5 py-3 rounded-md font-semibold hover:bg-[#75584f] transition"
          >
            Book Now
          </button>
        </div>
      </div>
    </header>
  );
};

// ✅ Reusable Desktop NavLink
const NavLink = ({ to, label }) => (
  <Link to={to} className="relative group whitespace-nowrap">
    <span className="transition-colors duration-600">{label}</span>
    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-rose-700 transition-all duration-300 group-hover:w-full"></span>
  </Link>
);

// ✅ Reusable Mobile NavLink
const MobileLink = ({ to, label, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="block py-3 text-[#0a1d42] font-medium"
  >
    {label}
  </Link>
);

export default Navbar;
