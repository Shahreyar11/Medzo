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
    { label: "Product Details", href: "#features" },
    { label: "Infrastructure Scale", href: "#scale" },
    { label: "AI Parsing", href: "#records" },
  ];

  return (
    <nav
      className={`w-full sticky top-0 z-50 font-sans transition-all duration-300 ${
        scrolled
          ? "bg-[#F4F7F6]/90 backdrop-blur-md shadow-[0_4px_20px_rgba(20,41,61,0.05)]"
          : "bg-[#F4F7F6]"
      } border-b border-[#DCE3E1]`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-20">

        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 group">
          <PulseMark />
          <span className="font-serif text-2xl font-semibold tracking-tight text-[#1A2E3B]">
            Medzo
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative text-[#5C6B70] hover:text-[#0F7A6C] text-sm font-medium transition-colors py-1 group"
            >
              {link.label}
              <span className="absolute left-0 -bottom-0.5 h-[2px] w-0 bg-[#C9791F] transition-all duration-300 group-hover:w-full rounded-full" />
            </a>
          ))}
        </div>

        {/* Auth buttons - desktop */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/login"
            className="text-[#1A2E3B] text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-[#1A2E3B]/[0.05] transition-colors"
          >
            Log In
          </a>
          <a
            href="#demo"
            className="bg-[#0F7A6C] hover:bg-[#0B5A50] text-white text-sm font-semibold px-5 h-11 rounded-xl shadow-sm transition-all duration-200 hover:shadow-md active:scale-[0.98] flex items-center justify-center"
          >
            Book a demo
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-[#1A2E3B] p-1"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-[#F4F7F6] border-t border-[#DCE3E1] ${
          open ? "max-h-72 opacity-100" : "max-h-0 opacity-0 border-t-0"
        }`}
      >
        <div className="flex flex-col px-6 py-4 gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-3 text-[#1A2E3B] font-medium border-b border-[#DCE3E1]/50 last:border-0 hover:text-[#0F7A6C] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="flex gap-3 mt-4 pb-2">
            <a
              href="/login"
              className="flex-1 text-center text-[#1A2E3B] font-semibold py-2.5 rounded-xl border border-[#DCE3E1] bg-white hover:bg-white/80 transition-colors"
            >
              Log In
            </a>
            <a
              href="#demo"
              onClick={() => setOpen(false)}
              className="flex-1 text-center bg-[#0F7A6C] text-white font-semibold py-2.5 rounded-xl shadow-sm"
            >
              Book demo
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

/* Signature mark adjusted to the palette color */
function PulseMark() {
  return (
    <div className="w-9 h-9 rounded-xl bg-[#0F7A6C] flex items-center justify-center font-mono font-bold text-white shadow-md shadow-[#0F7A6C]/20 group-hover:scale-105 transition-transform duration-300">
      M
    </div>
  );
}