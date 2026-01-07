// components/Header.js
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

// Role-based links
const navLinksByRole = {
  guest: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
  student: [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/student/dashboard" },
    { name: "Courses", href: "/student/courses" },
    { name: "Profile", href: "/student/profile" },
  ],
  faculty: [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/faculty/dashboard" },
    { name: "Classes", href: "/faculty/classes" },
    { name: "Profile", href: "/faculty/profile" },
  ],
  librarian: [
    { name: "Home", href: "/" },
    { name: "Dashboard", href: "/librarian/dashboard" },
    { name: "Books", href: "/librarian/books" },
    { name: "Profile", href: "/librarian/profile" },
  ],
};

export default function Header({ role = "guest" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const navLinks = navLinksByRole[role] || navLinksByRole.guest;
  const isActive = (href) => pathname === href;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-sidebar/80 backdrop-blur-md transition-all duration-300 ${
        scrolled ? "shadow-xl py-2" : "shadow-md py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className={`text-2xl font-extrabold transition-all duration-300 ${
            scrolled ? "text-primary" : "text-accent-foreground"
          }`}
        >
          🎓 StudentERP
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative px-3 py-1 rounded-md transition-all duration-200 ${
                isActive(link.href)
                  ? "text-primary bg-accent/20 font-semibold shadow-inner"
                  : "hover:text-primary hover:bg-accent/10"
              }`}
            >
              {link.name}
              {isActive(link.href) && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 rounded-full bg-primary"></span>
              )}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
            className="p-2 rounded-md hover:bg-accent/20 transition-colors"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-sidebar/90 backdrop-blur-md rounded-b-lg overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-96 py-4" : "max-h-0"
        }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block py-3 px-5 rounded-md transition-all duration-200 ${
              isActive(link.href)
                ? "text-primary font-semibold bg-accent/20"
                : "hover:text-primary hover:bg-accent/10"
            }`}
            onClick={() => setMenuOpen(false)}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </header>
  );
}
