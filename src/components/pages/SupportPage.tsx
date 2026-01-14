import { motion } from 'framer-motion';
import { HelpCircle, Mail, MessageSquare, Book, Video, FileText } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function SupportPage() {
  const resources = [
    {
      icon: Book,
      title: 'Documentation',
      description: 'Comprehensive guides and tutorials to help you get started',
      action: 'Browse Docs'
    },
    {
      icon: Video,
      title: 'Video Tutorials',
      description: 'Step-by-step video guides for all features',
      action: 'Watch Videos'
    },
    {
      icon: MessageSquare,
      title: 'Community Forum',
      description: 'Connect with other users and share tips',
      action: 'Join Forum'
    },
    {
      icon: FileText,
      title: 'FAQ',
      description: 'Quick answers to common questions',
      action: 'View FAQs'
    }
  ];

  const faqs = [
    {
      question: 'How do I get started with Quantum Life?',
      answer: 'Simply sign up for a free account, complete your profile, and start adding your first habits or goals. Our onboarding guide will walk you through the key features.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes! We use industry-standard encryption to protect your data. Your information is stored securely and never shared with third parties without your explicit consent.'
    },
    {
      question: 'Can I export my data?',
      answer: 'Absolutely. You can export all your data at any time in CSV or JSON format from your account settings.'
    },
    {
      question: 'What devices are supported?',
      answer: 'Quantum Life works on all modern web browsers, and we have mobile-optimized versions for iOS and Android devices.'
    },
    {
      question: 'How much does it cost?',
      answer: 'We offer a free tier with core features, and premium plans starting at $9.99/month for advanced analytics and unlimited tracking.'
    }
  ];

  return (
    <div className="min-h-screen bg-dark-background text-light-foreground">
      <Header />
      
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
                <HelpCircle className="w-12 h-12 text-accent-teal" />
              </div>
              <h1 className="font-heading text-5xl lg:text-7xl font-bold">
                <span className="text-light-foreground">How Can We</span>{' '}
                <span className="bg-gradient-to-r from-accent-teal to-accent-purple bg-clip-text text-transparent">
                  Help You?
                </span>
              </h1>
              <p className="font-paragraph text-xl text-light-foreground/70 leading-relaxed">
                Get the support you need to make the most of Quantum Life
              </p>
            </motion.div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="px-6 lg:px-8 py-20">
          <div className="max-w-[100rem] mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {resources.map((resource, index) => (
                <motion.div
                  key={resource.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-accent-teal/30 transition-all duration-300 group"
                >
                  <div className="p-3 rounded-xl bg-gradient-to-br from-accent-teal/20 to-accent-purple/20 border border-accent-teal/30 w-fit mb-4">
                    <resource.icon className="w-6 h-6 text-accent-teal" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-light-foreground mb-2">
                    {resource.title}
                  </h3>
                  <p className="font-paragraph text-sm text-light-foreground/70 mb-4">
                    {resource.description}
                  </p>
                  <Button className="w-full bg-transparent border border-white/20 text-light-foreground hover:bg-accent-teal/10 hover:border-accent-teal/30 font-paragraph text-sm">
                    {resource.action}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="px-6 lg:px-8 py-20 bg-white/5 border-y border-white/10">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="text-center space-y-4">
                <h2 className="font-heading text-4xl lg:text-5xl font-bold text-light-foreground">
                  Contact Support
                </h2>
                <p className="font-paragraph text-lg text-light-foreground/70">
                  Can't find what you're looking for? Send us a message and we'll get back to you within 24 hours.
                </p>
              </div>

              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="font-paragraph text-light-foreground">
                        Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        className="bg-white/5 border-white/10 text-light-foreground font-paragraph"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="font-paragraph text-light-foreground">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        className="bg-white/5 border-white/10 text-light-foreground font-paragraph"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="font-paragraph text-light-foreground">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      placeholder="How can we help?"
                      className="bg-white/5 border-white/10 text-light-foreground font-paragraph"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="font-paragraph text-light-foreground">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Describe your issue or question..."
                      rows={6}
                      className="bg-white/5 border-white/10 text-light-foreground font-paragraph resize-none"
                    />
                  </div>

                  <Button className="w-full bg-gradient-to-br from-accent-teal to-accent-purple text-white font-bold py-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-paragraph text-base">
                    <Mail className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-6 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center space-y-4 mb-12"
            >
              <h2 className="font-heading text-4xl lg:text-5xl font-bold text-light-foreground">
                Frequently Asked Questions
              </h2>
              <p className="font-paragraph text-lg text-light-foreground/70">
                Quick answers to common questions
              </p>
            </motion.div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-accent-teal/30 transition-all duration-300"
                >
                  <h3 className="font-heading text-xl font-bold text-light-foreground mb-3">
                    {faq.question}
                  </h3>
                  <p className="font-paragraph text-light-foreground/70 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
