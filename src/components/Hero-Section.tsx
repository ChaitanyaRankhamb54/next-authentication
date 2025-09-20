"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 relative text-white px-4 dark:bg-gradient-to-r dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 mx-[10%] w-full flex flex-col md:flex-row items-center justify-between"
      >
        {/* Left side - Hero Text */}
        <div className="text-center md:text-left w-full md:w-1/2 flex flex-col justify-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Next.js Auth <br /> Simplified & Secure
          </h1>
          <p className="text-[20px] text-gray-200 mb-8">
            I built a modern authentication system with Next.js and Auth.js. <br />
            OAuth, JWT, sessions — all streamlined in one place.
          </p>
          <div className="flex gap-4 justify-center md:justify-start">
            <Link href="https://next-auth.js.org/" target="_blank" rel="noopener noreferrer">
              <button className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow hover:bg-gray-200 transition">
                Get Started
              </button>
            </Link>
            <Link href="/signup">
              <button className="px-6 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white/20 transition">
                Try It Free
              </button>
            </Link>
          </div>
        </div>

        {/* Right side - Login Card */}
        <div className="relative w-full md:w-1/2 flex items-center justify-center">
          <motion.div
            className="relative w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

            {/* OAuth Buttons */}
            <div className="flex flex-col gap-3 mb-6">
              <button className="w-full py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition">
                Continue with GitHub
              </button>
              <button className="w-full py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition">
                Continue with Google
              </button>
            </div>

            <div className="text-center text-gray-300 mb-4">or</div>

            {/* Input Fields */}
            <div className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="user@example.com"
                readOnly
                className="px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none"
              />
              <input
                type="password"
                placeholder="••••••••"
                readOnly
                className="px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none"
              />
            </div>

            {/* Login Button */}
            <button
              className="mt-6 w-full py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Login
            </button>
          </motion.div>
        </div>
      </motion.div>

    </section>
  );
}
