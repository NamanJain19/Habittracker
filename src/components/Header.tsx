import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMember } from '@/integrations';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { member, isAuthenticated, isLoading, actions } = useMember();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Habits', href: '/habits' },
    { name: 'Goals', href: '/goals' },
    { name: 'Productivity', href: '/productivity' },
    { name: 'Fitness', href: '/fitness' },
    { name: 'Wellness', href: '/wellness' },
    { name: 'Community', href: '/community' },
    { name: 'Reminders', href: '/reminders' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-dark-background/80 border-b border-white/10">
      <nav className="max-w-[120rem] mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2 rounded-lg bg-gradient-to-br from-accent-teal/20 to-accent-purple/20 border border-accent-teal/30 group-hover:scale-110 transition-transform duration-300">
              <Zap className="w-6 h-6 text-accent-teal" />
            </div>
            <span className="font-heading text-xl font-bold text-light-foreground">
              Quantum<span className="text-accent-teal">Life</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-paragraph text-sm px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive(item.href)
                    ? 'text-accent-teal bg-accent-teal/10'
                    : 'text-light-foreground/70 hover:text-accent-teal hover:bg-white/5'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {isLoading ? (
              <div className="h-10 w-24 animate-pulse bg-white/5 rounded-lg" />
            ) : isAuthenticated ? (
              <>
                <Link to="/profile">
                  <Button className="bg-transparent text-accent-teal border border-accent-teal/30 font-paragraph text-sm px-4 py-2 rounded-lg hover:bg-accent-teal/10 transition-all duration-300">
                    {member?.profile?.nickname || 'Profile'}
                  </Button>
                </Link>
                <Button
                  onClick={actions.logout}
                  className="bg-transparent text-light-foreground/70 border border-white/10 font-paragraph text-sm px-4 py-2 rounded-lg hover:bg-white/5 transition-all duration-300"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Button
                onClick={actions.login}
                className="bg-gradient-to-br from-accent-teal to-accent-purple text-black font-bold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-paragraph text-sm"
              >
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-light-foreground hover:bg-white/5 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/10">
            <div className="flex flex-col gap-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-paragraph text-sm px-4 py-3 rounded-lg transition-all duration-300 ${
                    isActive(item.href)
                      ? 'text-accent-teal bg-accent-teal/10'
                      : 'text-light-foreground/70 hover:text-accent-teal hover:bg-white/5'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 mt-4 border-t border-white/10 space-y-2">
                {isLoading ? (
                  <div className="h-10 w-full animate-pulse bg-white/5 rounded-lg" />
                ) : isAuthenticated ? (
                  <>
                    <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full bg-transparent text-accent-teal border border-accent-teal/30 font-paragraph text-sm px-4 py-3 rounded-lg hover:bg-accent-teal/10 transition-all duration-300">
                        {member?.profile?.nickname || 'Profile'}
                      </Button>
                    </Link>
                    <Button
                      onClick={() => {
                        actions.logout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full bg-transparent text-light-foreground/70 border border-white/10 font-paragraph text-sm px-4 py-3 rounded-lg hover:bg-white/5 transition-all duration-300"
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
                    className="w-full bg-gradient-to-br from-accent-teal to-accent-purple text-black font-bold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-paragraph text-sm"
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
