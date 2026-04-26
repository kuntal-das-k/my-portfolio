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
        setSuccess("Message sent successfully ✓");
        setForm({ name: "", email: "", message: "" });
      } else {
        setSuccess("Something went wrong ✗");
      }
    } catch {
      setSuccess("Error sending message ✗");
    }

    setLoading(false);

    setTimeout(() => setSuccess(""), 3000);
  };

  const pushEnter = (e: React.MouseEvent) => { const b = e.currentTarget as HTMLElement; b.style.transform = "translate(4px,4px)"; b.style.boxShadow = "0 0 0 0 #000"; };
  const pushLeave = (e: React.MouseEvent) => { const b = e.currentTarget as HTMLElement; b.style.transform = "translate(0,0)"; b.style.boxShadow = "8px 8px 0px 0px #000"; };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#ffe17c",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        position: "relative",
      }}
    >
      {/* dot pattern */}
      <div style={{
        backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
        backgroundSize: "32px 32px",
        opacity: 0.06,
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
      }} />

      {/* Back button */}
      <a href="/"
        style={{
          position: "absolute", top: "2rem", left: "2rem",
          display: "inline-flex", alignItems: "center", gap: "6px",
          padding: "0.5rem 1rem", background: "#fff", border: "2px solid #000",
          borderRadius: "8px", color: "#000", textDecoration: "none",
          fontSize: "0.85rem", fontWeight: 700, fontFamily: "'Satoshi', sans-serif",
          boxShadow: "3px 3px 0px 0px #000",
          transition: "all 0.2s cubic-bezier(0.175,0.885,0.32,1.275)",
        }}
        onMouseEnter={(e) => { const b = e.currentTarget; b.style.transform = "translate(2px,2px)"; b.style.boxShadow = "1px 1px 0px 0px #000"; }}
        onMouseLeave={(e) => { const b = e.currentTarget; b.style.transform = "translate(0,0)"; b.style.boxShadow = "3px 3px 0px 0px #000"; }}
      >
        ← Back
      </a>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          width: "100%",
          maxWidth: "520px",
          background: "#fff",
          border: "2px solid #000",
          borderRadius: "12px",
          padding: "2.5rem",
          boxShadow: "8px 8px 0px 0px #000",
          position: "relative",
          zIndex: 1,
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: 800,
            marginBottom: "0.5rem",
            color: "#000",
            fontFamily: "'Cabinet Grotesk', sans-serif",
            letterSpacing: "-0.03em",
          }}
        >
          Contact Me
        </h1>

        <p
          style={{
            color: "#171e19cc",
            marginBottom: "2rem",
            fontSize: "0.95rem",
            fontFamily: "'Satoshi', sans-serif",
          }}
        >
          Have an idea or opportunity? Let&apos;s talk.
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
              padding: "0.85rem",
              borderRadius: "10px",
              border: "2px solid #000",
              background: "#000",
              color: "#fff",
              fontWeight: 700,
              fontSize: "0.9rem",
              fontFamily: "'Satoshi', sans-serif",
              cursor: "pointer",
              marginTop: "0.5rem",
              opacity: loading ? 0.7 : 1,
              boxShadow: "8px 8px 0px 0px #000",
              transition: "all 0.2s cubic-bezier(0.175,0.885,0.32,1.275)",
            }}
            onMouseEnter={pushEnter}
            onMouseLeave={pushLeave}
          >
            {loading ? "Sending..." : "Send Message →"}
          </button>
        </form>

        {success && (
          <p
            style={{
              marginTop: "1rem",
              fontSize: "0.85rem",
              color: success.includes("✓") ? "#28c840" : "#e53e3e",
              fontWeight: 700,
              fontFamily: "'Satoshi', sans-serif",
            }}
          >
            {success}
          </p>
        )}
      </motion.div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "0.75rem 1rem",
  borderRadius: "10px",
  border: "2px solid #000",
  background: "#fff",
  color: "#000",
  fontSize: "0.85rem",
  fontWeight: 500,
  fontFamily: "'Satoshi', sans-serif",
  outline: "none",
  transition: "box-shadow 0.2s",
};