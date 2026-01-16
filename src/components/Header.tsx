import { Link } from 'react-router-dom';
import { Heart, Sun, Moon, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMember } from '@/integrations';
import { useThemeStore } from '@/lib/theme-store';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface HeaderProps {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { member, isAuthenticated, isLoading, actions } = useMember();
  const { theme, toggleTheme } = useThemeStore();

  return (
    <header className="sticky top-0 z-40 bg-light-surface dark:bg-dark-surface border-b border-light-border dark:border-dark-border shadow-soft">
      <nav className="max-w-[120rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Menu Button + Logo */}
          <div className="flex items-center gap-3">
            {onMenuClick && (
              <button
                onClick={onMenuClick}
                className="p-2 rounded-lg text-light-text dark:text-dark-text hover:bg-light-bg dark:hover:bg-dark-bg transition-all"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-2 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Heart className="w-5 h-5 text-primary" />
              </div>
              <span className="font-semibold text-lg text-light-text dark:text-dark-text">
                HabitFlow
              </span>
            </Link>
          </div>

          {/* Right: Theme Toggle + User Info + Auth */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-light-text-secondary dark:text-dark-text-secondary hover:bg-light-bg dark:hover:bg-dark-bg transition-all"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            {/* Auth Section */}
            {isLoading ? (
              <div className="h-9 w-20 animate-pulse bg-light-border dark:bg-dark-border rounded-lg" />
            ) : isAuthenticated ? (
              <Link to="/profile" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-light-bg dark:hover:bg-dark-bg transition-colors">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {member?.profile?.nickname?.[0]?.toUpperCase() || <User className="w-4 h-4" />}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline text-sm font-medium text-light-text dark:text-dark-text">
                  {member?.profile?.nickname || 'Profile'}
                </span>
              </Link>
            ) : (
              <Button
                onClick={actions.login}
                className="bg-primary text-white hover:bg-primary-hover transition-all rounded-lg px-5 py-2 text-sm font-medium shadow-soft hover:shadow-soft-hover"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
