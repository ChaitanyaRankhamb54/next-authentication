"use client";

import { useState } from "react";
import { Bebas_Neue, Merriweather, Roboto } from "next/font/google";
import { Github, Mail, MapPin, Phone, User } from 'lucide-react';

// Import fonts
const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });
const merri = Merriweather({ subsets: ["latin"], weight: ["300", "700"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["100", "400", "700"] });

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setStatus("Message sent successfully!");
      setFormData({ name: "", mobile: "", email: "", message: "" });
    } else {
      setStatus("Something went wrong. Please try again.");
    }
  };

  return (
    <div className={`min-h-screen dark:bg-gradient-to-br dark:from-gray-900 dark:via-black dark:to-gray-800 bg-white text-white flex flex-col items-center py-12 px-4 mt-12 ${roboto.className}`}>
      {/* Header */}
      <div className="max-w-3xl w-full text-center mb-8">
        <h1 className={`text-6xl font-bold mb-6 text-indigo-400 ${bebas.className}`}>Contact Me</h1>
        <p className={`${merri.className} dark:text-gray-200 text-black/85 text-xl mb-4`}>
          This project demonstrates secure authentication using Next.js and Auth.js, focusing on building reliable and scalable solutions.
        </p>
        <p className={`mb-4 dark:text-gray-200 text-black/85 ${merri.className} text-xl`}>
          If you’d like to discuss the project in detail, provide feedback, or explore potential collaboration opportunities, you can get in touch with me by filling out the form below. I’ll respond at the earliest convenience.
        </p>
      </div>

      {/* Contact Info & Form */}
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="p-6 dark:bg-neutral-800/50 bg:white bg-opacity-70 rounded-xl shadow-2xl space-y-4">
          {/* Heading */}
          <h2 className={`${bebas.className} text-2xl dark:text-white text-black mb-4 tracking-wide`}>
            About Me
          </h2>

          {/* Contact Details */}
          <p className={`${roboto.className} flex items-center dark:text-gray-200 text-black/85`}>
            <User className="mr-3 dark:text-teal-400" size={22} />
            <span className="font-semibold dark:text-white text-black mr-2">Name:</span>
            Chaitanya Rankhamb
          </p>

          <p className={`${roboto.className} flex items-center dark:text-gray-200 text-black/85`}>
            <Mail className="mr-3 dark:text-teal-400" size={22} />
            <span className="font-semibold dark:text-white text-black mr-2">Email:</span>
            chaitanyarankhamb007@gmail.com
          </p>

          <p className={`${roboto.className} flex items-center dark:text-gray-200 text-black/85`}>
            <Phone className="mr-3 dark:text-teal-400" size={22} />
            <span className="font-semibold dark:text-white text-black mr-2">Phone:</span>
            +123 456 7890
          </p>

          <p className={`${roboto.className} flex items-center dark:text-gray-200 text-black/85`}>
            <MapPin className="mr-3 dark:text-teal-400" size={22} />
            <span className="font-semibold dark:text-white text-black mr-2">Location:</span>
            VIT College, Pune, India
          </p>

          {/* GitHub Link */}
          <div className="mt-6">
            <p className={`${merri.className} dark:text-gray-300 text-black/85 mb-2 flex items-center gap-2`}>
              Explore me on
              <a
                href="https://github.com/ChaitanyaRankhamb54/next-authentication"
                target="_blank"
                className="flex items-center gap-2 text-teal-400 font-medium hover:underline"
              >
                GitHub
                <Github size={22} />
              </a>
            </p>
          </div>

          {/* Footer Note */}
          <div className={`${merri.className} mt-6 dark:text-gray-300 text-black/85`}>
            Feel free to reach out for any inquiries or collaborations by filling out the form.
          </div>
        </div>


        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-lg shadow-2xl space-y-4 
             dark:bg-neutral-800/50 bg-white
             dark:text-gray-200 text-black"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full px-3 py-2 text-[16px] rounded-md 
               dark:bg-transparent bg-transparent border-black 
               dark:border dark:border-neutral-600 border-1
               dark:focus:ring-neutral-500 dark:focus:ring-2 
               outline-none placeholder:text-[16px] 
               dark:placeholder:text-neutral-500/80 placeholder:text-black/80"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            className="w-full px-3 py-2 text-[16px] rounded-md 
               dark:bg-transparent bg-transparent border-black 
               dark:border dark:border-neutral-600 border-1
               dark:focus:ring-neutral-500 dark:focus:ring-2 
               outline-none placeholder:text-[16px] 
               dark:placeholder:text-neutral-500/80 placeholder:text-black/80"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full px-3 py-2 text-[16px] rounded-md 
               dark:bg-transparent bg-transparent border-black 
               dark:border dark:border-neutral-600 border-1
               dark:focus:ring-neutral-500 dark:focus:ring-2 
               outline-none placeholder:text-[16px] 
               dark:placeholder:text-neutral-500/80 placeholder:text-black/80"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows={4}
            className="w-full px-3 py-2 text-[16px] rounded-md 
               dark:bg-transparent bg-transparent border-black 
               dark:border dark:border-neutral-600 border-1
               dark:focus:ring-neutral-500 dark:focus:ring-2 
               outline-none placeholder:text-[16px] 
               dark:placeholder:text-neutral-500/80 placeholder:text-black/80"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button
            type="submit"
            className="w-full py-3 bg-teal-500 hover:bg-teal-600 
               text-white font-semibold rounded-lg 
               transition duration-300"
          >
            Send Message
          </button>
          {status && (
            <p className="text-sm mt-2 dark:text-gray-300 text-gray-600">{status}</p>
          )}
        </form>

      </div>
    </div>
  );
}
