<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
# 🩺 MediQueue — Premium Tutor & Course Booking Marketplace

MediQueue is a modern, clean, and highly intuitive web application designed to connect students with expert medical tutors and specialized healthcare courses. Built with a premium, minimalistic aesthetic, the platform streamlines the entire process of searching, discovering, and securely booking educational sessions in real-time.

🌐 **Live Site URL:** [https://mediqueue-one-gamma.vercel.app](https://mediqueue-client.vercel.app)

---

## ✨ Key Features

*   **🔍 Advanced Search & Dynamic Filters:** Instantly find the perfect tutor using our high-performance query system, allowing you to search by name or filter results based on precise creation date ranges.
*   **📅 Real-Time Slot & Booking Management:** Seamlessly book a session with immediate feedback. The platform automatically tracks availability and dynamically decreases the tutor's remaining slots upon a successful booking.
*   **🔒 Secure JWT-Based Route Protection:** Protects user privacy and sensitive interactions by leveraging secure token verification (`jose-cjs` / `JSON Web Tokens`) for private profiles and booking details.
*   **💼 Comprehensive Tutor Dashboard (CRUD):** Empower tutors to manage their digital presence effortlessly with full capabilities to add new listings, update active schedules/fees, and remove listings in real-time.
*   **📊 Interactive Relationship & Status Tracking:** Monitor active, confirmed, and cancelled bookings effortlessly from a unified panel designed to keep both students and teachers updated instantly.

---

## 🛠️ Tech Stack

**Front-End / Client:**
*   React.js & Next.js (App Router)
*   Tailwind CSS (Premium Minimalistic Theme)
*   Framer Motion (Smooth UX Animations)

**Back-End / API (Repository Dependent):**
*   Node.js & Express.js
*   MongoDB (Native Driver)
*   Jose-cjs (Secure JWKS Validation)

---

## 🚀 Getting Started (Local Development)

Follow these steps to run the client-side environment locally:

1. **Clone the repository:**
   
```bash
   git clone [https://github.com/designerdebraz-beep/mediqueue-client.git](https://github.com/designerdebraz-beep/mediqueue-client.git)
   cd mediqueue-client