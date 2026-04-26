import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kuntal Das — Full Stack Developer",
  description:
    "Portfolio of Kuntal Das — Full Stack Developer specializing in modern web applications, scalable APIs, and premium user interfaces.",
  openGraph: {
    title: "Kuntal Das — Full Stack Developer",
    description:
      "Building modern web applications with clean UI, smooth animations, and high performance.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kuntal Das — Full Stack Developer",
    description:
      "Building modern web applications with clean UI, smooth animations, and high performance.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://api.fontshare.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,600,700,800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
