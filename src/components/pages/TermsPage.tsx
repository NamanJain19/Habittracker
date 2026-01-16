import { motion } from 'framer-motion';
import { FileText, CheckCircle, AlertCircle, Scale } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsPage() {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: 'By accessing and using Quantum Life ("the Service"), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service. We reserve the right to modify these terms at any time, and your continued use of the Service constitutes acceptance of any changes.'
    },
    {
      title: '2. User Accounts',
      content: 'You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate and complete information when creating your account. You agree to notify us immediately of any unauthorized use of your account. We reserve the right to suspend or terminate accounts that violate these terms.'
    },
    {
      title: '3. Acceptable Use',
      content: 'You agree to use the Service only for lawful purposes and in accordance with these Terms. You may not use the Service to transmit harmful, offensive, or illegal content, interfere with other users\' experience, attempt to gain unauthorized access to our systems, or engage in any activity that could damage or impair the Service.'
    },
    {
      title: '4. Intellectual Property',
      content: 'All content, features, and functionality of the Service, including but not limited to text, graphics, logos, and software, are owned by Quantum Life and protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without our express written permission.'
    },
    {
      title: '5. User Content',
      content: 'You retain ownership of any content you submit to the Service. By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and display your content solely for the purpose of operating and improving the Service. You are solely responsible for your content and must ensure it does not violate any laws or third-party rights.'
    },
    {
      title: '6. Privacy and Data',
      content: 'Your use of the Service is also governed by our Privacy Policy. We collect and process your data as described in the Privacy Policy. You acknowledge that we may use aggregated, anonymized data for analytics and service improvement purposes. You have the right to access, correct, or delete your personal data as outlined in our Privacy Policy.'
    },
    {
      title: '7. Subscription and Payments',
      content: 'Certain features of the Service may require a paid subscription. Subscription fees are billed in advance on a recurring basis. You authorize us to charge your payment method for all fees. Subscriptions automatically renew unless cancelled before the renewal date. Refunds are provided at our discretion and subject to our refund policy.'
    },
    {
      title: '8. Service Availability',
      content: 'We strive to provide reliable and uninterrupted service, but we do not guarantee that the Service will be available at all times. We may suspend or discontinue the Service, or any part thereof, temporarily or permanently, with or without notice. We are not liable for any interruption, suspension, or termination of the Service.'
    },
    {
      title: '9. Disclaimer of Warranties',
      content: 'The Service is provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that the Service will be error-free, secure, or uninterrupted. We disclaim all warranties, including but not limited to merchantability, fitness for a particular purpose, and non-infringement. Your use of the Service is at your own risk.'
    },
    {
      title: '10. Limitation of Liability',
      content: 'To the maximum extent permitted by law, Quantum Life shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or goodwill, arising from your use of or inability to use the Service. Our total liability shall not exceed the amount you paid us in the twelve months preceding the claim.'
    },
    {
      title: '11. Indemnification',
      content: 'You agree to indemnify, defend, and hold harmless Quantum Life and its officers, directors, employees, and agents from any claims, liabilities, damages, losses, and expenses, including reasonable attorneys\' fees, arising out of or in any way connected with your access to or use of the Service, your violation of these Terms, or your infringement of any third-party rights.'
    },
    {
      title: '12. Termination',
      content: 'We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason, including if you breach these Terms. Upon termination, your right to use the Service will cease immediately. You may terminate your account at any time by contacting us. All provisions that should survive termination shall survive, including ownership, warranty disclaimers, and limitations of liability.'
    },
    {
      title: '13. Governing Law',
      content: 'These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Quantum Life operates, without regard to its conflict of law provisions. Any disputes arising from these Terms or your use of the Service shall be resolved in the courts of that jurisdiction.'
    },
    {
      title: '14. Changes to Terms',
      content: 'We reserve the right to modify these Terms at any time. We will notify you of any material changes by posting the new Terms on the Service and updating the "Last Updated" date. Your continued use of the Service after such changes constitutes your acceptance of the new Terms. We encourage you to review these Terms periodically.'
    },
    {
      title: '15. Contact Information',
      content: 'If you have any questions about these Terms of Service, please contact us at legal@quantumlife.com. We will respond to your inquiry as soon as reasonably possible.'
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
                <Scale className="w-12 h-12 text-accent-teal" />
              </div>
              <h1 className="font-heading text-5xl lg:text-7xl font-bold">
                <span className="text-light-foreground">Terms of</span>{' '}
                <span className="bg-gradient-to-r from-accent-teal to-accent-purple bg-clip-text text-transparent">
                  Service
                </span>
              </h1>
              <p className="font-paragraph text-xl text-light-foreground/70 leading-relaxed">
                Please read these terms carefully before using Quantum Life
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
                Welcome to Quantum Life. These Terms of Service ("Terms") govern your access to and use of our platform, 
                services, and applications. By creating an account or using our Service, you agree to be bound by these Terms. 
                Please read them carefully.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Terms Sections */}
        <section className="px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto space-y-6">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-accent-teal/30 transition-all duration-300"
              >
                <h2 className="font-heading text-2xl font-bold text-light-foreground mb-4">
                  {section.title}
                </h2>
                <p className="font-paragraph text-light-foreground/70 leading-relaxed">
                  {section.content}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Agreement Section */}
        <section className="px-6 lg:px-8 py-20 bg-white/5 border-y border-white/10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center space-y-6"
            >
              <div className="inline-flex items-center justify-center p-3 rounded-xl bg-gradient-to-br from-accent-teal/20 to-accent-purple/20 border border-accent-teal/30 mb-4">
                <CheckCircle className="w-8 h-8 text-accent-teal" />
              </div>
              <h2 className="font-heading text-4xl font-bold text-light-foreground">
                By Using Quantum Life, You Agree to These Terms
              </h2>
              <p className="font-paragraph text-lg text-light-foreground/70 max-w-2xl mx-auto">
                If you have any questions about these Terms of Service, please contact us at{' '}
                <a href="mailto:legal@quantumlife.com" className="text-accent-teal hover:underline">
                  legal@quantumlife.com
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
