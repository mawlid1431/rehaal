import React from 'react';
import { motion } from 'framer-motion';

export const PrivacyPage: React.FC = () => {
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
          <h1 className="text-4xl md:text-5xl mb-4 text-white">Privacy Policy</h1>
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
                <h2 className="text-2xl mb-4">1. Introduction</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>
                    At Rehaal Travel, we are committed to protecting your privacy and handling your personal information with care and in accordance with Islamic principles of trust (amanah) and privacy.
                  </p>
                  <p>
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services or visit our website.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl mb-4">2. Information We Collect</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>
                    We collect information that you provide directly to us, including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Personal identification information (name, date of birth, passport details)</li>
                    <li>Contact information (email address, phone number, physical address)</li>
                    <li>Payment information (processed securely through third-party payment processors)</li>
                    <li>Travel preferences and special requirements</li>
                    <li>Emergency contact information</li>
                    <li>Health information relevant to your travel</li>
                  </ul>
                  <p>
                    We also automatically collect certain information when you visit our website, including IP address, browser type, and pages visited.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl mb-4">3. How We Use Your Information</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>
                    We use the information we collect to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Process and manage your bookings and travel arrangements</li>
                    <li>Communicate with you about your trip, including important updates and changes</li>
                    <li>Provide customer support and respond to your inquiries</li>
                    <li>Process visa applications and other required documentation</li>
                    <li>Ensure your safety and well-being during your journey</li>
                    <li>Send you promotional materials and updates (with your consent)</li>
                    <li>Improve our services and website functionality</li>
                    <li>Comply with legal obligations and regulations</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl mb-4">4. Information Sharing and Disclosure</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>
                    We may share your information with:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Airlines, hotels, and other service providers necessary to fulfill your booking</li>
                    <li>Saudi Arabian authorities for visa processing and compliance purposes</li>
                    <li>Payment processors to complete transactions securely</li>
                    <li>Emergency contacts in case of urgent situations during your travel</li>
                    <li>Legal authorities when required by law or to protect rights and safety</li>
                  </ul>
                  <p>
                    We do not sell, rent, or trade your personal information to third parties for marketing purposes.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl mb-4">5. Data Security</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>
                    We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
                  </p>
                  <p>
                    These measures include:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Encryption of sensitive data during transmission</li>
                    <li>Secure storage systems with restricted access</li>
                    <li>Regular security assessments and updates</li>
                    <li>Employee training on data protection and privacy</li>
                  </ul>
                  <p>
                    However, no method of transmission over the internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl mb-4">6. Data Retention</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>
                    We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.
                  </p>
                  <p>
                    After your trip is completed, we may retain certain information for record-keeping, legal compliance, and to provide you with information about future travel opportunities.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl mb-4">7. Your Rights</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>
                    You have the right to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Access and receive a copy of your personal information</li>
                    <li>Correct inaccurate or incomplete information</li>
                    <li>Request deletion of your information (subject to legal obligations)</li>
                    <li>Withdraw consent for marketing communications</li>
                    <li>Object to certain processing of your information</li>
                    <li>Lodge a complaint with relevant data protection authorities</li>
                  </ul>
                  <p>
                    To exercise these rights, please contact us at privacy@rehaaltravel.com.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl mb-4">8. Cookies and Tracking Technologies</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>
                    Our website uses cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and understand user preferences.
                  </p>
                  <p>
                    You can control cookie settings through your browser preferences. However, disabling cookies may affect website functionality.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl mb-4">9. Children's Privacy</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>
                    Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children without parental consent.
                  </p>
                  <p>
                    When booking for minors, parents or guardians must provide necessary information and consent on their behalf.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl mb-4">10. Changes to This Privacy Policy</h2>
                <div className="text-muted-foreground space-y-3">
                  <p>
                    We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on our website and updating the "Last Updated" date.
                  </p>
                  <p>
                    We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl mb-4">11. Contact Us</h2>
                <div className="text-muted-foreground">
                  <p>
                    If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:
                  </p>
                  <div className="mt-4 space-y-1">
                    <p>Email: privacy@rehaaltravel.com</p>
                    <p>Phone: +45 12 34 56 78</p>
                    <p>Address: Nørrebrogade 123, 2200 Copenhagen N, Denmark</p>
                  </div>
                </div>
              </section>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
