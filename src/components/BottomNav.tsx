import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, TrendingUp, Zap, Heart, Users } from 'lucide-react';

export default function BottomNav() {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/productivity', icon: TrendingUp, label: 'Productivity' },
    { path: '/fitness', icon: Zap, label: 'Fitness' },
    { path: '/wellness', icon: Heart, label: 'Wellness' },
    { path: '/community', icon: Users, label: 'Community' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-light-surface dark:bg-dark-surface border-t border-light-border dark:border-dark-border shadow-soft-lg">
      <div className="max-w-[100rem] mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-around h-16 sm:h-20">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className="relative flex flex-col items-center justify-center flex-1 h-full group"
              >
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className={`flex flex-col items-center justify-center gap-1 transition-colors ${
                    active
                      ? 'text-primary'
                      : 'text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text dark:hover:text-dark-text'
                  }`}
                >
                  <item.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${active ? 'text-primary' : ''}`} />
                  <span className={`text-xs sm:text-sm font-medium ${active ? 'text-primary' : ''}`}>
                    {item.label}
                  </span>
                </motion.div>
                {active && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary rounded-b-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
