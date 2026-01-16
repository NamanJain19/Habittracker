import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, Heart, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMember } from '@/integrations';
import { useThemeStore } from '@/lib/theme-store';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { member, isAuthenticated, isLoading, actions } = useMember();
  const { theme, toggleTheme } = useThemeStore();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Habits', href: '/habits' },
    { name: 'Goals', href: '/goals' },
    { name: 'Productivity', href: '/productivity' },
    { name: 'Fitness', href: '/fitness' },
    { name: 'Wellness', href: '/wellness' },
    { name: 'Community', href: '/community' },
    { name: 'Reminders', href: '/reminders' },
    { name: 'Smart Fitness', href: '/tracker/smart-fitness' },
    { name: 'Smartwatch', href: '/tracker/smartwatch' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-light-surface dark:bg-dark-surface border-b border-light-border dark:border-dark-border shadow-soft">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Heart className="w-5 h-5 text-primary" />
            </div>
            <span className="font-semibold text-lg text-light-text dark:text-dark-text">
              HabitFlow
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm px-3 py-2 rounded-lg transition-all ${
                  isActive(item.href)
                    ? 'text-primary bg-primary/10 font-medium'
                    : 'text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text dark:hover:text-dark-text hover:bg-light-bg dark:hover:bg-dark-bg'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-bg dark:hover:bg-dark-bg transition-all"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            {/* Auth Buttons */}
            {isLoading ? (
              <div className="h-9 w-20 animate-pulse bg-light-border dark:bg-dark-border rounded-lg" />
            ) : isAuthenticated ? (
              <>
                <Link to="/profile">
                  <Button className="bg-transparent text-primary border border-primary/30 hover:bg-primary/10 transition-all rounded-lg px-4 py-2 text-sm font-medium">
                    {member?.profile?.nickname || 'Profile'}
                  </Button>
                </Link>
                <Button
                  onClick={actions.logout}
                  className="bg-transparent text-light-text-secondary dark:text-dark-text-secondary border border-light-border dark:border-dark-border hover:bg-light-bg dark:hover:bg-dark-bg transition-all rounded-lg px-4 py-2 text-sm"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Button
                onClick={actions.login}
                className="bg-primary text-white hover:bg-primary-hover transition-all rounded-lg px-5 py-2 text-sm font-medium shadow-soft hover:shadow-soft-hover"
              >
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-bg dark:hover:bg-dark-bg transition-all"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-light-text dark:text-dark-text hover:bg-light-bg dark:hover:bg-dark-bg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-light-border dark:border-dark-border animate-fade-in">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm px-4 py-3 rounded-lg transition-all ${
                    isActive(item.href)
                      ? 'text-primary bg-primary/10 font-medium'
                      : 'text-light-text-secondary dark:text-dark-text-secondary hover:text-light-text dark:hover:text-dark-text hover:bg-light-bg dark:hover:bg-dark-bg'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-3 mt-3 border-t border-light-border dark:border-dark-border space-y-2">
                {isLoading ? (
                  <div className="h-10 w-full animate-pulse bg-light-border dark:bg-dark-border rounded-lg" />
                ) : isAuthenticated ? (
                  <>
                    <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full bg-transparent text-primary border border-primary/30 hover:bg-primary/10 transition-all rounded-lg px-4 py-3 text-sm font-medium">
                        {member?.profile?.nickname || 'Profile'}
                      </Button>
                    </Link>
                    <Button
                      onClick={() => {
                        actions.logout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full bg-transparent text-light-text-secondary dark:text-dark-text-secondary border border-light-border dark:border-dark-border hover:bg-light-bg dark:hover:bg-dark-bg transition-all rounded-lg px-4 py-3 text-sm"
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => {
                      actions.login();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full bg-primary text-white hover:bg-primary-hover transition-all rounded-lg px-5 py-3 text-sm font-medium shadow-soft"
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
