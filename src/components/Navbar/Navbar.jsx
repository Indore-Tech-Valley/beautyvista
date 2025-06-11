import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiShoppingCart } from 'react-icons/fi';
import { BiLeaf } from 'react-icons/bi';
import OurServices from '../../Pages/OurServices/OurServices';

const Navbar = () => {
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
       <div className="flex items-center gap-2 ">
                   <BiLeaf className="text-[#8d6e63] text-4xl" />
                   <h2 className="text-xl font-semibold tracking-wide">BeautyVista</h2>
        </div>

        {/* Desktop Nav */}
        <nav
          className={`hidden md:flex gap-8 text-md font-light ${
            scrolled || isMobile ? 'text-gray-800' : ''
          }`}
        >
          <NavLink to="/" label="Home" />
          <NavLink to="/services" label="Services" />
          <NavLink to="/about#stylists" label="Stylists" />
          <NavLink to="/events" label="Events" />
          <NavLink to="/about" label="About Us" />
        </nav>

        {/* Icons & Mobile Toggle */}
        <div className="flex items-center gap-4">
          {/* Search Icon */}
          <Link to="/search">
            <FiSearch className="w-6 h-6 text-pink-700" />
          </Link>

          {/* Cart Icon */}
          <Link to="/cart">
            <FiShoppingCart className="w-6 h-6 text-pink-700" />
          </Link>

          {/* Hamburger Menu */}
          <button className="md:hidden focus:outline-none" onClick={toggleMenu}>
            <svg
              className="w-6 h-6 text-pink-700"
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
      </div>

      {/* Mobile Nav */}
      <div
        className={`md:hidden transition-all duration-500 ease-in-out overflow-hidden ${
          menuOpen ? 'max-h-screen opacity-100 py-6 px-4' : 'max-h-0 opacity-0 py-0 px-4'
        }`}
      >
        <MobileLink to="/" label="Home" onClick={() => setMenuOpen(false)} />
        <MobileLink to="/services" label="Services" onClick={() => setMenuOpen(false)} />
        <MobileLink to="/about#stylists" label="Stylists" onClick={() => setMenuOpen(false)} />
        <MobileLink to="/events" label="Events" onClick={() => setMenuOpen(false)} />
        <MobileLink to="/about" label="About Us" onClick={() => setMenuOpen(false)} />
      </div>
    </header>
  );
};

const NavLink = ({ to, label }) => (
  <Link to={to} className="relative group">
    <span className="transition-colors duration-300">{label}</span>
    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-pink-600 transition-all duration-300 group-hover:w-full"></span>
  </Link>
);

const MobileLink = ({ to, label, onClick }) => (
  <Link to={to} onClick={onClick} className="block py-3 border-b border-gray-200">
    {label}
  </Link>
);

export default Navbar;
