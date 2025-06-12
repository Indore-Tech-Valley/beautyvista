import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/Logo.png';
import { useLocation } from 'react-router-dom'; // Add this


const Navbar = () => {
  const location = useLocation(); // Get current route
  const isHomePage = location.pathname === '/'; // Check if we're on the home page


  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      setShowNavbar(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        scrolled || isMobile ? 'bg-white shadow-md' : 'bg-transparent'
      } ${showNavbar ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <div className="flex items-center gap-2">
            <img src={logo} alt="BeautyVista Logo" className="h-8 w-auto object-contain" />
          </div>
        </Link>

        {/* Old Logo (commented out) */}
        {/*
        <Link to="/">
          <div className="flex items-center gap-2">
            <BiLeaf className="text-rose-700 text-4xl" />
            <h2 className="text-xl font-semibold tracking-wide text-rose-900">BeautyVista</h2>
          </div>
        </Link>
        */}

        {/* Desktop Nav */}
       <nav
  className={`hidden md:flex gap-8 text-md font-light ${
    isHomePage || scrolled || isMobile ? 'text-[#0a1d42]' : 'text-white'
  }`}
>
          <NavLink to="/" label="Home" />
          <NavLink to="/services" label="Services" />
          <NavLink to="/categories" label="Categories" />
          <NavLink to="/about" label="About Us" />
        </nav>

        {/* Desktop Book Now Button */}
        <div className="hidden md:block">
          <button 
            onClick={() => {
              const appointmentElement = document.getElementById('appointment');
              if (appointmentElement) {
                appointmentElement.scrollIntoView({ behavior: 'smooth' });
              }
            }} 
            className="bg-rose-900 text-white px-5 py-2 rounded-md font-medium hover:bg-[#75584f] transition"
          >
            Book Now
          </button>
        </div>

        {/* Hamburger Menu */}
        <button className="md:hidden focus:outline-none" onClick={toggleMenu}>
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
              d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Nav */}
      <div
        className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${
          menuOpen ? 'max-h-screen opacity-100 pb-6 px-4 ' : 'max-h-0 opacity-0 py-0 px-4'
        }`}
      >
        <MobileLink to="/" label="Home" onClick={() => setMenuOpen(false)} />
        <MobileLink to="/services" label="Services" onClick={() => setMenuOpen(false)} />
        <MobileLink to="/categories" label="Categories" onClick={() => setMenuOpen(false)} />
        <MobileLink to="/about" label="About Us" onClick={() => setMenuOpen(false)} />

        {/* Book Now inside Mobile Menu */}
        <div className="mt-6">
          <button 
            onClick={() => {
              setMenuOpen(false);
              const appointmentElement = document.getElementById('appointment');
              if (appointmentElement) {
                appointmentElement.scrollIntoView({ behavior: 'smooth' });
              }
            }} 
            className="w-full bg-rose-900 text-white px-5 py-3 rounded-md font-semibold hover:bg-[#75584f] transition"
          >
            Book Now
          </button>
        </div>
      </div>
    </header>
  );
};

const NavLink = ({ to, label }) => (
  <Link to={to} className="relative group">
    <span className="transition-colors duration-300">{label}</span>
    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#8d6e63] transition-all duration-300 group-hover:w-full"></span>
  </Link>
);

const MobileLink = ({ to, label, onClick }) => (
  <Link to={to} onClick={onClick} className="block py-3 text-[#0a1d42] font-medium">
    {label}
  </Link>
);

export default Navbar;
