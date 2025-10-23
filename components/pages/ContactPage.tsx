import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { useLanguage } from '../../lib/contexts';
import { toast } from 'sonner';

export const ContactPage: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success('Message sent successfully! We will get back to you soon.');

    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-80 flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1742218410244-6eb97a4a6229?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXVkaSUyMGFyYWJpYSUyMHRyYXZlbHxlbnwxfHx8fDE3NjEyNDAzMTF8MA&ixlib=rb-4.1.0&q=80&w=1080)'
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative text-center text-white z-10"
        >
          <h1 className="text-4xl md:text-5xl mb-4 text-white">Get in Touch</h1>
          <p className="text-xl text-white/90">We're here to help plan your perfect journey</p>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl mb-6">Contact Information</h2>
              <p className="text-muted-foreground mb-8">
                Have questions about our packages or need assistance? Feel free to reach out to us through any of the following methods.
              </p>

              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  whileHover={{
                    x: 10,
                    scale: 1.03,
                    boxShadow: "0 15px 40px rgba(216, 167, 40, 0.25)",
                    transition: { duration: 0.4 }
                  }}
                  className="relative flex items-start space-x-4 p-5 rounded-xl bg-gradient-to-r from-card to-card/80 border-2 border-[rgb(216,167,40)]/20 hover:border-[rgb(216,167,40)]/60 transition-all overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[rgb(216,167,40)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[rgb(216,167,40)]/20 to-[rgb(186,137,10)]/10 flex items-center justify-center flex-shrink-0 relative z-10">
                    <Mail className="w-7 h-7 text-[rgb(216,167,40)]" />
                  </div>
                  <div className="relative z-10">
                    <h4 className="mb-1 font-semibold">Email</h4>
                    <a
                      href="mailto:info@rehaaltravel.com"
                      className="text-muted-foreground hover:text-[rgb(216,167,40)] transition-colors"
                    >
                      info@rehaaltravel.com
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  whileHover={{
                    x: 10,
                    scale: 1.03,
                    boxShadow: "0 15px 40px rgba(216, 167, 40, 0.25)",
                    transition: { duration: 0.4 }
                  }}
                  className="relative flex items-start space-x-4 p-5 rounded-xl bg-gradient-to-r from-card to-card/80 border-2 border-[rgb(216,167,40)]/20 hover:border-[rgb(216,167,40)]/60 transition-all overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[rgb(216,167,40)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[rgb(216,167,40)]/20 to-[rgb(186,137,10)]/10 flex items-center justify-center flex-shrink-0 relative z-10">
                    <Phone className="w-7 h-7 text-[rgb(216,167,40)]" />
                  </div>
                  <div className="relative z-10">
                    <h4 className="mb-1 font-semibold">Phone</h4>
                    <a
                      href="tel:+4512345678"
                      className="text-muted-foreground hover:text-[rgb(216,167,40)] transition-colors"
                    >
                      +45 12 34 56 78
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  whileHover={{
                    x: 10,
                    scale: 1.03,
                    boxShadow: "0 15px 40px rgba(216, 167, 40, 0.25)",
                    transition: { duration: 0.4 }
                  }}
                  className="relative flex items-start space-x-4 p-5 rounded-xl bg-gradient-to-r from-card to-card/80 border-2 border-[rgb(216,167,40)]/20 hover:border-[rgb(216,167,40)]/60 transition-all overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[rgb(216,167,40)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[rgb(216,167,40)]/20 to-[rgb(186,137,10)]/10 flex items-center justify-center flex-shrink-0 relative z-10">
                    <MapPin className="w-7 h-7 text-[rgb(216,167,40)]" />
                  </div>
                  <div className="relative z-10">
                    <h4 className="mb-1 font-semibold">Address</h4>
                    <p className="text-muted-foreground">
                      Nørrebrogade 123<br />
                      2200 Copenhagen N<br />
                      Denmark
                    </p>
                  </div>
                </motion.div>
              </div>

              <div className="mt-12">
                <h3 className="text-xl mb-4">Office Hours</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-card p-8 rounded-xl shadow-lg border border-border">
                <h2 className="text-2xl mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block mb-2">
                      {t('name')}
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block mb-2">
                      {t('email')}
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your.email@example.com"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block mb-2">
                      {t('phone')}
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+45 12 34 56 78"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block mb-2">
                      {t('message')}
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us about your travel plans or questions..."
                      rows={6}
                      className="w-full"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    style={{ backgroundColor: 'rgb(216, 167, 40)' }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        {t('submit')}
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};
