"use client";

import Link from "next/link";
import { useState } from "react";

const navigation = [
  { name: "Etusivu", href: "/" },
  { name: "Uutiset", href: "/uutiset" },
  { name: "Yhdistys", href: "/yhdistys" },
  { name: "Kalenteri", href: "/kalenteri" },
  { name: "MS Maija", href: "/ms-maija" },
  { name: "Yhteystiedot", href: "/yhteystiedot" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-blue-950/95 backdrop-blur-sm border-b border-blue-400/20 shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-xl font-bold text-white hover:text-blue-200 transition-colors duration-200"
            >
              Sukeltajat ry
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-blue-100 hover:text-white hover:bg-white/10 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 backdrop-blur-sm"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-blue-100 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-all duration-200 backdrop-blur-sm"
              aria-label="Avaa navigaatio"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-blue-400/20">
            <nav className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-blue-100 hover:text-white hover:bg-white/10 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 backdrop-blur-sm"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
