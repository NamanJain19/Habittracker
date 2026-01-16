import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Clock, Send } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function ContactPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'support@quantumlife.com',
      link: 'mailto:support@quantumlife.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+1 (555) 123-4567',
      link: 'tel:+15551234567'
    },
    {
      icon: MapPin,
      title: 'Address',
      content: '123 Innovation Drive, Tech Valley, CA 94025',
      link: null
    },
    {
      icon: Clock,
      title: 'Business Hours',
      content: 'Mon-Fri: 9:00 AM - 6:00 PM PST',
      link: null
    }
  ];

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="px-6 lg:px-8 py-20">
          <div className="max-w-[100rem] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-6 max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-to-br from-accent-teal/20 to-accent-purple/20 border border-accent-teal/30 mb-6">
                <Mail className="w-12 h-12 text-accent-teal" />
              </div>
              <h1 className="font-heading text-5xl lg:text-7xl font-bold">
                <span className="text-light-foreground">Get in</span>{' '}
                <span className="bg-gradient-to-r from-accent-teal to-accent-purple bg-clip-text text-transparent">
                  Touch
                </span>
              </h1>
              <p className="font-paragraph text-xl text-light-foreground/70 leading-relaxed">
                Have questions or feedback? We'd love to hear from you. Our team is here to help.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="px-6 lg:px-8 py-12">
          <div className="max-w-[100rem] mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-accent-teal/30 transition-all duration-300"
                >
                  <div className="p-3 rounded-xl bg-gradient-to-br from-accent-teal/20 to-accent-purple/20 border border-accent-teal/30 w-fit mb-4">
                    <info.icon className="w-6 h-6 text-accent-teal" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-light-foreground mb-2">
                    {info.title}
                  </h3>
                  {info.link ? (
                    <a
                      href={info.link}
                      className="font-paragraph text-sm text-light-foreground/70 hover:text-accent-teal transition-colors"
                    >
                      {info.content}
                    </a>
                  ) : (
                    <p className="font-paragraph text-sm text-light-foreground/70">
                      {info.content}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="px-6 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="text-center space-y-4">
                <h2 className="font-heading text-4xl lg:text-5xl font-bold text-light-foreground">
                  Send Us a Message
                </h2>
                <p className="font-paragraph text-lg text-light-foreground/70">
                  Fill out the form below and we'll get back to you as soon as possible
                </p>
              </div>

              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 lg:p-12">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="font-paragraph text-light-foreground">
                        First Name *
                      </Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        required
                        className="bg-white/5 border-white/10 text-light-foreground font-paragraph focus:border-accent-teal/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="font-paragraph text-light-foreground">
                        Last Name *
                      </Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        required
                        className="bg-white/5 border-white/10 text-light-foreground font-paragraph focus:border-accent-teal/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-paragraph text-light-foreground">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      required
                      className="bg-white/5 border-white/10 text-light-foreground font-paragraph focus:border-accent-teal/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="font-paragraph text-light-foreground">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      className="bg-white/5 border-white/10 text-light-foreground font-paragraph focus:border-accent-teal/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="font-paragraph text-light-foreground">
                      Subject *
                    </Label>
                    <Input
                      id="subject"
                      placeholder="How can we help you?"
                      required
                      className="bg-white/5 border-white/10 text-light-foreground font-paragraph focus:border-accent-teal/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="font-paragraph text-light-foreground">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your inquiry..."
                      rows={8}
                      required
                      className="bg-white/5 border-white/10 text-light-foreground font-paragraph resize-none focus:border-accent-teal/50"
                    />
                  </div>

                  <Button className="w-full bg-gradient-to-br from-accent-teal to-accent-purple text-white font-bold py-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-paragraph text-base">
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>

                  <p className="font-paragraph text-sm text-light-foreground/50 text-center">
                    We typically respond within 24 hours during business days
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Map Section (Placeholder) */}
        <section className="px-6 lg:px-8 py-20 bg-white/5 border-y border-white/10">
          <div className="max-w-[100rem] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
            >
              <div className="aspect-video bg-gradient-to-br from-accent-teal/10 to-accent-purple/10 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <MapPin className="w-16 h-16 text-accent-teal mx-auto" />
                  <p className="font-paragraph text-light-foreground/70">
                    Interactive map coming soon
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
