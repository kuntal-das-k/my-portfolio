"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0 }
};

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen">

      {/* HERO */}
      <section className="h-screen flex items-center justify-between px-6 md:px-20">

        {/* LEFT */}
        <div className="max-w-xl">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-bold leading-tight"
          >
            Hi, I'm <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              Kuntal Das
            </span>
          </motion.h1>

          <p className="mt-6 text-gray-400 text-lg">
            CSE Student | Web Developer | Problem Solver
          </p>
        </div>

        {/* RIGHT IMAGE (BIGGER + CLEAN) */}
        <motion.div
          animate={{ y: [0, -25, 0] }}
          transition={{ repeat: Infinity, duration: 5 }}
          className="hidden md:block"
        >
          <Image
            src="/3d-boy.png"
            alt="Developer"
            width={650}
            height={650}
            className="opacity-90 object-contain"
          />
        </motion.div>
      </section>

      {/* ABOUT */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="py-24 px-6 md:px-20"
      >
        <h2 className="text-3xl font-semibold mb-10">About Me</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {[
            "2nd Year B.Tech CSE Student",
            "Python, C, Java, HTML, CSS",
            "FastAPI & Backend Development",
            "MySQL & Oracle",
            "Deployment: Vercel",
            "SAP Inside Track Kolkata",
            "Oracle Kolkata Community",
            "Content Lead at SKEPSIS",
            "Social Media Management",
            "Goal: Full Stack Developer"
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/5 backdrop-blur-md p-5 rounded-xl border border-white/10 hover:border-purple-500 transition"
            >
              {item}
            </div>
          ))}
        </div>
      </motion.section>

      {/* WHAT I LEARNED */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="py-24 px-6 md:px-20"
      >
        <h2 className="text-3xl font-semibold mb-10">
          What I Have Learned
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            "Data Structures & Algorithms",
            "DBMS",
            "Computer Organization",
            "Object-Oriented Programming",
            "Backend Development (FastAPI)",
            "Content & Community Management"
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 hover:scale-105 hover:border-purple-500 transition"
            >
              <h3 className="text-lg font-medium">{item}</h3>
            </div>
          ))}
        </div>
      </motion.section>

      {/* TECH STACK (ICONS) */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="py-24 px-6 md:px-20"
      >
        <h2 className="text-3xl font-semibold mb-10">Tech Stack</h2>

        <div className="flex flex-wrap gap-6 items-center">

          {[
            "python.png",
            "c.png",
            "java.png",
            "html.png",
            "css.png",
            "fastapi.png",
            "mysql.png",
            "oracle.png",
            "vercel.png"
          ].map((img, i) => (
            <div
              key={i}
              className="bg-white/5 p-4 rounded-xl border border-white/10 hover:scale-110 transition"
            >
              <Image
                src={`/tech/${img}`}
                alt="tech"
                width={40}
                height={40}
              />
            </div>
          ))}

        </div>
      </motion.section>

      {/* PROJECTS */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="py-24 px-6 md:px-20"
      >
        <h2 className="text-3xl font-semibold mb-10">Projects</h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:scale-105 hover:border-purple-500 transition">
            <h3 className="text-xl font-semibold">Invoice Generator</h3>
            <p className="text-gray-400 mt-2">
              Generates invoices in Text & PDF
            </p>
          </div>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:scale-105 hover:border-purple-500 transition">
            <h3 className="text-xl font-semibold">
              YouTube Transcript Summarizer
            </h3>
            <p className="text-gray-400 mt-2">
              AI-based summarization
            </p>
          </div>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:scale-105 hover:border-purple-500 transition">
            <h3 className="text-xl font-semibold">
              FastAPI Backend Projects
            </h3>
            <p className="text-gray-400 mt-2">
              REST APIs with database integration
            </p>
          </div>

        </div>
      </motion.section>

      {/* CONTACT */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="py-24 px-6 md:px-20"
      >
        <h2 className="text-3xl font-semibold mb-4">Contact</h2>
        <p className="text-gray-400">your@email.com</p>
      </motion.section>

    </main>
  );
}