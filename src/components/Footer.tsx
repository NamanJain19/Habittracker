import { Link } from 'react-router-dom';
import { Heart, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  const footerLinks = {
    product: [
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Habits', href: '/habits' },
      { name: 'Goals', href: '/goals' },
      { name: 'Community', href: '/community' },
    ],
    resources: [
      { name: 'Profile', href: '/profile' },
      { name: 'Settings', href: '/settings' },
      { name: 'Support', href: '/support' },
      { name: 'About', href: '/about' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Contact', href: '/contact' },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="w-full border-t border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 w-fit group">
              <div className="p-2 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Heart className="w-5 h-5 text-primary" />
              </div>
              <span className="font-semibold text-lg text-light-text dark:text-dark-text">
                HabitFlow
              </span>
            </Link>
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary max-w-xs leading-relaxed">
              Build better habits, achieve your goals, and live your best life. Simple, friendly, and effective.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2 rounded-lg bg-light-bg dark:bg-dark-bg text-light-text-secondary dark:text-dark-text-secondary hover:text-primary hover:bg-primary/10 transition-all"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-light-text dark:text-dark-text">
              Product
            </h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-light-text-secondary dark:text-dark-text-secondary hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-light-text dark:text-dark-text">
              Resources
            </h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-light-text-secondary dark:text-dark-text-secondary hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold text-sm text-light-text dark:text-dark-text">
              Legal
            </h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-light-text-secondary dark:text-dark-text-secondary hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-light-border dark:border-dark-border">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
              © {new Date().getFullYear()} HabitFlow. All rights reserved.
            </p>
            <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
              Made with <span className="text-primary">♥</span> for daily users
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
