import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Brain, Target, TrendingUp, Heart, Users, Zap, Calendar, Settings, Activity, Shield, Cpu, Globe, ArrowRight, CheckCircle2, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// HPI 1.7-G

// --- Utility Components ---

const SectionDivider = () => (
  <div className="w-full flex justify-center items-center py-12 opacity-30">
    <div className="h-px w-24 bg-gradient-to-r from-transparent via-accent-teal to-transparent" />
    <div className="mx-4 text-accent-teal/50 text-[10px] font-paragraph tracking-[0.3em]">SYSTEM_CHECK</div>
    <div className="h-px w-24 bg-gradient-to-r from-transparent via-accent-teal to-transparent" />
  </div>
);

const GridBackground = () => (
  <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
    <div className="absolute inset-0 bg-dark-background [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,transparent_70%,#1A1A2E_100%)]" />
  </div>
);

const GlowingBadge = ({ children }: { children: React.ReactNode }) => (
  <div className="relative inline-flex group">
    <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
    <div className="relative inline-flex items-center justify-center px-4 py-1 text-xs font-paragraph text-white transition-all duration-200 bg-dark-background font-bold rounded-full border border-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
      {children}
    </div>
  </div>
);

// --- Main Component ---

export default function HomePage() {
  // 1. Data Fidelity Protocol: Canonize Data Sources
  const features = [
    {
      id: 'habit',
      icon: Target,
      title: 'Habit Tracking',
      description: 'Build lasting habits with intelligent streak tracking and visual progress indicators.',
      stat: '98% Success Rate'
    },
    {
      id: 'goal',
      icon: TrendingUp,
      title: 'Goal Management',
      description: 'Set, track, and achieve your goals with data-driven insights and milestone tracking.',
      stat: '3x Faster Completion'
    },
    {
      id: 'prod',
      icon: Brain,
      title: 'Productivity Analytics',
      description: 'Optimize your workflow with detailed productivity metrics and performance scoring.',
      stat: '+45% Efficiency'
    },
    {
      id: 'well',
      icon: Heart,
      title: 'Wellness Monitoring',
      description: 'Track your mental health, mood, and energy levels with comprehensive check-ins.',
      stat: 'Daily Insights'
    },
    {
      id: 'fit',
      icon: Zap,
      title: 'Fitness Tracking',
      description: 'Monitor your physical activities, calories burned, and performance over time.',
      stat: 'Real-time Data'
    },
    {
      id: 'comm',
      icon: Users,
      title: 'Community Hub',
      description: 'Share achievements, connect with others, and stay motivated together.',
      stat: 'Global Network'
    },
    {
      id: 'remind',
      icon: Calendar,
      title: 'Smart Reminders',
      description: 'Never miss a beat with intelligent, recurring reminders for all your activities.',
      stat: 'AI Scheduled'
    },
    {
      id: 'set',
      icon: Settings,
      title: 'Personalized Experience',
      description: 'Customize your interface, notifications, and preferences to match your lifestyle.',
      stat: 'Fully Modular'
    },
  ];

  const stats = [
    { value: '8+', label: 'Active Trackers' },
    { value: '24/7', label: 'System Monitoring' },
    { value: '100%', label: 'Data Encryption' },
    { value: '0ms', label: 'Latency Goal' },
  ];

  // Scroll Hooks
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const yHeroText = useTransform(heroScroll, [0, 1], [0, 100]);
  const opacityHero = useTransform(heroScroll, [0, 0.5], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-dark-background text-light-foreground font-paragraph selection:bg-accent-teal/30 selection:text-accent-teal overflow-clip">
      <Header />

      {/* --- HERO SECTION --- */}
      <section ref={heroRef} className="relative w-full min-h-[100vh] flex items-center justify-center overflow-hidden pt-20">
        <GridBackground />
        
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-teal/10 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-purple/10 rounded-full blur-[128px] animate-pulse delay-1000" />

        <div className="relative z-10 max-w-[120rem] mx-auto px-6 w-full h-full flex flex-col lg:flex-row items-center justify-between gap-16">
          
          {/* Hero Content */}
          <motion.div 
            style={{ y: yHeroText, opacity: opacityHero }}
            className="flex-1 space-y-8 max-w-3xl"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <GlowingBadge>V 2.0 // SYSTEM ONLINE</GlowingBadge>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-heading text-6xl lg:text-8xl xl:text-9xl font-bold leading-[0.9] tracking-tighter"
            >
              QUANTUM
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent-teal via-white to-accent-purple animate-gradient-x">
                LIFE OS
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg lg:text-xl text-light-foreground/60 max-w-xl leading-relaxed border-l-2 border-accent-teal/30 pl-6"
            >
              Initiate the ultimate personal optimization protocol. A sophisticated AI-powered platform that transforms habits, goals, and wellness into a unified, data-driven operating system.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-wrap gap-6 pt-4"
            >
              <Link to="/dashboard">
                <Button className="h-14 px-8 bg-accent-teal text-dark-background hover:bg-white hover:text-dark-background font-bold text-lg tracking-wide transition-all duration-300 rounded-none border border-transparent hover:border-accent-teal shadow-[0_0_20px_rgba(0,255,255,0.3)] hover:shadow-[0_0_40px_rgba(0,255,255,0.5)]">
                  <Terminal className="mr-2 h-5 w-5" />
                  INITIALIZE DASHBOARD
                </Button>
              </Link>
              <Link to="/community">
                <Button variant="outline" className="h-14 px-8 border-white/20 text-white hover:bg-white/5 hover:text-accent-teal hover:border-accent-teal font-paragraph text-lg tracking-wide transition-all duration-300 rounded-none backdrop-blur-sm">
                  ACCESS NETWORK
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Hero Visual - Abstract UI Construction */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex-1 w-full relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-2xl mx-auto">
              {/* Central Core */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/5 to-accent-purple/5 rounded-full border border-white/5 backdrop-blur-3xl animate-[spin_60s_linear_infinite]" />
              <div className="absolute inset-[10%] border border-dashed border-accent-teal/20 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
              <div className="absolute inset-[20%] border border-white/10 rounded-full animate-[pulse_4s_ease-in-out_infinite]" />
              
              {/* Floating Cards */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[20%] right-[10%] p-4 bg-dark-background/80 backdrop-blur-xl border border-accent-teal/30 rounded-lg shadow-2xl max-w-[200px]"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Activity className="w-5 h-5 text-accent-teal" />
                  <span className="text-xs font-bold text-accent-teal">OPTIMAL</span>
                </div>
                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-[85%] bg-accent-teal" />
                </div>
                <div className="mt-2 text-[10px] text-white/50 font-mono">ENERGY LEVELS STABLE</div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-[20%] left-[10%] p-4 bg-dark-background/80 backdrop-blur-xl border border-accent-purple/30 rounded-lg shadow-2xl max-w-[200px]"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Brain className="w-5 h-5 text-accent-purple" />
                  <span className="text-xs font-bold text-accent-purple">FOCUS</span>
                </div>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className={`h-6 w-2 rounded-sm ${i < 4 ? 'bg-accent-purple' : 'bg-white/10'}`} />
                  ))}
                </div>
                <div className="mt-2 text-[10px] text-white/50 font-mono">DEEP WORK SESSION</div>
              </motion.div>

              {/* Center Logo/Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-gradient-to-br from-accent-teal to-accent-purple rounded-2xl flex items-center justify-center shadow-[0_0_100px_rgba(138,43,226,0.3)]">
                  <Cpu className="w-16 h-16 text-white" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-[0.3em] text-white/30">SCROLL TO SCAN</span>
          <div className="w-px h-12 bg-gradient-to-b from-accent-teal to-transparent" />
        </motion.div>
      </section>

      {/* --- MARQUEE SECTION --- */}
      <div className="w-full bg-accent-teal/5 border-y border-accent-teal/10 overflow-hidden py-4 backdrop-blur-sm">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap gap-12"
        >
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 text-accent-teal/40 font-mono text-sm tracking-widest">
              <Activity className="w-4 h-4" />
              <span>SYSTEM OPTIMIZATION ACTIVE</span>
              <span>//</span>
              <span>QUANTUM SYNC ENABLED</span>
              <span>//</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* --- STICKY FEATURES SECTION --- */}
      <section className="relative w-full py-32 px-6">
        <div className="max-w-[120rem] mx-auto">
          <div className="flex flex-col lg:flex-row gap-20">
            
            {/* Sticky Header */}
            <div className="lg:w-1/3">
              <div className="sticky top-32 space-y-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent-purple/30 bg-accent-purple/10 text-accent-purple text-xs font-mono">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-purple opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-purple"></span>
                  </span>
                  MODULES DETECTED: {features.length}
                </div>
                
                <h2 className="font-heading text-5xl lg:text-7xl font-bold text-white leading-none">
                  SYSTEM <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-teal to-accent-purple">
                    ARCHITECTURE
                  </span>
                </h2>
                
                <p className="text-lg text-light-foreground/60 max-w-md font-paragraph leading-relaxed">
                  A modular suite of tracking engines designed to capture every data point of your life. Activate individual modules or run the full stack for maximum optimization.
                </p>

                <div className="hidden lg:block pt-8">
                  <div className="h-px w-full bg-white/10 mb-8" />
                  <div className="grid grid-cols-2 gap-4">
                    {stats.map((stat, idx) => (
                      <div key={idx}>
                        <div className="text-2xl font-heading font-bold text-white">{stat.value}</div>
                        <div className="text-xs text-white/40 font-mono">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Scrolling Cards */}
            <div className="lg:w-2/3 space-y-8">
              {features.map((feature, index) => (
                <FeatureCard key={feature.id} feature={feature} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- VISUAL BREATHER / PARALLAX --- */}
      <section className="relative w-full h-[80vh] overflow-hidden flex items-center justify-center my-20">
        <div className="absolute inset-0 z-0">
           <Image 
             src="https://static.wixstatic.com/media/0c8865_f101c639efc34b7e9ee69bf631e1accb~mv2.png?originWidth=1920&originHeight=1024"
             alt="Abstract Data Visualization"
             width={1920}
             height={1080}
             className="w-full h-full object-cover opacity-40 grayscale mix-blend-luminosity scale-110"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-dark-background via-dark-background/50 to-dark-background" />
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#1A1A2E_100%)]" />
        </div>

        <div className="relative z-10 text-center max-w-4xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-heading text-5xl lg:text-8xl font-bold text-white mb-8 tracking-tighter">
              DATA IS <span className="text-accent-teal">POWER</span>
            </h2>
            <p className="text-xl lg:text-2xl text-light-foreground/80 font-light leading-relaxed">
              "The unexamined life is not worth living. The untracked life is not worth optimizing."
            </p>
            <div className="mt-12 flex justify-center">
              <div className="h-24 w-px bg-gradient-to-b from-accent-teal to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- NEW SECTION: COMMUNITY PREVIEW --- */}
      <section className="relative w-full py-32 px-6 bg-white/5 border-y border-white/5">
        <div className="max-w-[100rem] mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              {/* Decorative Elements */}
              <div className="absolute -top-10 -left-10 w-32 h-32 border-t-2 border-l-2 border-accent-teal/30 rounded-tl-3xl" />
              <div className="absolute -bottom-10 -right-10 w-32 h-32 border-b-2 border-r-2 border-accent-purple/30 rounded-br-3xl" />
              
              <div className="relative bg-dark-background border border-white/10 rounded-2xl p-8 shadow-2xl overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-teal/5 to-accent-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Mock Chat Interface */}
                <div className="space-y-4">
                  {[
                    { user: 'Alex_Pro', msg: 'Just hit a 50-day streak on meditation! 🧘‍♂️', time: '2m ago', color: 'bg-accent-teal' },
                    { user: 'Sarah_Dev', msg: 'The new productivity analytics are insane. +20% output.', time: '5m ago', color: 'bg-accent-purple' },
                    { user: 'Quantum_User', msg: 'Who is joining the weekend fitness challenge?', time: '12m ago', color: 'bg-blue-500' },
                  ].map((chat, i) => (
                    <div key={i} className="flex gap-4 items-start p-3 rounded-lg bg-white/5 border border-white/5">
                      <div className={`w-8 h-8 rounded-full ${chat.color} flex items-center justify-center text-[10px] font-bold text-black`}>
                        {chat.user[0]}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-bold text-white">{chat.user}</span>
                          <span className="text-[10px] text-white/30">{chat.time}</span>
                        </div>
                        <p className="text-sm text-white/70">{chat.msg}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-8">
              <div className="flex items-center gap-3 text-accent-teal">
                <Globe className="w-6 h-6" />
                <span className="font-mono text-sm tracking-widest">GLOBAL_NETWORK</span>
              </div>
              <h2 className="font-heading text-4xl lg:text-6xl font-bold text-white">
                HIVE MIND <br /> INTELLIGENCE
              </h2>
              <p className="text-lg text-light-foreground/60 leading-relaxed">
                Connect with a global network of high-performers. Share your protocols, compete in challenges, and leverage the collective intelligence of the Quantum community to accelerate your growth.
              </p>
              <ul className="space-y-4 pt-4">
                {['Shared Habit Protocols', 'Global Leaderboards', 'Accountability Pods', 'Expert Workshops'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-light-foreground/80">
                    <CheckCircle2 className="w-5 h-5 text-accent-purple" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-6">
                <Link to="/community">
                  <Button className="bg-transparent border border-white/20 hover:bg-white hover:text-black text-white px-8 py-6 rounded-none transition-all duration-300">
                    JOIN THE NETWORK <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="relative w-full py-40 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-background via-accent-teal/5 to-dark-background" />
        
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-6xl lg:text-9xl font-bold text-white tracking-tighter mb-6">
              READY TO <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-teal to-accent-purple">
                UPGRADE?
              </span>
            </h2>
            <p className="text-xl text-light-foreground/60 max-w-2xl mx-auto mb-12">
              The operating system for your life is waiting. Initialize your account and begin the transformation.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/dashboard">
                <Button className="h-16 px-12 bg-white text-black hover:bg-accent-teal hover:text-black font-bold text-xl tracking-wide transition-all duration-300 rounded-none shadow-xl">
                  START FREE TRIAL
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="ghost" className="h-16 px-12 text-white hover:bg-white/10 font-paragraph text-lg tracking-wide rounded-none border border-white/20">
                  VIEW DEMO
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// --- Sub-Components ---

function FeatureCard({ feature, index }: { feature: any, index: number }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative w-full p-1"
    >
      {/* Hover Gradient Border */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent-teal via-accent-purple to-accent-teal opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl blur-sm" />
      
      <div className="relative bg-dark-background/80 backdrop-blur-xl border border-white/10 p-8 rounded-xl overflow-hidden transition-all duration-300 group-hover:translate-x-2">
        {/* Background Grid inside card */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(45deg,transparent_25%,#fff_25%,#fff_50%,transparent_50%,transparent_75%,#fff_75%,#fff_100%)] bg-[size:20px_20px]" />
        
        <div className="relative z-10 flex flex-col md:flex-row gap-6 items-start md:items-center">
          <div className="p-4 bg-white/5 rounded-lg border border-white/10 group-hover:border-accent-teal/50 transition-colors duration-300">
            <feature.icon className="w-8 h-8 text-accent-teal" />
          </div>
          
          <div className="flex-1 space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="font-heading text-2xl font-bold text-white group-hover:text-accent-teal transition-colors">
                {feature.title}
              </h3>
              <span className="text-xs font-mono text-accent-purple bg-accent-purple/10 px-2 py-1 rounded border border-accent-purple/20">
                {feature.stat}
              </span>
            </div>
            <p className="text-light-foreground/60 font-paragraph text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>

          <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-4 group-hover:translate-x-0">
            <ArrowRight className="w-6 h-6 text-white/50" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}