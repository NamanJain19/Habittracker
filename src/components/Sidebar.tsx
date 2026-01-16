import { Link, useLocation } from 'react-router-dom';
import { X, LayoutDashboard, CheckSquare, Target, TrendingUp, Activity, Heart, Users, Bell, Watch, Dumbbell, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();

  const trackerLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Habits', href: '/habits', icon: CheckSquare },
    { name: 'Goals', href: '/goals', icon: Target },
    { name: 'Productivity', href: '/productivity', icon: TrendingUp },
    { name: 'Fitness', href: '/fitness', icon: Activity },
    { name: 'Wellness', href: '/wellness', icon: Heart },
    { name: 'Community', href: '/community', icon: Users },
    { name: 'Reminders', href: '/reminders', icon: Bell },
    { name: 'Smart Fitness', href: '/tracker/smart-fitness', icon: Dumbbell },
    { name: 'Smartwatch', href: '/tracker/smartwatch', icon: Watch },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 h-full w-72 bg-light-surface dark:bg-dark-surface border-r border-light-border dark:border-dark-border shadow-soft-lg z-50 overflow-y-auto"
          >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-4 border-b border-light-border dark:border-dark-border">
              <h2 className="text-lg font-semibold text-light-text dark:text-dark-text">
                Trackers
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-bg dark:hover:bg-dark-bg transition-colors"
                aria-label="Close sidebar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sidebar Navigation */}
            <nav className="p-4">
              <ul className="space-y-1">
                {trackerLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        onClick={onClose}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                          isActive(link.href)
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-bg dark:hover:bg-dark-bg hover:text-light-text dark:hover:text-dark-text'
                        }`}
                      >
                        <Icon className="w-5 h-5 flex-shrink-0" />
                        <span>{link.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
