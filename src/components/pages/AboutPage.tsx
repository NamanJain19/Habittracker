import { motion } from 'framer-motion';
import { Target, Users, Zap, Heart, Shield, TrendingUp } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';

export default function AboutPage() {
  const values = [
    {
      icon: Target,
      title: 'Mission-Driven',
      description: 'We believe in empowering individuals to reach their full potential through data-driven insights and intelligent tracking.'
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'Building a supportive global network where members inspire and motivate each other to achieve their goals.'
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      description: 'Your data is yours. We use industry-leading encryption and never share your personal information without consent.'
    },
    {
      icon: Heart,
      title: 'Holistic Wellness',
      description: 'We focus on the complete picture - mental, physical, and emotional health working together in harmony.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Constantly evolving with cutting-edge technology to provide the best tracking and optimization experience.'
    },
    {
      icon: TrendingUp,
      title: 'Results-Oriented',
      description: 'Every feature is designed with one goal: helping you achieve measurable, lasting improvements in your life.'
    }
  ];

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
      <Header />
      
      <main className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="px-6 lg:px-8 py-20">
          <div className="max-w-[100rem] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-6 max-w-4xl mx-auto"
            >
              <h1 className="text-5xl lg:text-7xl font-bold">
                <span className="text-light-text dark:text-dark-text">About</span>{' '}
                <span className="bg-gradient-to-r from-accent-teal to-accent-purple bg-clip-text text-transparent">
                  HabitFlow
                </span>
              </h1>
              <p className="text-xl text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
                We're building the future of personal optimization - a comprehensive platform that transforms 
                how you track, analyze, and improve every aspect of your life.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section className="px-6 lg:px-8 py-20 bg-light-surface dark:bg-dark-surface border-y border-light-border dark:border-dark-border">
          <div className="max-w-[100rem] mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 className="text-4xl lg:text-5xl font-bold text-light-text dark:text-dark-text">
                  Our Story
                </h2>
                <div className="space-y-4 text-lg text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
                  <p>
                    HabitFlow was born from a simple observation: people want to improve their lives, 
                    but traditional tracking methods are fragmented, tedious, and lack actionable insights.
                  </p>
                  <p>
                    We set out to create a unified platform that brings together habits, goals, productivity, 
                    fitness, and wellness tracking into one seamless experience. By leveraging modern technology 
                    and data science, we help you understand patterns, identify opportunities, and make 
                    meaningful progress toward your aspirations.
                  </p>
                  <p>
                    Today, HabitFlow serves thousands of users worldwide, helping them optimize their 
                    daily routines, achieve their goals, and live healthier, more fulfilling lives.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-square rounded-2xl overflow-hidden border border-light-border dark:border-dark-border">
                  <Image
                    src="https://static.wixstatic.com/media/0c8865_c784368812ba49d28b8059109a6ba320~mv2.png?originWidth=576&originHeight=576"
                    alt="HabitFlow Platform"
                    width={600}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-br from-accent-teal/20 to-accent-purple/20 rounded-2xl blur-3xl -z-10" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="px-6 lg:px-8 py-20">
          <div className="max-w-[100rem] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center space-y-4 mb-16"
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-light-text dark:text-dark-text">
                Our Values
              </h2>
              <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-2xl p-8 hover:shadow-soft-hover transition-all duration-300"
                >
                  <div className="p-3 rounded-xl bg-gradient-to-br from-accent-teal/20 to-accent-purple/20 border border-accent-teal/30 w-fit mb-6">
                    <value.icon className="w-8 h-8 text-accent-teal" />
                  </div>
                  <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-3">
                    {value.title}
                  </h3>
                  <p className="text-light-text-secondary dark:text-dark-text-secondary leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-6 lg:px-8 py-20 bg-light-surface dark:bg-dark-surface border-y border-light-border dark:border-dark-border">
          <div className="max-w-[100rem] mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { value: '10K+', label: 'Active Users' },
                { value: '1M+', label: 'Goals Achieved' },
                { value: '50K+', label: 'Daily Check-ins' },
                { value: '99.9%', label: 'Uptime' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center space-y-2"
                >
                  <div className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-accent-teal to-accent-purple bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-light-text-secondary dark:text-dark-text-secondary">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
