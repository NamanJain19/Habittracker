import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Plus, Flame, Edit2, Trash2 } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Habits } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Image } from '@/components/ui/image';

export default function HabitsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [habits, setHabits] = useState<Habits[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habits | null>(null);
  const [formData, setFormData] = useState({
    habitName: '',
    frequency: 'Daily',
    streakCount: 0,
    isCompleted: false,
    habitImage: 'https://static.wixstatic.com/media/0c8865_5f32ca159a18437aabd86fe0218f8cd5~mv2.png?originWidth=384&originHeight=128',
  });

  useEffect(() => {
    loadHabits();
  }, []);

  const loadHabits = async () => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<Habits>('habits');
      setHabits(result.items);
    } catch (error) {
      console.error('Error loading habits:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingHabit) {
        await BaseCrudService.update<Habits>('habits', {
          _id: editingHabit._id,
          ...formData,
        });
        setHabits(habits.map(h => h._id === editingHabit._id ? { ...h, ...formData } : h));
      } else {
        const newHabit = await BaseCrudService.create<Habits>('habits', {
          _id: crypto.randomUUID(),
          ...formData,
        });
        setHabits([newHabit, ...habits]);
      }
      
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error saving habit:', error);
    }
  };

  const handleDelete = async (id: string) => {
    setHabits(habits.filter(h => h._id !== id));
    try {
      await BaseCrudService.delete('habits', id);
    } catch (error) {
      loadHabits();
    }
  };

  const toggleComplete = async (habit: Habits) => {
    const newCompleted = !habit.isCompleted;
    const newStreak = newCompleted ? (habit.streakCount || 0) + 1 : habit.streakCount;
    
    setHabits(habits.map(h => 
      h._id === habit._id 
        ? { ...h, isCompleted: newCompleted, streakCount: newStreak }
        : h
    ));
    
    try {
      await BaseCrudService.update<Habits>('habits', {
        _id: habit._id,
        isCompleted: newCompleted,
        streakCount: newStreak,
      });
    } catch (error) {
      loadHabits();
    }
  };

  const openEditDialog = (habit: Habits) => {
    setEditingHabit(habit);
    setFormData({
      habitName: habit.habitName || '',
      frequency: habit.frequency || 'Daily',
      streakCount: habit.streakCount || 0,
      isCompleted: habit.isCompleted || false,
      habitImage: habit.habitImage || 'https://static.wixstatic.com/media/0c8865_26fe0a3bdd1840878acc37b0ac887a4b~mv2.png?originWidth=384&originHeight=128',
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingHabit(null);
    setFormData({
      habitName: '',
      frequency: 'Daily',
      streakCount: 0,
      isCompleted: false,
      habitImage: 'https://static.wixstatic.com/media/0c8865_c8e758f28dbf4eef8ea14c530f5926fe~mv2.png?originWidth=384&originHeight=128',
    });
  };

  return (
    <div className="min-h-screen bg-dark-background text-light-foreground">
      <Header />
      
      <main className="pt-24 pb-16 px-6 lg:px-8">
        <div className="max-w-[100rem] mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <h1 className="font-heading text-5xl lg:text-6xl font-bold">
                <span className="text-light-foreground">Habit</span>{' '}
                <span className="bg-gradient-to-r from-accent-teal to-accent-purple bg-clip-text text-transparent">
                  Tracker
                </span>
              </h1>
              <p className="font-paragraph text-lg text-light-foreground/70">
                Build lasting habits and track your daily progress
              </p>
            </motion.div>

            <Dialog open={isDialogOpen} onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) resetForm();
            }}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-br from-accent-teal to-accent-purple text-black font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-paragraph">
                  <Plus className="w-5 h-5 mr-2" />
                  Add Habit
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-dark-background border-white/10">
                <DialogHeader>
                  <DialogTitle className="font-heading text-2xl text-light-foreground">
                    {editingHabit ? 'Edit Habit' : 'Create New Habit'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="habitName" className="font-paragraph text-light-foreground">Habit Name</Label>
                    <Input
                      id="habitName"
                      value={formData.habitName}
                      onChange={(e) => setFormData({ ...formData, habitName: e.target.value })}
                      required
                      className="bg-white/5 border-white/10 text-light-foreground font-paragraph"
                    />
                  </div>
                  <div>
                    <Label htmlFor="frequency" className="font-paragraph text-light-foreground">Frequency</Label>
                    <Input
                      id="frequency"
                      value={formData.frequency}
                      onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                      placeholder="e.g., Daily, Weekly"
                      className="bg-white/5 border-white/10 text-light-foreground font-paragraph"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="isCompleted" className="font-paragraph text-light-foreground">Completed Today</Label>
                    <Switch
                      id="isCompleted"
                      checked={formData.isCompleted}
                      onCheckedChange={(checked) => setFormData({ ...formData, isCompleted: checked })}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-br from-accent-teal to-accent-purple text-black font-bold py-3 rounded-lg font-paragraph"
                  >
                    {editingHabit ? 'Update Habit' : 'Create Habit'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Habits Grid */}
          <div className="min-h-[400px]">
            {isLoading ? null : habits.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {habits.map((habit, index) => (
                  <motion.div
                    key={habit._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-accent-teal/30 transition-all duration-300 group"
                  >
                    {habit.habitImage && (
                      <div className="mb-4 rounded-xl overflow-hidden">
                        <Image
                          src={habit.habitImage}
                          alt={habit.habitName || 'Habit'}
                          width={400}
                          className="w-full h-40 object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-heading text-xl font-bold text-light-foreground mb-1">
                          {habit.habitName}
                        </h3>
                        <p className="font-paragraph text-sm text-light-foreground/60">
                          {habit.frequency}
                        </p>
                      </div>
                      <button
                        onClick={() => toggleComplete(habit)}
                        className={`p-2 rounded-lg transition-all duration-300 ${
                          habit.isCompleted
                            ? 'bg-accent-teal/20 text-accent-teal'
                            : 'bg-white/5 text-light-foreground/30 hover:bg-white/10'
                        }`}
                      >
                        <CheckCircle2 className="w-6 h-6" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <Flame className="w-5 h-5 text-accent-purple" />
                      <span className="font-paragraph text-sm text-light-foreground">
                        <span className="font-bold text-accent-purple">{habit.streakCount || 0}</span> day streak
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => openEditDialog(habit)}
                        className="flex-1 bg-white/5 text-accent-teal border border-accent-teal/30 hover:bg-accent-teal/10 font-paragraph text-sm"
                      >
                        <Edit2 className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(habit._id)}
                        className="flex-1 bg-white/5 text-destructive border border-destructive/30 hover:bg-destructive/10 font-paragraph text-sm"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <CheckCircle2 className="w-16 h-16 text-light-foreground/30 mx-auto mb-4" />
                <h3 className="font-heading text-2xl font-bold text-light-foreground mb-2">
                  No habits yet
                </h3>
                <p className="font-paragraph text-light-foreground/60 mb-6">
                  Start building better habits by creating your first one
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
