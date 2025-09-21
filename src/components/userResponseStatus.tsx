"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";

interface UserResponseStatusProps {
  status: string; // sending..., success, failed
  onClose: () => void;
}

export default function UserResponseStatus({ status, onClose }: UserResponseStatusProps) {
  // Detect success/failed to show OK button
  const isFinal = status.toLowerCase().includes("success") || status.toLowerCase().includes("failed");

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center dark:bg-black/30 bg-white/10 backdrop-blur-sm z-50 ">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-black text-center rounded-2xl shadow-2xl p-8 max-w-sm w-full"
      >
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Your response is sending to us
        </h2>
        <p
          className={`text-sm mb-4 ${
            status.toLowerCase().includes("success")
              ? "text-green-600"
              : status.toLowerCase().includes("failed")
              ? "text-red-500"
              : "text-blue-500"
          }`}
        >
          {status}
        </p>

        {isFinal && (
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition"
          >
            OK
          </button>
        )}
      </motion.div>
    </div>
  );
}
