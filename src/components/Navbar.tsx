"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { ModeToggle } from "./Theme-Toggle";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/70 dark:bg-black/40 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
          AuthX
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex gap-8 text-gray-700 dark:text-gray-300 font-medium">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`transition ${isActive
                    ? "text-indigo-600 dark:text-indigo-400 font-semibold"
                    : "hover:text-indigo-600 dark:hover:text-indigo-400"
                  }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Right Side */}
        <div className="flex gap-4 items-center">
          <Link href="/login">
            <Button variant="outline">Login</Button>
          </Link>
          <Link href="/signup">
            <Button>Sign Up</Button>
          </Link>
          <Link href="/profile">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
