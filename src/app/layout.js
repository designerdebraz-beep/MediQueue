import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MainNavbar } from "@/Component/MainNavbar";
import Footer from "@/Component/Footer";
import { Toaster } from "react-hot-toast";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MediQueue is a tutor booking web application",
  description: "where students can register, log in, browse available tutors, and book online learning sessions based on subject and time availability.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className=" flex flex-col bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 min-h-screen transition-colors duration-300">
      <MainNavbar></MainNavbar>
        <main >
          {children}
        </main>
      <Footer></Footer>
      <Toaster />
      </body>
    </html>
  );
}
