// app/contact/page.js

"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now just simulate submit
    setSubmitted(true);
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-foreground mb-8 text-center">
        Contact Us
      </h1>

      {submitted ? (
        <p className="text-center text-accent-foreground text-lg">
          Thank you for reaching out! We will get back to you shortly.
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-sidebar p-8 rounded-lg shadow-md"
        >
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="mb-2 font-semibold text-foreground"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="p-3 rounded border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="mb-2 font-semibold text-foreground"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="p-3 rounded border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="message"
              className="mb-2 font-semibold text-foreground"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="p-3 rounded border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button
            type="submit"
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg shadow hover:shadow-lg transition-all font-semibold"
          >
            Send Message
          </button>
        </form>
      )}
    </main>
  );
}
