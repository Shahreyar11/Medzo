"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#" },
    { label: "About Us", href: "#" },
  ];

  return (
    <nav
      className={`w-full sticky top-0 z-50 font-[Manrope,sans-serif] transition-all duration-300 ${
        scrolled
          ? "bg-[#F6F3EC]/90 backdrop-blur-md shadow-[0_1px_20px_rgba(22,66,60,0.08)]"
          : "bg-[#F6F3EC]"
      } border-b border-[#16423C]/10`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-[68px]">

        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 group">
          <PulseMark />
          <span className="text-[22px] font-[Space_Grotesk,sans-serif] font-bold tracking-tight text-[#16423C]">
            Medzo
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-9">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative text-[#4E5D59] hover:text-[#16423C] text-[15px] font-medium transition-colors py-1 group"
            >
              {link.label}
              <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-[#E8A33D] transition-all duration-300 group-hover:w-full rounded-full" />
            </a>
          ))}
        </div>

        {/* Auth buttons - desktop */}
        <div className="hidden md:flex items-center gap-2">
          <a
            href="/login"
            className="text-[#16423C] text-[15px] font-semibold px-4 py-2.5 rounded-full hover:bg-[#16423C]/[0.06] transition-colors"
          >
            Log In
          </a>
          <a
            href="/signup"
            className="bg-[#E8A33D] text-[#16423C] text-[15px] font-bold px-5 py-2.5 rounded-full shadow-[0_2px_10px_rgba(232,163,61,0.4)] hover:shadow-[0_4px_16px_rgba(232,163,61,0.5)] hover:-translate-y-[1px] active:translate-y-0 transition-all duration-200"
          >
            Sign Up
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-[#16423C] p-1"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-[#F6F3EC] border-t border-[#16423C]/10 ${
          open ? "max-h-72 opacity-100" : "max-h-0 opacity-0 border-t-0"
        }`}
      >
        <div className="flex flex-col px-5 py-4 gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="py-3 text-[#16423C] font-medium border-b border-[#16423C]/5"
            >
              {link.label}
            </a>
          ))}
          <div className="flex gap-3 mt-4">
            <a
              href="#"
              className="flex-1 text-center text-[#16423C] font-semibold px-4 py-2.5 rounded-full border border-[#16423C]/20"
            >
              Log In
            </a>
            <a
              href="#"
              className="flex-1 text-center bg-[#E8A33D] text-[#16423C] font-bold px-4 py-2.5 rounded-full shadow-[0_2px_10px_rgba(232,163,61,0.4)]"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

/* Signature mark: a breathing pulse-line, nodding to vitals/queue monitoring */
function PulseMark() {
  return (
    <svg width="30" height="22" viewBox="0 0 30 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 11H6L9 3L14 19L17 11H30"
        stroke="#E8A33D"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-[pulseFade_2.8s_ease-in-out_infinite]"
      />
      <style>{`
        @keyframes pulseFade {
          0%, 100% { opacity: 0.45; }
          50% { opacity: 1; }
        }
      `}</style>
    </svg>
  );
}