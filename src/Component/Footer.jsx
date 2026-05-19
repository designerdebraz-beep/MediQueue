"use client";

import Link from "next/link";

import { CiFacebook } from "react-icons/ci";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaMapPin } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";




export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand Info */}
          <div>
            <h2 className="text-3xl font-bold text-blue-400">
              TutorConnect
            </h2>

            <p className="mt-4 text-gray-400 leading-relaxed">
              Find expert tutors and book personalized online learning
              sessions anytime from anywhere.
            </p>
          </div>

          {/* Tutor Services */}
          <div>
            <h3 className="text-xl font-semibold mb-5">
              Learning Services
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>
                <Link href="/courses" className="hover:text-blue-400 transition">
                  Online Courses
                </Link>
              </li>

              <li>
                <Link href="/tutors" className="hover:text-blue-400 transition">
                  Find Tutors
                </Link>
              </li>

              <li>
                <Link href="/book-session" className="hover:text-blue-400 transition">
                  Book Session
                </Link>
              </li>

              <li>
                <Link href="/dashboard" className="hover:text-blue-400 transition">
                  Student Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-5">
              Contact Us
            </h3>

            <div className="space-y-4 text-gray-400">

              <div className="flex items-center gap-3">
                <FaPhoneAlt />

                <span>+880 1234-567890</span>
              </div>

              <div className="flex items-center gap-3">
               <MdEmail />

                <span>support@tutorconnect.com</span>
              </div>

              <div className="flex items-start gap-3">
                <FaMapPin />

                <span>Natore, Bangladesh</span>
              </div>

            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-semibold mb-5">
              Follow Us
            </h3>

            <div className="flex gap-4">

              <Link
                href="#"
                className="bg-gray-800 hover:bg-blue-500 transition p-3 rounded-full"
              >
             <CiFacebook />

              </Link>

              <Link
                href="#"
                className="bg-gray-800 hover:bg-blue-500 transition p-3 rounded-full"
              >
               <FaTwitter />
              </Link>

              <Link
                href="#"
                className="bg-gray-800 hover:bg-blue-500 transition p-3 rounded-full"
              >
                <FaInstagram />

              </Link>

              <Link
                href="#"
                className="bg-gray-800 hover:bg-blue-500 transition p-3 rounded-full"
              >
                <FaLinkedinIn  className="w-5 h-5" />
              </Link>

            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} TutorConnect. All rights reserved.
        </div>

      </div>
    </footer>
  );
}