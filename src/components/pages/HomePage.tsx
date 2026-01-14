import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Heart, Users, Calendar, Activity, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMember } from '@/integrations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HomePage() {
  const { isAuthenticated } = useMember();

  const features = [
    {
      icon: Target,
      title: 'Track Habits',
      description: 'Build better habits with simple daily tracking and streak counters.',
    },
    {
      icon: TrendingUp,
      title: 'Set Goals',
      description: 'Create goals and watch your progress grow day by day.',
    },
    {
      icon: Heart,
      title: 'Wellness Check-ins',
      description: 'Track your mood, energy, and stress levels to feel your best.',
    },
    {
      icon: Activity,
      title: 'Fitness Tracking',
      description: 'Log workouts and activities to stay active and healthy.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Share your journey and get inspired by others.',
    },
    {
      icon: Calendar,
      title: 'Smart Reminders',
      description: 'Never forget your habits with friendly reminders.',
    },
  ];

  const benefits = [
    'Easy to use - no learning curve',
    'Track multiple habits at once',
    'See your progress visually',
    'Stay motivated with streaks',
    'Works on all devices',
    'Your data is private and secure',
  ];

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8 animate-fade-in">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-light-text dark:text-dark-text mb-4">
                Build Better Habits,
                <span className="block text-primary">Live Your Best Life</span>
              </h1>
              <p className="text-lg sm:text-xl text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
                Simple habit tracking that actually works. Start building the life you want, one day at a time.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button className="bg-primary text-white hover:bg-primary-hover transition-all rounded-lg px-8 py-6 text-lg font-medium shadow-soft hover:shadow-soft-hover hover:scale-105">
                    Go to Dashboard
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              ) : (
                <Link to="/dashboard">
                  <Button className="bg-primary text-white hover:bg-primary-hover transition-all rounded-lg px-8 py-6 text-lg font-medium shadow-soft hover:shadow-soft-hover hover:scale-105">
                    Get Started Free
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              )}
              <Link to="/about">
                <Button className="bg-transparent text-light-text dark:text-dark-text border-2 border-light-border dark:border-dark-border hover:bg-light-surface dark:hover:bg-dark-surface transition-all rounded-lg px-8 py-6 text-lg">
                  Learn More
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-light-text dark:text-dark-text mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary">
              Simple tools to help you build better habits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-light-surface dark:bg-dark-surface p-6 rounded-xl border border-light-border dark:border-dark-border hover:shadow-soft-lg transition-all hover:scale-105"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-light-text dark:text-dark-text mb-2">
                  {feature.title}
                </h3>
                <p className="text-light-text-secondary dark:text-dark-text-secondary">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-light-surface dark:bg-dark-surface">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-light-text dark:text-dark-text mb-4">
              Why People Love HabitFlow
            </h2>
            <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary">
              Join thousands of people building better habits every day
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-3 p-4 bg-light-bg dark:bg-dark-bg rounded-lg"
              >
                <CheckCircle className="w-6 h-6 text-primary flex-shrink-0" />
                <span className="text-light-text dark:text-dark-text">{benefit}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-primary/10 border-2 border-primary/20 rounded-2xl p-12 space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-light-text dark:text-dark-text">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
              Join HabitFlow today and start building the habits that will change your life. It's free to get started!
            </p>
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button className="bg-primary text-white hover:bg-primary-hover transition-all rounded-lg px-8 py-6 text-lg font-medium shadow-soft hover:shadow-soft-hover hover:scale-105">
                  Go to Dashboard
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            ) : (
              <Link to="/dashboard">
                <Button className="bg-primary text-white hover:bg-primary-hover transition-all rounded-lg px-8 py-6 text-lg font-medium shadow-soft hover:shadow-soft-hover hover:scale-105">
                  Start Building Habits
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
