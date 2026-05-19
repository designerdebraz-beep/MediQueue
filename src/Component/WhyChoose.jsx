"use client";

export default function WhyChoose() {
  return (
    <section className="bg-[#f5f5f5] py-20">

      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Why Choose Section */}
        <div>
          <h2 className="text-4xl font-bold text-center text-black mb-14">
            Why Choose MediQueue?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* Card 1 */}
            <div className="bg-white border border-gray-200 rounded-3xl p-10 text-center shadow-sm hover:shadow-lg transition-all duration-300">
              <h3 className="text-2xl font-bold text-black mb-4">
                Easy Booking
              </h3>

              <p className="text-gray-500 leading-relaxed">
                Book tutors instantly with a smooth and simple interface.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-gray-200 rounded-3xl p-10 text-center shadow-sm hover:shadow-lg transition-all duration-300">
              <h3 className="text-2xl font-bold text-black mb-4">
                Verified Tutors
              </h3>

              <p className="text-gray-500 leading-relaxed">
                All tutors are verified to ensure quality education.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-gray-200 rounded-3xl p-10 text-center shadow-sm hover:shadow-lg transition-all duration-300">
              <h3 className="text-2xl font-bold text-black mb-4">
                Flexible Scheduling
              </h3>

              <p className="text-gray-500 leading-relaxed">
                Choose time slots that fit your daily routine.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white border border-gray-200 rounded-3xl p-10 text-center shadow-sm hover:shadow-lg transition-all duration-300">
              <h3 className="text-2xl font-bold text-black mb-4">
                Affordable Pricing
              </h3>

              <p className="text-gray-500 leading-relaxed">
                Find tutors that match your budget easily.
              </p>
            </div>

          </div>
        </div>

        {/* How It Works */}
        <div className="mt-28">

          <h2 className="text-4xl font-bold text-center text-black mb-14">
            How It Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* Step 1 */}
            <div className="bg-white border border-gray-200 rounded-3xl p-10 text-center shadow-sm hover:shadow-lg transition-all duration-300">
              <h3 className="text-5xl font-bold text-blue-500 mb-6">
                01
              </h3>

              <h4 className="text-2xl font-bold text-black mb-4">
                Search Tutor
              </h4>

              <p className="text-gray-500 leading-relaxed">
                Browse tutors by subject and availability.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-gray-200 rounded-3xl p-10 text-center shadow-sm hover:shadow-lg transition-all duration-300">
              <h3 className="text-5xl font-bold text-blue-500 mb-6">
                02
              </h3>

              <h4 className="text-2xl font-bold text-black mb-4">
                Select Slot
              </h4>

              <p className="text-gray-500 leading-relaxed">
                Choose your preferred date and time.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-gray-200 rounded-3xl p-10 text-center shadow-sm hover:shadow-lg transition-all duration-300">
              <h3 className="text-5xl font-bold text-blue-500 mb-6">
                03
              </h3>

              <h4 className="text-2xl font-bold text-black mb-4">
                Book Session
              </h4>

              <p className="text-gray-500 leading-relaxed">
                Confirm booking with one click.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white border border-gray-200 rounded-3xl p-10 text-center shadow-sm hover:shadow-lg transition-all duration-300">
              <h3 className="text-5xl font-bold text-blue-500 mb-6">
                04
              </h3>

              <h4 className="text-2xl font-bold text-black mb-4">
                Start Learning
              </h4>

              <p className="text-gray-500 leading-relaxed">
                Join your session and begin learning.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}