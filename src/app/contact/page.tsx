"use client";

import { useState } from "react";
import { Bebas_Neue, Merriweather, Roboto } from "next/font/google";
import { Github, Mail, MapPin, Phone, User } from "lucide-react";
import { contactResponseValidation } from "@/src/models/userResponseSchema";
import UserResponseStatus from "@/src/components/userResponseStatus";

// Import fonts
const bebas = Bebas_Neue({ subsets: ["latin"], weight: "400" });
const merri = Merriweather({ subsets: ["latin"], weight: ["300", "700"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["100", "400", "700"] });

export default function ContactPage() {
  // create object state for the form data
  const [formData, setFormData] = useState({
    fullname: "",
    number: "",
    email: "",
    message: "",
  });

  // state for status message
  const [status, setStatus] = useState<string>("");

  //store the input filed data in the state
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // update the status of the form submission
    setStatus("Sending...");
    console.log(formData);

    // send the form data to check the schema and validation
    const validationResponse = contactResponseValidation.safeParse({
      fullname: formData.fullname,
      number: formData.number,
      email: formData.email,
      message: formData.message,
    });
    
    if (!validationResponse.success) {
      const errorMessages = validationResponse.error.issues
        .map((issue) => issue.message)
        .join(", ");
      setStatus(`Validation failed: ${errorMessages}`);
      console.log(`Validation failed: ${errorMessages}`);

      return;
    }

    // send the form data to the backend
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    // update the status based on the response
    if (res.ok) {
      setStatus("Message sent successfully!");
      setFormData({ fullname: "", number: "", email: "", message: "" });
    } else {
      setStatus("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center py-12 px-4 mt-12
        bg-gradient-to-br from-gray-50 via-white to-gray-100
        dark:from-gray-900 dark:via-black dark:to-gray-800
        ${roboto.className}`}
    >
      {/* Header */}
      <div className="max-w-3xl w-full text-center mb-12">
        <h1
          className={`text-6xl font-bold mb-6 
            bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 
            text-transparent bg-clip-text ${bebas.className}`}
        >
          Contact Me
        </h1>
        <p
          className={`${merri.className} text-lg md:text-xl mb-4 
            text-gray-700 dark:text-gray-300`}
        >
          This project demonstrates secure authentication using Next.js and
          Auth.js, focusing on building reliable and scalable solutions.
        </p>
        <p
          className={`${merri.className} text-lg md:text-xl 
            text-gray-700 dark:text-gray-300`}
        >
          If you’d like to discuss the project in detail, provide feedback, or
          explore potential collaboration opportunities, you can get in touch
          with me by filling out the form below. I’ll respond at the earliest
          convenience.
        </p>
      </div>

      {/* Contact Info & Form */}
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div
          className="p-6 rounded-2xl shadow-lg 
            backdrop-blur-md bg-white/60 dark:bg-neutral-800/50
            border border-gray-200 dark:border-white/10
            hover:shadow-xl hover:border-teal-400/60 transition-all duration-300"
        >
          <h2
            className={`${bebas.className} text-3xl mb-6 
              text-gray-900 dark:text-white tracking-wide`}
          >
            About Me
          </h2>

          <div className="space-y-4">
            <p
              className={`${roboto.className} flex items-center 
                text-gray-800 dark:text-gray-200`}
            >
              <User className="mr-3 text-teal-500" size={22} />
              <span className="font-semibold mr-2">Name:</span>
              Chaitanya Rankhamb
            </p>

            <p
              className={`${roboto.className} flex items-center 
                text-gray-800 dark:text-gray-200`}
            >
              <Mail className="mr-3 text-teal-500" size={22} />
              <span className="font-semibold mr-2">Email:</span>
              chaitanyarankhamb007@gmail.com
            </p>

            <p
              className={`${roboto.className} flex items-center 
                text-gray-800 dark:text-gray-200`}
            >
              <Phone className="mr-3 text-teal-500" size={22} />
              <span className="font-semibold mr-2">Phone:</span>
              +123 456 7890
            </p>

            <p
              className={`${roboto.className} flex items-center 
                text-gray-800 dark:text-gray-200`}
            >
              <MapPin className="mr-3 text-teal-500" size={22} />
              <span className="font-semibold mr-2">Location:</span>
              VIT College, Pune, India
            </p>
          </div>

          {/* GitHub Link */}
          <div className="mt-8">
            <a
              href="https://github.com/ChaitanyaRankhamb54/next-authentication"
              target="_blank"
              className="flex items-center gap-2 text-teal-500 font-medium hover:underline hover:text-teal-400 transition"
            >
              <Github size={22} /> GitHub
            </a>
          </div>

          {/* Footer Note */}
          <p
            className={`${merri.className} mt-8 
              text-gray-700 dark:text-gray-400`}
          >
            Feel free to reach out for any inquiries or collaborations by
            filling out the form.
          </p>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-2xl shadow-lg 
            backdrop-blur-md bg-white/60 dark:bg-neutral-800/50
            border border-gray-200 dark:border-white/10
            hover:shadow-xl hover:border-teal-400/60 transition-all duration-300 
            space-y-4"
        >
          <input
            type="text"
            name="fullname"
            placeholder="Your Name"
            className="w-full px-4 py-3 rounded-lg 
              bg-transparent border border-gray-300 dark:border-neutral-600 
              text-gray-900 dark:text-gray-200
              placeholder:text-gray-400 dark:placeholder:text-neutral-500
              focus:ring-2 focus:ring-teal-500 focus:border-teal-500 
              outline-none transition"
            value={formData.fullname}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="number"
            placeholder="Mobile Number"
            className="w-full px-4 py-3 rounded-lg 
              bg-transparent border border-gray-300 dark:border-neutral-600 
              text-gray-900 dark:text-gray-200
              placeholder:text-gray-400 dark:placeholder:text-neutral-500
              focus:ring-2 focus:ring-teal-500 focus:border-teal-500 
              outline-none transition"
            value={formData.number}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 rounded-lg 
              bg-transparent border border-gray-300 dark:border-neutral-600 
              text-gray-900 dark:text-gray-200
              placeholder:text-gray-400 dark:placeholder:text-neutral-500
              focus:ring-2 focus:ring-teal-500 focus:border-teal-500 
              outline-none transition"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows={4}
            className="w-full px-4 py-3 rounded-lg 
              bg-transparent border border-gray-300 dark:border-neutral-600 
              text-gray-900 dark:text-gray-200
              placeholder:text-gray-400 dark:placeholder:text-neutral-500
              focus:ring-2 focus:ring-teal-500 focus:border-teal-500 
              outline-none transition resize-none"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold text-white
              bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500
              hover:from-teal-600 hover:via-cyan-600 hover:to-blue-600
              shadow-md hover:shadow-xl transition"
          >
            Send Message
          </button>
          {status && (
            <UserResponseStatus status={status} onClose={() => setStatus("")} />
          )}
        </form>
      </div>
    </div>
  );
}
