import type { Metadata } from "next";
import {Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Marquee from "./components/Marquee";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";

const NotoSerifBenali = Noto_Serif_Bengali({
  subsets: ["latin", "bengali"],
});

export const metadata: Metadata = {
  title: "বাজার দর | BazarDor",
  description: "প্রয়োজনীয় পণ্যের দাম",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      className={`${NotoSerifBenali.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar></Navbar>
        <Marquee></Marquee>
        <main>{children}</main>
        <Toaster position="top-right" reverseOrder={false} />
        <Footer></Footer>
      </body>
    </html>
  );
}
