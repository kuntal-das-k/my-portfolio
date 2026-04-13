"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSuccess("Message sent successfully ✨");
        setForm({ name: "", email: "", message: "" });
      } else {
        setSuccess("Something went wrong ❌");
      }
    } catch {
      setSuccess("Error sending message ❌");
    }

    setLoading(false);

    setTimeout(() => setSuccess(""), 3000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050508",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      {/* Glow background */}
      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(0,255,224,0.08), transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          width: "100%",
          maxWidth: "520px",
          background: "rgba(10,10,20,0.85)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(0,255,224,0.2)",
          borderRadius: "20px",
          padding: "2.5rem",
          boxShadow: "0 20px 60px rgba(0,255,224,0.1)",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "800",
            marginBottom: "1rem",
            color: "#fff",
          }}
        >
          Contact Me
        </h1>

        <p
          style={{
            color: "#7a7a9a",
            marginBottom: "2rem",
            fontSize: "0.95rem",
          }}
        >
          Have an idea or opportunity? Let’s talk.
        </p>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <input
            placeholder="Your Name"
            value={form.name}
            required
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            style={inputStyle}
          />

          <input
            placeholder="Your Email"
            type="email"
            required
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            style={inputStyle}
          />

          <textarea
            placeholder="Your Message"
            required
            rows={4}
            value={form.message}
            onChange={(e) =>
              setForm({ ...form, message: e.target.value })
            }
            style={{ ...inputStyle, resize: "none" }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "0.75rem",
              borderRadius: "10px",
              border: "none",
              background:
                "linear-gradient(135deg, #00ffe0, #b47fff)",
              color: "#050508",
              fontWeight: 600,
              cursor: "pointer",
              marginTop: "0.5rem",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Sending..." : "Send Message →"}
          </button>
        </form>

        {success && (
          <p
            style={{
              marginTop: "1rem",
              fontSize: "0.85rem",
              color: "#00ffe0",
            }}
          >
            {success}
          </p>
        )}
      </motion.div>
    </div>
  );
}

const inputStyle = {
  padding: "0.7rem 0.9rem",
  borderRadius: "10px",
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.03)",
  color: "#fff",
  fontSize: "0.85rem",
  outline: "none",
};