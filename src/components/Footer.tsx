import { Link } from 'react-router-dom';
import { Zap, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  const footerLinks = {
    product: [
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Trackers', href: '/habits' },
      { name: 'Community', href: '/community' },
      { name: 'Reminders', href: '/reminders' },
    ],
    resources: [
      { name: 'Profile', href: '/profile' },
      { name: 'Settings', href: '/settings' },
      { name: 'Support', href: '#' },
      { name: 'Documentation', href: '#' },
    ],
    company: [
      { name: 'About', href: '#' },
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Contact', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="relative w-full border-t border-white/10 bg-dark-background">
      <div className="max-w-[100rem] mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-3 group w-fit">
              <div className="p-2 rounded-lg bg-gradient-to-br from-accent-teal/20 to-accent-purple/20 border border-accent-teal/30 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-6 h-6 text-accent-teal" />
              </div>
              <span className="font-heading text-xl font-bold text-light-foreground">
                Quantum<span className="text-accent-teal">Life</span>
              </span>
            </Link>
            <p className="font-paragraph text-sm text-light-foreground/70 max-w-sm leading-relaxed">
              Your sophisticated AI-powered Life Operating System. Track habits, achieve goals, 
              and optimize every aspect of your life with cutting-edge technology.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2 rounded-lg bg-white/5 border border-white/10 text-light-foreground/70 hover:text-accent-teal hover:bg-accent-teal/10 hover:border-accent-teal/30 transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="space-y-4">
            <h3 className="font-heading text-sm font-bold text-light-foreground uppercase tracking-wider">
              Product
            </h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="font-paragraph text-sm text-light-foreground/70 hover:text-accent-teal transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-heading text-sm font-bold text-light-foreground uppercase tracking-wider">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="font-paragraph text-sm text-light-foreground/70 hover:text-accent-teal transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-heading text-sm font-bold text-light-foreground uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="font-paragraph text-sm text-light-foreground/70 hover:text-accent-teal transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-paragraph text-sm text-light-foreground/60">
              © {new Date().getFullYear()} Quantum Life Tracker. All rights reserved.
            </p>
            <p className="font-paragraph text-sm text-light-foreground/60">
              Built with <span className="text-accent-teal">❤</span> for a better tomorrow
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
