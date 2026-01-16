import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Heart, Zap, Calendar, CheckCircle2, Activity, Brain } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Habits, Goals, FitnessActivities, WellnessCheckins, ProductivityLogs, Reminders } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [habits, setHabits] = useState<Habits[]>([]);
  const [goals, setGoals] = useState<Goals[]>([]);
  const [fitnessActivities, setFitnessActivities] = useState<FitnessActivities[]>([]);
  const [wellnessCheckins, setWellnessCheckins] = useState<WellnessCheckins[]>([]);
  const [productivityLogs, setProductivityLogs] = useState<ProductivityLogs[]>([]);
  const [reminders, setReminders] = useState<Reminders[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const [habitsData, goalsData, fitnessData, wellnessData, productivityData, remindersData] = await Promise.all([
        BaseCrudService.getAll<Habits>('habits', {}, { limit: 5 }),
        BaseCrudService.getAll<Goals>('goals', {}, { limit: 5 }),
        BaseCrudService.getAll<FitnessActivities>('fitnessactivities', {}, { limit: 5 }),
        BaseCrudService.getAll<WellnessCheckins>('wellnesscheckins', {}, { limit: 5 }),
        BaseCrudService.getAll<ProductivityLogs>('productivitylogs', {}, { limit: 5 }),
        BaseCrudService.getAll<Reminders>('reminders', {}, { limit: 5 }),
      ]);

      setHabits(habitsData.items);
      setGoals(goalsData.items);
      setFitnessActivities(fitnessData.items);
      setWellnessCheckins(wellnessData.items);
      setProductivityLogs(productivityData.items);
      setReminders(remindersData.items);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const trackerCards = [
    {
      title: 'Habits',
      icon: CheckCircle2,
      count: habits.length,
      color: 'from-accent-teal/20 to-accent-teal/10',
      borderColor: 'border-accent-teal/30',
      textColor: 'text-accent-teal',
      link: '/habits',
    },
    {
      title: 'Goals',
      icon: Target,
      count: goals.length,
      color: 'from-accent-purple/20 to-accent-purple/10',
      borderColor: 'border-accent-purple/30',
      textColor: 'text-accent-purple',
      link: '/goals',
    },
    {
      title: 'Productivity',
      icon: TrendingUp,
      count: productivityLogs.length,
      color: 'from-accent-teal/20 to-accent-purple/20',
      borderColor: 'border-accent-teal/30',
      textColor: 'text-accent-teal',
      link: '/productivity',
    },
    {
      title: 'Fitness',
      icon: Zap,
      count: fitnessActivities.length,
      color: 'from-accent-purple/20 to-accent-teal/20',
      borderColor: 'border-accent-purple/30',
      textColor: 'text-accent-purple',
      link: '/fitness',
    },
    {
      title: 'Wellness',
      icon: Heart,
      count: wellnessCheckins.length,
      color: 'from-accent-teal/20 to-accent-teal/10',
      borderColor: 'border-accent-teal/30',
      textColor: 'text-accent-teal',
      link: '/wellness',
    },
    {
      title: 'Reminders',
      icon: Calendar,
      count: reminders.filter(r => r.isActive).length,
      color: 'from-accent-purple/20 to-accent-purple/10',
      borderColor: 'border-accent-purple/30',
      textColor: 'text-accent-purple',
      link: '/reminders',
    },
  ];

  const completedHabits = habits.filter(h => h.isCompleted).length;
  const activeGoals = goals.filter(g => (g.progressPercentage || 0) < 100).length;
  const avgMood = wellnessCheckins.length > 0
    ? (wellnessCheckins.reduce((sum, w) => sum + (w.moodRating || 0), 0) / wellnessCheckins.length).toFixed(1)
    : '0';

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
      <Header />
      
      <main className="pt-24 pb-16 px-6 lg:px-8">
        <div className="max-w-[100rem] mx-auto space-y-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <h1 className="text-5xl lg:text-6xl font-bold">
              <span className="text-light-text dark:text-dark-text">Your</span>{' '}
              <span className="text-primary">
                Dashboard
              </span>
            </h1>
            <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary">
              Monitor your progress across all life tracking modules
            </p>
          </motion.div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-2xl p-6"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">
                    {completedHabits}/{habits.length}
                  </div>
                  <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    Habits Completed
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-2xl p-6"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-accent-teal/10">
                  <Target className="w-6 h-6 text-accent-teal" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent-teal">
                    {activeGoals}
                  </div>
                  <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    Active Goals
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-2xl p-6"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-accent-purple/10">
                  <Heart className="w-6 h-6 text-accent-purple" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent-purple">
                    {avgMood}/10
                  </div>
                  <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                    Avg Mood Rating
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Tracker Cards */}
          <div className="min-h-[400px]">
            {isLoading ? null : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {trackerCards.map((card, index) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Link to={card.link}>
                      <div className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-2xl p-6 hover:scale-105 hover:shadow-soft-lg transition-all group">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`p-3 rounded-xl ${card.textColor === 'text-accent-teal' ? 'bg-accent-teal/10' : 'bg-accent-purple/10'}`}>
                            <card.icon className={`w-6 h-6 ${card.textColor}`} />
                          </div>
                          <div className={`text-4xl font-bold ${card.textColor}`}>
                            {card.count}
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-light-text dark:text-dark-text mb-2">
                          {card.title}
                        </h3>
                        <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                          View and manage your {card.title.toLowerCase()}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Activity className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold text-light-text dark:text-dark-text">
                Recent Activity
              </h2>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-12">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="space-y-4">
                {habits.slice(0, 3).map((habit) => (
                  <div
                    key={habit._id}
                    className="flex items-center justify-between p-4 rounded-xl bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className={`w-5 h-5 ${habit.isCompleted ? 'text-primary' : 'text-light-text-secondary dark:text-dark-text-secondary'}`} />
                      <div>
                        <div className="text-sm font-bold text-light-text dark:text-dark-text">
                          {habit.habitName}
                        </div>
                        <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                          {habit.frequency} • {habit.streakCount} day streak
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {goals.slice(0, 2).map((goal) => (
                  <div
                    key={goal._id}
                    className="flex items-center justify-between p-4 rounded-xl bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border"
                  >
                    <div className="flex items-center gap-3">
                      <Target className="w-5 h-5 text-accent-teal" />
                      <div>
                        <div className="text-sm font-bold text-light-text dark:text-dark-text">
                          {goal.goalTitle}
                        </div>
                        <div className="text-xs text-light-text-secondary dark:text-dark-text-secondary">
                          {goal.progressPercentage}% complete • {goal.category}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {habits.length === 0 && goals.length === 0 && (
                  <div className="text-center py-12">
                    <Brain className="w-12 h-12 text-light-text-secondary dark:text-dark-text-secondary mx-auto mb-4" />
                    <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                      No recent activity. Start tracking to see your progress here!
                    </p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
