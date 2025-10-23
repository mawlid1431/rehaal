import React from 'react';
import { motion } from 'framer-motion';

export const TermsPage: React.FC = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-64 flex items-center justify-center bg-gradient-to-r from-[rgb(216,167,40)] to-[rgb(186,137,10)]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-white"
        >
          <h1 className="text-4xl md:text-5xl mb-4 text-white">Terms & Conditions</h1>
          <p className="text-xl text-white/90">Last updated: October 2025</p>
        </motion.div>
      </section>

      {/* Content */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="prose prose-lg max-w-none"
          >
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl mb-4">1. Booking and Payment</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>
                    All bookings must be made through official Rehaal Travel channels. A non-refundable deposit of 30% is required at the time of booking to secure your reservation.
                  </p>
                  <p>
                    The remaining balance must be paid in full at least 45 days before the departure date. Failure to complete payment may result in cancellation of your booking.
                  </p>
                  <p>
                    All payments must be made in accordance with Islamic principles. We do not engage in interest-based transactions (riba). Payment plans may be available upon request.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl mb-4">2. Cancellation Policy</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>
                    Cancellations must be submitted in writing. The following cancellation fees apply:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>60+ days before departure: 25% of total package cost</li>
                    <li>30-59 days before departure: 50% of total package cost</li>
                    <li>15-29 days before departure: 75% of total package cost</li>
                    <li>Less than 15 days before departure: 100% of total package cost (non-refundable)</li>
                  </ul>
                  <p>
                    We strongly recommend purchasing travel insurance to protect against unforeseen circumstances.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl mb-4">3. Travel Documentation</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>
                    All travelers are responsible for ensuring they have valid travel documents, including passports with at least 6 months validity, required visas, and vaccination certificates.
                  </p>
                  <p>
                    While we assist with visa processing, approval is at the discretion of the Saudi Arabian authorities. Rehaal Travel cannot be held responsible for visa denials.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl mb-4">4. Health and Safety</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>
                    Travelers must be in good physical health and able to perform the rituals of Umrah, which involve extensive walking and physical activity.
                  </p>
                  <p>
                    Required vaccinations must be obtained before travel. Medical certificates may be required for certain age groups or health conditions.
                  </p>
                  <p>
                    Rehaal Travel is not liable for any health issues or accidents during the trip. Travelers are advised to have comprehensive travel and health insurance.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl mb-4">5. Conduct and Behavior</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>
                    All travelers are expected to conduct themselves in accordance with Islamic principles and respect local laws and customs in Saudi Arabia.
                  </p>
                  <p>
                    Rehaal Travel reserves the right to remove any traveler from the group who engages in behavior that is disrespectful, illegal, or disruptive to others, without refund.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl mb-4">6. Changes to Itinerary</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>
                    While we make every effort to adhere to the published itinerary, Rehaal Travel reserves the right to make changes due to circumstances beyond our control, including weather, political situations, or force majeure events.
                  </p>
                  <p>
                    In such cases, we will provide the best possible alternative arrangements. No refunds will be provided for changes made due to circumstances beyond our control.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl mb-4">7. Liability</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>
                    Rehaal Travel acts as an agent for transportation, accommodation, and other service providers. We are not liable for delays, cancellations, or changes made by these third parties.
                  </p>
                  <p>
                    Our liability is limited to the amount paid for the package. We are not responsible for lost or damaged luggage, personal belongings, or injuries sustained during the trip.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl mb-4">8. Contact Information</h2>
                <div className="text-muted-foreground">
                  <p>
                    For any questions regarding these terms and conditions, please contact us at info@rehaaltravel.com or call +45 12 34 56 78.
                  </p>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
