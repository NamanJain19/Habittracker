import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Watch, Smartphone, CheckCircle2, X, Activity, Heart, Footprints, Moon, Clock, TrendingUp, Apple, Shield } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';

type ConnectionState = 'not-connected' | 'connecting' | 'connected';

export default function SmartwatchPage() {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionState>('not-connected');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [connectedPlatform, setConnectedPlatform] = useState<'Google Fit' | 'Apple Health'>('Google Fit');
  const [lastSynced, setLastSynced] = useState<string>('');

  // Load connection status from localStorage
  useEffect(() => {
    const savedStatus = localStorage.getItem('smartwatch-connection-status');
    const savedPlatform = localStorage.getItem('smartwatch-platform');
    const savedSyncTime = localStorage.getItem('smartwatch-last-sync');
    
    if (savedStatus === 'connected') {
      setConnectionStatus('connected');
      if (savedPlatform) setConnectedPlatform(savedPlatform as 'Google Fit' | 'Apple Health');
      if (savedSyncTime) setLastSynced(savedSyncTime);
    }
  }, []);

  const handleConnect = () => {
    setConnectionStatus('connecting');
    
    // Simulate connection process (3 seconds)
    setTimeout(() => {
      const platform = Math.random() > 0.5 ? 'Google Fit' : 'Apple Health';
      const syncTime = 'Just now';
      
      setConnectionStatus('connected');
      setConnectedPlatform(platform);
      setLastSynced(syncTime);
      
      // Save to localStorage
      localStorage.setItem('smartwatch-connection-status', 'connected');
      localStorage.setItem('smartwatch-platform', platform);
      localStorage.setItem('smartwatch-last-sync', syncTime);
    }, 3000);
  };

  const handleDisconnect = () => {
    setConnectionStatus('not-connected');
    localStorage.removeItem('smartwatch-connection-status');
    localStorage.removeItem('smartwatch-platform');
    localStorage.removeItem('smartwatch-last-sync');
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="pt-24 pb-32 px-4 sm:px-6 lg:px-8">
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
              Connect your smartwatch via mobile to sync fitness and wellness data
            </p>
          </motion.div>

          {/* Main Connection Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <AnimatePresence mode="wait">
              {connectionStatus === 'not-connected' && (
                <motion.div
                  key="not-connected"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-2xl p-8 sm:p-12 text-center"
                >
                  {/* Icon */}
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-light-bg dark:bg-dark-bg border-2 border-light-border dark:border-dark-border flex items-center justify-center">
                    <Watch className="w-12 h-12 text-light-text-secondary dark:text-dark-text-secondary" />
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl sm:text-3xl font-bold text-light-text dark:text-dark-text mb-3">
                    No Smartwatch Connected
                  </h2>

                  {/* Description */}
                  <p className="text-light-text-secondary dark:text-dark-text-secondary mb-8 max-w-md mx-auto">
                    Connect your smartwatch through your mobile device to start syncing fitness data
                  </p>

                  {/* Connect Button */}
                  <Button
                    onClick={handleConnect}
                    className="bg-primary text-white hover:bg-primary-hover rounded-lg px-8 py-3 text-lg font-medium shadow-soft hover:shadow-soft-hover hover:scale-105 transition-all"
                  >
                    <Smartphone className="w-5 h-5 mr-2" />
                    Connect via Mobile
                  </Button>
                </motion.div>
              )}

              {connectionStatus === 'connected' && (
                <motion.div
                  key="connected"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-2xl p-8 sm:p-12 text-center"
                >
                  {/* Success Icon with Animation */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="w-24 h-24 mx-auto mb-6 rounded-full bg-success/10 flex items-center justify-center"
                  >
                    <CheckCircle2 className="w-12 h-12 text-success" />
                  </motion.div>

                  {/* Title */}
                  <h2 className="text-2xl sm:text-3xl font-bold text-light-text dark:text-dark-text mb-2">
                    Smartwatch Connected Successfully
                  </h2>

                  {/* Subtitle */}
                  <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
                    Connected via your mobile device
                  </p>

                  {/* Platform Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-2">
                    {connectedPlatform === 'Apple Health' ? (
                      <Apple className="w-4 h-4 text-primary" />
                    ) : (
                      <Activity className="w-4 h-4 text-primary" />
                    )}
                    <span className="text-sm font-medium text-primary">
                      {connectedPlatform}
                    </span>
                  </div>

                  {/* Last Synced */}
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-8">
                    Last synced: {lastSynced}
                  </p>

                  {/* Disconnect Button */}
                  <Button
                    onClick={handleDisconnect}
                    variant="outline"
                    className="border-light-border dark:border-dark-border text-light-text dark:text-dark-text hover:bg-light-bg dark:hover:bg-dark-bg"
                  >
                    Disconnect
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Supported Devices Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-2xl p-8">
              <h3 className="text-xl font-bold text-light-text dark:text-dark-text mb-6 text-center">
                Supported Devices
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                {/* Apple Watch */}
                <div className="flex flex-col items-center p-4 rounded-xl bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border">
                  <div className="w-12 h-12 rounded-full bg-light-surface dark:bg-dark-surface flex items-center justify-center mb-3">
                    <Apple className="w-6 h-6 text-light-text dark:text-dark-text" />
                  </div>
                  <p className="text-sm font-medium text-light-text dark:text-dark-text mb-1">Apple Watch</p>
                  <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary text-center">via Apple Health</p>
                </div>

                {/* Wear OS */}
                <div className="flex flex-col items-center p-4 rounded-xl bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border">
                  <div className="w-12 h-12 rounded-full bg-light-surface dark:bg-dark-surface flex items-center justify-center mb-3">
                    <Watch className="w-6 h-6 text-light-text dark:text-dark-text" />
                  </div>
                  <p className="text-sm font-medium text-light-text dark:text-dark-text mb-1">Wear OS</p>
                  <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary text-center">via Google Fit</p>
                </div>

                {/* Fitbit */}
                <div className="flex flex-col items-center p-4 rounded-xl bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border opacity-60">
                  <div className="w-12 h-12 rounded-full bg-light-surface dark:bg-dark-surface flex items-center justify-center mb-3">
                    <Activity className="w-6 h-6 text-light-text dark:text-dark-text" />
                  </div>
                  <p className="text-sm font-medium text-light-text dark:text-dark-text mb-1">Fitbit</p>
                  <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary text-center">Coming Soon</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10">
                <Smartphone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  Smartwatch data syncs securely through your mobile device
                </p>
              </div>
            </div>
          </motion.div>

          {/* Data Scope Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto mb-8"
          >
            <div className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-2xl p-8">
              <h3 className="text-xl font-bold text-light-text dark:text-dark-text mb-6 text-center">
                Data You Can Track
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { icon: Footprints, label: 'Steps', color: 'text-accent-teal' },
                  { icon: Activity, label: 'Calories', color: 'text-accent-purple' },
                  { icon: Heart, label: 'Heart Rate', color: 'text-error' },
                  { icon: Moon, label: 'Sleep Duration', color: 'text-info' },
                  { icon: Clock, label: 'Active Time', color: 'text-warning' },
                  { icon: TrendingUp, label: 'Workout Summary', color: 'text-success' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col items-center p-4 rounded-xl bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border"
                  >
                    <item.icon className={`w-6 h-6 ${item.color} mb-2`} />
                    <p className="text-sm font-medium text-light-text dark:text-dark-text text-center mb-1">
                      {item.label}
                    </p>
                    <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary text-center">
                      {connectionStatus === 'connected' ? 'Data will appear after syncing fitness app' : 'Available after connection'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Security Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto"
          >
            <div className="flex items-start gap-3 p-6 rounded-xl bg-info/5 border border-info/10">
              <Shield className="w-5 h-5 text-info flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-light-text dark:text-dark-text mb-1">
                  Your Privacy is Protected
                </p>
                <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                  We only access fitness summary data. No medical data is stored.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Connecting Modal */}
      <AnimatePresence>
        {connectionStatus === 'connecting' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-2xl p-8 max-w-md w-full"
            >
              {/* Loading Animation */}
              <div className="flex justify-center mb-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="w-16 h-16 rounded-full border-4 border-light-border dark:border-dark-border border-t-primary"
                />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-light-text dark:text-dark-text text-center mb-2">
                Connecting via mobile…
              </h3>
              <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary text-center mb-8">
                Please wait while we establish the connection
              </p>

              {/* Steps */}
              <div className="space-y-4">
                {[
                  { step: 1, text: 'Open mobile fitness app', delay: 0 },
                  { step: 2, text: 'Allow fitness permissions', delay: 0.8 },
                  { step: 3, text: 'Sync smartwatch with phone', delay: 1.6 },
                ].map((item) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: item.delay }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-light-bg dark:bg-dark-bg"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-primary">{item.step}</span>
                    </div>
                    <p className="text-sm text-light-text dark:text-dark-text">{item.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
