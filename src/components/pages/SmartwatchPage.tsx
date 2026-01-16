import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Watch, Heart, Footprints, Flame, Moon, Activity, Droplet, TrendingUp, RefreshCw, Smartphone, CheckCircle2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function SmartwatchPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [lastSync, setLastSync] = useState<Date | null>(null);
  const [manualEntryOpen, setManualEntryOpen] = useState(false);

  // Sample fitness data (in real app, this would come from API/CMS)
  const [fitnessData, setFitnessData] = useState({
    steps: 7842,
    stepsGoal: 10000,
    calories: 342,
    caloriesGoal: 500,
    heartRate: 72,
    sleepHours: 7.5,
    sleepGoal: 8,
    activeMinutes: 45,
    activeGoal: 60,
  });

  const handleConnect = () => {
    setIsConnected(true);
    setLastSync(new Date());
  };

  const handleSync = () => {
    setLastSync(new Date());
    // In real app, fetch data from smartwatch API
  };

  const handleManualEntry = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setFitnessData({
      ...fitnessData,
      steps: Number(formData.get('steps')) || fitnessData.steps,
      calories: Number(formData.get('calories')) || fitnessData.calories,
      heartRate: Number(formData.get('heartRate')) || fitnessData.heartRate,
      sleepHours: Number(formData.get('sleepHours')) || fitnessData.sleepHours,
      activeMinutes: Number(formData.get('activeMinutes')) || fitnessData.activeMinutes,
    });
    setManualEntryOpen(false);
    setLastSync(new Date());
  };

  const stepsPercentage = (fitnessData.steps / fitnessData.stepsGoal) * 100;
  const caloriesPercentage = (fitnessData.calories / fitnessData.caloriesGoal) * 100;
  const sleepPercentage = (fitnessData.sleepHours / fitnessData.sleepGoal) * 100;
  const activePercentage = (fitnessData.activeMinutes / fitnessData.activeGoal) * 100;

  const aiInsights = [
    { message: "Great activity today, keep going!", icon: TrendingUp, color: "text-primary" },
    { message: "You're 78% to your step goal!", icon: Footprints, color: "text-accent-teal" },
    { message: "Remember to stay hydrated", icon: Droplet, color: "text-accent-purple" },
  ];

  const smartReminders = [
    { title: "Time to Move", description: "You've been sitting for 45 minutes", icon: Activity },
    { title: "Hydration Check", description: "Drink a glass of water", icon: Droplet },
    { title: "Sleep Reminder", description: "Wind down in 30 minutes", icon: Moon },
  ];

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
      <Header />

      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[100rem] mx-auto space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-light-text dark:text-dark-text">
              Smartwatch Integration
            </h1>
            <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary">
              Track your fitness data from your smartwatch or fitness app
            </p>
          </motion.div>

          {/* Connection Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-xl p-6"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Watch className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-light-text dark:text-dark-text">
                    {isConnected ? 'Connected' : 'Not Connected'}
                  </h2>
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    {isConnected
                      ? `Last synced: ${lastSync?.toLocaleTimeString()}`
                      : 'Connect your smartwatch or fitness app'}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                {!isConnected ? (
                  <Button
                    onClick={handleConnect}
                    className="bg-primary text-white hover:bg-primary-hover rounded-lg px-6 py-2 font-medium shadow-soft"
                  >
                    <Smartphone className="w-4 h-4 mr-2" />
                    Connect Device
                  </Button>
                ) : (
                  <Button
                    onClick={handleSync}
                    className="bg-transparent text-primary border border-primary/30 hover:bg-primary/10 rounded-lg px-6 py-2 font-medium"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Sync Now
                  </Button>
                )}
                <Dialog open={manualEntryOpen} onOpenChange={setManualEntryOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-transparent text-light-text dark:text-dark-text border border-light-border dark:border-dark-border hover:bg-light-bg dark:hover:bg-dark-bg rounded-lg px-6 py-2">
                      Manual Entry
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border">
                    <DialogHeader>
                      <DialogTitle className="text-light-text dark:text-dark-text">Enter Your Data Manually</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleManualEntry} className="space-y-4">
                      <div>
                        <Label htmlFor="steps" className="text-light-text dark:text-dark-text">Steps</Label>
                        <Input
                          id="steps"
                          name="steps"
                          type="number"
                          placeholder={fitnessData.steps.toString()}
                          className="bg-light-bg dark:bg-dark-bg border-light-border dark:border-dark-border text-light-text dark:text-dark-text"
                        />
                      </div>
                      <div>
                        <Label htmlFor="calories" className="text-light-text dark:text-dark-text">Calories Burned</Label>
                        <Input
                          id="calories"
                          name="calories"
                          type="number"
                          placeholder={fitnessData.calories.toString()}
                          className="bg-light-bg dark:bg-dark-bg border-light-border dark:border-dark-border text-light-text dark:text-dark-text"
                        />
                      </div>
                      <div>
                        <Label htmlFor="heartRate" className="text-light-text dark:text-dark-text">Heart Rate (bpm)</Label>
                        <Input
                          id="heartRate"
                          name="heartRate"
                          type="number"
                          placeholder={fitnessData.heartRate.toString()}
                          className="bg-light-bg dark:bg-dark-bg border-light-border dark:border-dark-border text-light-text dark:text-dark-text"
                        />
                      </div>
                      <div>
                        <Label htmlFor="sleepHours" className="text-light-text dark:text-dark-text">Sleep (hours)</Label>
                        <Input
                          id="sleepHours"
                          name="sleepHours"
                          type="number"
                          step="0.5"
                          placeholder={fitnessData.sleepHours.toString()}
                          className="bg-light-bg dark:bg-dark-bg border-light-border dark:border-dark-border text-light-text dark:text-dark-text"
                        />
                      </div>
                      <div>
                        <Label htmlFor="activeMinutes" className="text-light-text dark:text-dark-text">Active Minutes</Label>
                        <Input
                          id="activeMinutes"
                          name="activeMinutes"
                          type="number"
                          placeholder={fitnessData.activeMinutes.toString()}
                          className="bg-light-bg dark:bg-dark-bg border-light-border dark:border-dark-border text-light-text dark:text-dark-text"
                        />
                      </div>
                      <Button type="submit" className="w-full bg-primary text-white hover:bg-primary-hover rounded-lg py-2 font-medium">
                        Save Data
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </motion.div>

          {/* Compatibility Info */}
          {!isConnected && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-primary/10 border border-primary/20 rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-light-text dark:text-dark-text mb-3">
                Compatible Devices & Apps
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['Apple Watch', 'Fitbit', 'Garmin', 'Samsung Health', 'Google Fit', 'Strava', 'MyFitnessPal', 'Other Apps'].map((app) => (
                  <div
                    key={app}
                    className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-lg p-3 text-center text-sm text-light-text dark:text-dark-text"
                  >
                    {app}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Main Stats - Activity Rings */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Steps */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-xl p-6 hover:shadow-soft-lg transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <Footprints className="w-6 h-6 text-primary" />
                <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Today</span>
              </div>
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-light-border dark:text-dark-border"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - stepsPercentage / 100)}`}
                    className="text-primary transition-all duration-1000"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-3xl font-bold text-light-text dark:text-dark-text">
                    {fitnessData.steps.toLocaleString()}
                  </div>
                  <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                    of {fitnessData.stepsGoal.toLocaleString()}
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-light-text dark:text-dark-text text-center">Steps</h3>
            </motion.div>

            {/* Calories */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-xl p-6 hover:shadow-soft-lg transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <Flame className="w-6 h-6 text-accent-teal" />
                <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Today</span>
              </div>
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-light-border dark:text-dark-border"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - caloriesPercentage / 100)}`}
                    className="text-accent-teal transition-all duration-1000"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-3xl font-bold text-light-text dark:text-dark-text">
                    {fitnessData.calories}
                  </div>
                  <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                    of {fitnessData.caloriesGoal}
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-light-text dark:text-dark-text text-center">Calories</h3>
            </motion.div>

            {/* Heart Rate */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-xl p-6 hover:shadow-soft-lg transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <Heart className="w-6 h-6 text-accent-purple" />
                <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Current</span>
              </div>
              <div className="flex flex-col items-center justify-center h-32 mb-4">
                <div className="text-5xl font-bold text-light-text dark:text-dark-text">
                  {fitnessData.heartRate}
                </div>
                <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary mt-2">
                  bpm
                </div>
              </div>
              <h3 className="text-lg font-semibold text-light-text dark:text-dark-text text-center">Heart Rate</h3>
            </motion.div>

            {/* Sleep */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-xl p-6 hover:shadow-soft-lg transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <Moon className="w-6 h-6 text-primary" />
                <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Last Night</span>
              </div>
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-light-border dark:text-dark-border"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - sleepPercentage / 100)}`}
                    className="text-primary transition-all duration-1000"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-3xl font-bold text-light-text dark:text-dark-text">
                    {fitnessData.sleepHours}
                  </div>
                  <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                    of {fitnessData.sleepGoal}h
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-light-text dark:text-dark-text text-center">Sleep</h3>
            </motion.div>
          </div>

          {/* Active Minutes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Activity className="w-6 h-6 text-accent-teal" />
                <h3 className="text-xl font-semibold text-light-text dark:text-dark-text">Active Minutes</h3>
              </div>
              <span className="text-2xl font-bold text-accent-teal">
                {fitnessData.activeMinutes}/{fitnessData.activeGoal}
              </span>
            </div>
            <div className="w-full bg-light-border dark:bg-dark-border rounded-full h-4 overflow-hidden">
              <div
                className="bg-accent-teal h-full rounded-full transition-all duration-1000"
                style={{ width: `${Math.min(activePercentage, 100)}%` }}
              />
            </div>
          </motion.div>

          {/* AI Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold text-light-text dark:text-dark-text mb-4">AI Fitness Insights</h3>
            <div className="space-y-3">
              {aiInsights.map((insight, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-light-bg dark:bg-dark-bg rounded-lg"
                >
                  <insight.icon className={`w-5 h-5 ${insight.color}`} />
                  <p className="text-light-text dark:text-dark-text">{insight.message}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Smart Reminders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold text-light-text dark:text-dark-text mb-4">Smart Reminders</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {smartReminders.map((reminder, index) => (
                <div
                  key={index}
                  className="bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg p-4"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <reminder.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h4 className="font-semibold text-light-text dark:text-dark-text">{reminder.title}</h4>
                  </div>
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    {reminder.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Daily Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-primary/10 border border-primary/20 rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold text-light-text dark:text-dark-text mb-4">Today's Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span className="text-light-text dark:text-dark-text">
                  You've completed <strong>{Math.round(stepsPercentage)}%</strong> of your step goal
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span className="text-light-text dark:text-dark-text">
                  <strong>{fitnessData.activeMinutes}</strong> active minutes logged
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span className="text-light-text dark:text-dark-text">
                  Heart rate is <strong>normal</strong> ({fitnessData.heartRate} bpm)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span className="text-light-text dark:text-dark-text">
                  Sleep quality: <strong>{Math.round(sleepPercentage)}%</strong> of goal
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
