import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Database, UserCheck, FileText } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';

export default function PrivacyPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sections = [
    {
      icon: Database,
      title: 'Information We Collect',
      content: [
        'Account information (name, email, profile details)',
        'Usage data (habits, goals, productivity logs, fitness activities)',
        'Device information (browser type, IP address, device identifiers)',
        'Cookies and similar tracking technologies'
      ]
    },
    {
      icon: Lock,
      title: 'How We Use Your Information',
      content: [
        'To provide and improve our services',
        'To personalize your experience and recommendations',
        'To communicate with you about updates and features',
        'To analyze usage patterns and optimize performance',
        'To ensure security and prevent fraud'
      ]
    },
    {
      icon: Shield,
      title: 'Data Security',
      content: [
        'Industry-standard encryption for data in transit and at rest',
        'Regular security audits and vulnerability assessments',
        'Strict access controls and authentication requirements',
        'Secure data centers with 24/7 monitoring',
        'Regular backups and disaster recovery procedures'
      ]
    },
    {
      icon: Eye,
      title: 'Data Sharing',
      content: [
        'We never sell your personal information to third parties',
        'Data is only shared with your explicit consent',
        'Service providers are bound by strict confidentiality agreements',
        'Anonymous, aggregated data may be used for research',
        'Legal compliance when required by law'
      ]
    },
    {
      icon: UserCheck,
      title: 'Your Rights',
      content: [
        'Access your personal data at any time',
        'Request corrections to inaccurate information',
        'Delete your account and associated data',
        'Export your data in portable formats',
        'Opt-out of marketing communications',
        'Object to certain data processing activities'
      ]
    },
    {
      icon: FileText,
      title: 'Data Retention',
      content: [
        'Active account data is retained as long as your account exists',
        'Deleted data is permanently removed within 30 days',
        'Backup copies are retained for 90 days for recovery purposes',
        'Anonymous analytics data may be retained indefinitely',
        'Legal requirements may necessitate longer retention periods'
      ]
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
                <Shield className="w-12 h-12 text-accent-teal" />
              </div>
              <h1 className="font-heading text-5xl lg:text-7xl font-bold">
                <span className="text-light-foreground">Privacy</span>{' '}
                <span className="bg-gradient-to-r from-accent-teal to-accent-purple bg-clip-text text-transparent">
                  Policy
                </span>
              </h1>
              <p className="font-paragraph text-xl text-light-foreground/70 leading-relaxed">
                Your privacy is our priority. Learn how we collect, use, and protect your data.
              </p>
              <p className="font-paragraph text-sm text-light-foreground/50">
                Last updated: January 14, 2026
              </p>
            </motion.div>
          </div>
        </section>

        {/* Introduction */}
        <section className="px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8"
            >
              <p className="font-paragraph text-lg text-light-foreground/70 leading-relaxed">
                At Quantum Life, we are committed to protecting your privacy and ensuring the security of your personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you use our platform. 
                By using Quantum Life, you agree to the practices described in this policy.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Policy Sections */}
        <section className="px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-accent-teal/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-accent-teal/20 to-accent-purple/20 border border-accent-teal/30 flex-shrink-0">
                    <section.icon className="w-6 h-6 text-accent-teal" />
                  </div>
                  <h2 className="font-heading text-3xl font-bold text-light-foreground">
                    {section.title}
                  </h2>
                </div>
                <ul className="space-y-3 ml-16">
                  {section.content.map((item, idx) => (
                    <li key={idx} className="font-paragraph text-light-foreground/70 leading-relaxed flex items-start gap-3">
                      <span className="text-accent-teal mt-1.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="px-6 lg:px-8 py-20 bg-white/5 border-y border-white/10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center space-y-6"
            >
              <h2 className="font-heading text-4xl font-bold text-light-foreground">
                Questions About Privacy?
              </h2>
              <p className="font-paragraph text-lg text-light-foreground/70 max-w-2xl mx-auto">
                If you have any questions or concerns about our privacy practices, please don't hesitate to contact us at{' '}
                <a href="mailto:privacy@quantumlife.com" className="text-accent-teal hover:underline">
                  privacy@quantumlife.com
                </a>
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
