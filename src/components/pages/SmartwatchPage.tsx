import { useState } from 'react';
import { motion } from 'framer-motion';
import { Watch, Smartphone, Watch as WatchIcon } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';

export default function SmartwatchPage() {
  const [connectionStatus, setConnectionStatus] = useState<'not-connected' | 'coming-soon'>('not-connected');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleConnect = () => {
    setConnectionStatus('coming-soon');
  };

  const supportedDevices = [
    { name: 'Google Fit', icon: '🏃' },
    { name: 'Apple Health', icon: '🍎' },
    { name: 'Fitbit', icon: '⌚' },
  ];

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[100rem] mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-light-text dark:text-dark-text mb-4">
              Smartwatch Integration
            </h1>
            <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
              Connect your smartwatch to sync fitness data and track your wellness journey
            </p>
          </motion.div>

          {/* Main Connection Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-2xl p-8 sm:p-12 text-center hover:shadow-soft-lg transition-all">
              {/* Icon */}
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Watch className="w-12 h-12 text-primary" />
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-bold text-light-text dark:text-dark-text mb-3">
                Connect Your Smartwatch
              </h2>

              {/* Description */}
              <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6 max-w-md mx-auto">
                Sync your fitness data to track activity and wellness
              </p>

              {/* Status */}
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border">
                  <div className={`w-2 h-2 rounded-full ${connectionStatus === 'not-connected' ? 'bg-light-text-secondary dark:bg-dark-text-secondary' : 'bg-primary'}`} />
                  <span className="text-sm text-light-text dark:text-dark-text">
                    {connectionStatus === 'not-connected' ? 'No smartwatch connected' : 'Connection feature coming soon'}
                  </span>
                </div>
              </div>

              {/* Connect Button */}
              <Button
                onClick={handleConnect}
                className="bg-primary text-white hover:bg-primary-hover rounded-lg px-8 py-3 text-lg font-medium shadow-soft hover:shadow-soft-hover hover:scale-105 transition-all mb-8"
              >
                <Smartphone className="w-5 h-5 mr-2" />
                Connect Smartwatch
              </Button>

              {/* Supported Devices */}
              <div className="border-t border-light-border dark:border-dark-border pt-6">
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-4">
                  Supported Devices
                </p>
                <div className="flex flex-wrap justify-center gap-3 mb-4">
                  {supportedDevices.map((device) => (
                    <div
                      key={device.name}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border"
                    >
                      <span className="text-lg">{device.icon}</span>
                      <span className="text-sm text-light-text dark:text-dark-text">{device.name}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                  More devices coming soon
                </p>
              </div>
            </div>
          </motion.div>

          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto mt-8"
          >
            <div className="bg-primary/10 border border-primary/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-3">
                What You'll Be Able to Track
              </h3>
              <ul className="space-y-2 text-light-text-secondary dark:text-dark-text-secondary">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>Daily activity and steps</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>Heart rate monitoring</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>Sleep patterns</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>Workout sessions</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
