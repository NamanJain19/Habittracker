import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  Heart,
  Footprints,
  Flame,
  Moon,
  Clock,
  TrendingUp,
  Droplets,
  Dumbbell,
  CheckCircle,
  Circle,
  Calendar,
  Bell,
  Smartphone,
  Scale,
  Target,
  Sparkles,
  Plus,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';

export default function SmartFitnessPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock data - in real app, this would come from API/CMS
  const fitnessData = {
    steps: { current: 8234, goal: 10000 },
    calories: { current: 420, goal: 600 },
    heartRate: { current: 72, resting: 65 },
    sleep: { current: 7.2, goal: 8 },
    activeTime: { current: 45, goal: 60 },
    water: { current: 6, goal: 8 },
  };

  const workoutPlan = [
    { name: 'Morning Stretch', completed: true, time: '7:00 AM' },
    { name: 'Cardio Session', completed: true, time: '8:30 AM' },
    { name: 'Strength Training', completed: false, time: '6:00 PM' },
    { name: 'Evening Walk', completed: false, time: '7:30 PM' },
  ];

  const bodyMetrics = {
    weight: { current: 72.5, previous: 73.2, unit: 'kg' },
    bmi: 22.8,
    weeklyChange: -0.7,
  };

  const aiInsights = [
    {
      icon: Sparkles,
      title: 'Great Progress!',
      message: "You've been consistent with your morning workouts. Keep it up!",
      type: 'success',
    },
    {
      icon: Droplets,
      title: 'Stay Hydrated',
      message: 'You drank 6 glasses today. Try to reach 8 for optimal hydration.',
      type: 'info',
    },
    {
      icon: Moon,
      title: 'Rest Day Recommended',
      message: "You've worked out 5 days straight. Consider a rest day tomorrow.",
      type: 'warning',
    },
  ];

  const reminders = [
    { title: 'Drink Water', time: 'Every 2 hours', active: true, icon: Droplets },
    { title: 'Take a Walk', time: '3:00 PM', active: true, icon: Footprints },
    { title: 'Evening Workout', time: '6:00 PM', active: true, icon: Dumbbell },
    { title: 'Sleep Time', time: '10:30 PM', active: false, icon: Moon },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-light-text dark:text-dark-text mb-2">
                Smart Fitness & Body Analysis
              </h1>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">
                Track your fitness journey, monitor your health, and get AI-powered insights
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary-hover text-white rounded-xl px-6 py-3 shadow-soft hover:shadow-soft-hover transition-all">
              <Smartphone className="w-4 h-4 mr-2" />
              Connect Device
            </Button>
          </div>
        </motion.div>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-xl p-1 mb-8 w-full sm:w-auto overflow-x-auto">
            <TabsTrigger value="overview" className="rounded-lg px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white">
              Overview
            </TabsTrigger>
            <TabsTrigger value="workout" className="rounded-lg px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white">
              Workouts
            </TabsTrigger>
            <TabsTrigger value="body" className="rounded-lg px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white">
              Body Analysis
            </TabsTrigger>
            <TabsTrigger value="insights" className="rounded-lg px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white">
              AI Insights
            </TabsTrigger>
            <TabsTrigger value="reminders" className="rounded-lg px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white">
              Reminders
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {/* Daily Steps */}
              <motion.div variants={itemVariants}>
                <Card className="p-6 bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border hover:shadow-soft-hover transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-primary/10">
                      <Footprints className="w-6 h-6 text-primary" />
                    </div>
                    <Badge className="bg-primary/10 text-primary border-0">
                      {Math.round((fitnessData.steps.current / fitnessData.steps.goal) * 100)}%
                    </Badge>
                  </div>
                  <h3 className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">
                    Daily Steps
                  </h3>
                  <p className="text-3xl font-bold text-light-text dark:text-dark-text mb-3">
                    {fitnessData.steps.current.toLocaleString()}
                  </p>
                  <Progress
                    value={(fitnessData.steps.current / fitnessData.steps.goal) * 100}
                    className="h-2 mb-2"
                  />
                  <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                    Goal: {fitnessData.steps.goal.toLocaleString()} steps
                  </p>
                </Card>
              </motion.div>

              {/* Calories Burned */}
              <motion.div variants={itemVariants}>
                <Card className="p-6 bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border hover:shadow-soft-hover transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-warning/10">
                      <Flame className="w-6 h-6 text-warning" />
                    </div>
                    <Badge className="bg-warning/10 text-warning border-0">
                      {Math.round((fitnessData.calories.current / fitnessData.calories.goal) * 100)}%
                    </Badge>
                  </div>
                  <h3 className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">
                    Calories Burned
                  </h3>
                  <p className="text-3xl font-bold text-light-text dark:text-dark-text mb-3">
                    {fitnessData.calories.current}
                  </p>
                  <Progress
                    value={(fitnessData.calories.current / fitnessData.calories.goal) * 100}
                    className="h-2 mb-2"
                  />
                  <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                    Goal: {fitnessData.calories.goal} kcal
                  </p>
                </Card>
              </motion.div>

              {/* Heart Rate */}
              <motion.div variants={itemVariants}>
                <Card className="p-6 bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border hover:shadow-soft-hover transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-error/10">
                      <Heart className="w-6 h-6 text-error" />
                    </div>
                    <Badge className="bg-success/10 text-success border-0">Normal</Badge>
                  </div>
                  <h3 className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">
                    Heart Rate
                  </h3>
                  <p className="text-3xl font-bold text-light-text dark:text-dark-text mb-3">
                    {fitnessData.heartRate.current} <span className="text-lg">bpm</span>
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                    <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                      Resting: {fitnessData.heartRate.resting} bpm
                    </p>
                  </div>
                </Card>
              </motion.div>

              {/* Sleep Duration */}
              <motion.div variants={itemVariants}>
                <Card className="p-6 bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border hover:shadow-soft-hover transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-info/10">
                      <Moon className="w-6 h-6 text-info" />
                    </div>
                    <Badge className="bg-info/10 text-info border-0">
                      {Math.round((fitnessData.sleep.current / fitnessData.sleep.goal) * 100)}%
                    </Badge>
                  </div>
                  <h3 className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">
                    Sleep Duration
                  </h3>
                  <p className="text-3xl font-bold text-light-text dark:text-dark-text mb-3">
                    {fitnessData.sleep.current}h
                  </p>
                  <Progress
                    value={(fitnessData.sleep.current / fitnessData.sleep.goal) * 100}
                    className="h-2 mb-2"
                  />
                  <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                    Goal: {fitnessData.sleep.goal} hours
                  </p>
                </Card>
              </motion.div>

              {/* Active Time */}
              <motion.div variants={itemVariants}>
                <Card className="p-6 bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border hover:shadow-soft-hover transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-accent-teal/10">
                      <Clock className="w-6 h-6 text-accent-teal" />
                    </div>
                    <Badge className="bg-accent-teal/10 text-accent-teal border-0">
                      {Math.round((fitnessData.activeTime.current / fitnessData.activeTime.goal) * 100)}%
                    </Badge>
                  </div>
                  <h3 className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">
                    Active Time
                  </h3>
                  <p className="text-3xl font-bold text-light-text dark:text-dark-text mb-3">
                    {fitnessData.activeTime.current}m
                  </p>
                  <Progress
                    value={(fitnessData.activeTime.current / fitnessData.activeTime.goal) * 100}
                    className="h-2 mb-2"
                  />
                  <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                    Goal: {fitnessData.activeTime.goal} minutes
                  </p>
                </Card>
              </motion.div>

              {/* Water Intake */}
              <motion.div variants={itemVariants}>
                <Card className="p-6 bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border hover:shadow-soft-hover transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-info/10">
                      <Droplets className="w-6 h-6 text-info" />
                    </div>
                    <Badge className="bg-info/10 text-info border-0">
                      {Math.round((fitnessData.water.current / fitnessData.water.goal) * 100)}%
                    </Badge>
                  </div>
                  <h3 className="text-sm font-medium text-light-text-secondary dark:text-dark-text-secondary mb-1">
                    Water Intake
                  </h3>
                  <p className="text-3xl font-bold text-light-text dark:text-dark-text mb-3">
                    {fitnessData.water.current} <span className="text-lg">glasses</span>
                  </p>
                  <Progress
                    value={(fitnessData.water.current / fitnessData.water.goal) * 100}
                    className="h-2 mb-2"
                  />
                  <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                    Goal: {fitnessData.water.goal} glasses
                  </p>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>

          {/* Workout Tab */}
          <TabsContent value="workout">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              {/* Today's Workout Plan */}
              <motion.div variants={itemVariants}>
                <Card className="p-6 bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-light-text dark:text-dark-text mb-1">
                        Today's Workout Plan
                      </h2>
                      <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                        {workoutPlan.filter((w) => w.completed).length} of {workoutPlan.length} completed
                      </p>
                    </div>
                    <Button className="bg-primary hover:bg-primary-hover text-white rounded-xl">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Workout
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {workoutPlan.map((workout, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="flex items-center gap-4 p-4 rounded-xl bg-light-bg dark:bg-dark-bg hover:bg-light-border/50 dark:hover:bg-dark-border/50 transition-all cursor-pointer"
                      >
                        <div
                          className={`p-2 rounded-lg ${
                            workout.completed
                              ? 'bg-success/10 text-success'
                              : 'bg-light-border dark:bg-dark-border text-light-text-secondary dark:text-dark-text-secondary'
                          }`}
                        >
                          {workout.completed ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            <Circle className="w-5 h-5" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3
                            className={`font-medium ${
                              workout.completed
                                ? 'text-light-text-secondary dark:text-dark-text-secondary line-through'
                                : 'text-light-text dark:text-dark-text'
                            }`}
                          >
                            {workout.name}
                          </h3>
                          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                            {workout.time}
                          </p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-light-text-secondary dark:text-dark-text-secondary" />
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* Weekly Progress */}
              <motion.div variants={itemVariants}>
                <Card className="p-6 bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border">
                  <h2 className="text-xl font-bold text-light-text dark:text-dark-text mb-4">
                    Weekly Progress
                  </h2>
                  <div className="grid grid-cols-7 gap-2">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                      <div key={day} className="text-center">
                        <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary mb-2">
                          {day}
                        </p>
                        <div
                          className={`h-16 rounded-lg ${
                            index < 5
                              ? 'bg-primary/20 border-2 border-primary'
                              : 'bg-light-border dark:bg-dark-border'
                          } flex items-center justify-center`}
                        >
                          {index < 5 && <CheckCircle className="w-5 h-5 text-primary" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>

          {/* Body Analysis Tab */}
          <TabsContent value="body">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {/* Weight Tracking */}
              <motion.div variants={itemVariants}>
                <Card className="p-6 bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-light-text dark:text-dark-text mb-1">
                        Weight Tracking
                      </h2>
                      <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                        Track your body weight over time
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-primary/10">
                      <Scale className="w-6 h-6 text-primary" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-end gap-4">
                      <div>
                        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-1">
                          Current Weight
                        </p>
                        <p className="text-4xl font-bold text-light-text dark:text-dark-text">
                          {bodyMetrics.weight.current}
                          <span className="text-lg ml-1">{bodyMetrics.weight.unit}</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        <TrendingUp className="w-4 h-4 text-success" />
                        <span className="text-sm font-medium text-success">
                          {Math.abs(bodyMetrics.weeklyChange)} {bodyMetrics.weight.unit} this week
                        </span>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-light-bg dark:bg-dark-bg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                            Previous Week
                          </p>
                          <p className="text-xl font-semibold text-light-text dark:text-dark-text">
                            {bodyMetrics.weight.previous} {bodyMetrics.weight.unit}
                          </p>
                        </div>
                        <Badge className="bg-success/10 text-success border-0">
                          -{Math.abs(bodyMetrics.weeklyChange)} {bodyMetrics.weight.unit}
                        </Badge>
                      </div>
                    </div>

                    <Button className="w-full bg-primary hover:bg-primary-hover text-white rounded-xl">
                      <Plus className="w-4 h-4 mr-2" />
                      Log Weight
                    </Button>
                  </div>
                </Card>
              </motion.div>

              {/* BMI & Body Metrics */}
              <motion.div variants={itemVariants}>
                <Card className="p-6 bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-light-text dark:text-dark-text mb-1">
                        Body Metrics
                      </h2>
                      <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                        Your health indicators
                      </p>
                    </div>
                    <div className="p-3 rounded-xl bg-success/10">
                      <Target className="w-6 h-6 text-success" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                      <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-2">
                        Body Mass Index (BMI)
                      </p>
                      <p className="text-5xl font-bold text-primary mb-2">{bodyMetrics.bmi}</p>
                      <Badge className="bg-success/10 text-success border-0">Healthy Range</Badge>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 rounded-lg bg-light-bg dark:bg-dark-bg">
                        <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                          Underweight
                        </span>
                        <span className="text-sm font-medium text-light-text dark:text-dark-text">
                          &lt; 18.5
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-lg bg-success/10 border border-success/20">
                        <span className="text-sm font-medium text-success">Normal</span>
                        <span className="text-sm font-medium text-success">18.5 - 24.9</span>
                      </div>
                      <div className="flex justify-between items-center p-3 rounded-lg bg-light-bg dark:bg-dark-bg">
                        <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                          Overweight
                        </span>
                        <span className="text-sm font-medium text-light-text dark:text-dark-text">
                          25 - 29.9
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>

          {/* AI Insights Tab */}
          <TabsContent value="insights">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {aiInsights.map((insight, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card
                    className={`p-6 bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border hover:shadow-soft-hover transition-all ${
                      insight.type === 'success'
                        ? 'border-l-4 border-l-success'
                        : insight.type === 'warning'
                        ? 'border-l-4 border-l-warning'
                        : 'border-l-4 border-l-info'
                    }`}
                  >
                    <div className="flex gap-4">
                      <div
                        className={`p-3 rounded-xl h-fit ${
                          insight.type === 'success'
                            ? 'bg-success/10'
                            : insight.type === 'warning'
                            ? 'bg-warning/10'
                            : 'bg-info/10'
                        }`}
                      >
                        <insight.icon
                          className={`w-6 h-6 ${
                            insight.type === 'success'
                              ? 'text-success'
                              : insight.type === 'warning'
                              ? 'text-warning'
                              : 'text-info'
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-light-text dark:text-dark-text mb-2">
                          {insight.title}
                        </h3>
                        <p className="text-light-text-secondary dark:text-dark-text-secondary">
                          {insight.message}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}

              {/* Connect with Goals */}
              <motion.div variants={itemVariants}>
                <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 border-light-border dark:border-dark-border">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-primary/20">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-light-text dark:text-dark-text mb-1">
                        Synced with Your Goals
                      </h3>
                      <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                        Your fitness data is automatically connected with your habit tracker and goals
                      </p>
                    </div>
                    <Button className="bg-primary hover:bg-primary-hover text-white rounded-xl">
                      View Goals
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>

          {/* Reminders Tab */}
          <TabsContent value="reminders">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              <motion.div variants={itemVariants}>
                <Card className="p-6 bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-light-text dark:text-dark-text mb-1">
                        Smart Health Reminders
                      </h2>
                      <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                        Gentle alerts to keep you on track
                      </p>
                    </div>
                    <Button className="bg-primary hover:bg-primary-hover text-white rounded-xl">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Reminder
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {reminders.map((reminder, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="flex items-center gap-4 p-4 rounded-xl bg-light-bg dark:bg-dark-bg"
                      >
                        <div className="p-2 rounded-lg bg-primary/10">
                          <reminder.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-light-text dark:text-dark-text">
                            {reminder.title}
                          </h3>
                          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                            {reminder.time}
                          </p>
                        </div>
                        <Switch checked={reminder.active} />
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* Manual Data Input */}
              <motion.div variants={itemVariants}>
                <Card className="p-6 bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border">
                  <h2 className="text-xl font-bold text-light-text dark:text-dark-text mb-4">
                    Manual Data Entry
                  </h2>
                  <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-6">
                    Don't have a smartwatch? No problem! Enter your data manually.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-light-text dark:text-dark-text">Steps</Label>
                      <Input
                        type="number"
                        placeholder="Enter steps"
                        className="bg-light-bg dark:bg-dark-bg border-light-border dark:border-dark-border text-light-text dark:text-dark-text"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-light-text dark:text-dark-text">Water (glasses)</Label>
                      <Input
                        type="number"
                        placeholder="Enter glasses"
                        className="bg-light-bg dark:bg-dark-bg border-light-border dark:border-dark-border text-light-text dark:text-dark-text"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-light-text dark:text-dark-text">Weight (kg)</Label>
                      <Input
                        type="number"
                        placeholder="Enter weight"
                        className="bg-light-bg dark:bg-dark-bg border-light-border dark:border-dark-border text-light-text dark:text-dark-text"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-light-text dark:text-dark-text">Sleep (hours)</Label>
                      <Input
                        type="number"
                        placeholder="Enter hours"
                        className="bg-light-bg dark:bg-dark-bg border-light-border dark:border-dark-border text-light-text dark:text-dark-text"
                      />
                    </div>
                  </div>

                  <Button className="w-full mt-6 bg-primary hover:bg-primary-hover text-white rounded-xl">
                    Save Data
                  </Button>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}
