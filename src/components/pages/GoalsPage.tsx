import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Plus, Edit2, Trash2 } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Goals } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';

export default function GoalsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [goals, setGoals] = useState<Goals[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goals | null>(null);
  const [formData, setFormData] = useState({
    goalTitle: '',
    description: '',
    targetDate: '',
    progressPercentage: 0,
    category: '',
  });

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<Goals>('goals');
      setGoals(result.items);
    } catch (error) {
      console.error('Error loading goals:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingGoal) {
        await BaseCrudService.update<Goals>('goals', {
          _id: editingGoal._id,
          ...formData,
        });
        setGoals(goals.map(g => g._id === editingGoal._id ? { ...g, ...formData } : g));
      } else {
        const newGoal = await BaseCrudService.create<Goals>('goals', {
          _id: crypto.randomUUID(),
          ...formData,
        });
        setGoals([newGoal, ...goals]);
      }
      
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error saving goal:', error);
    }
  };

  const handleDelete = async (id: string) => {
    setGoals(goals.filter(g => g._id !== id));
    try {
      await BaseCrudService.delete('goals', id);
    } catch (error) {
      loadGoals();
    }
  };

  const openEditDialog = (goal: Goals) => {
    setEditingGoal(goal);
    setFormData({
      goalTitle: goal.goalTitle || '',
      description: goal.description || '',
      targetDate: goal.targetDate ? new Date(goal.targetDate).toISOString().split('T')[0] : '',
      progressPercentage: goal.progressPercentage || 0,
      category: goal.category || '',
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingGoal(null);
    setFormData({
      goalTitle: '',
      description: '',
      targetDate: '',
      progressPercentage: 0,
      category: '',
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
                <span className="text-light-foreground">Goal</span>{' '}
                <span className="bg-gradient-to-r from-accent-teal to-accent-purple bg-clip-text text-transparent">
                  Tracker
                </span>
              </h1>
              <p className="font-paragraph text-lg text-light-foreground/70">
                Set, track, and achieve your personal goals
              </p>
            </motion.div>

            <Dialog open={isDialogOpen} onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) resetForm();
            }}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-br from-accent-teal to-accent-purple text-black font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-paragraph">
                  <Plus className="w-5 h-5 mr-2" />
                  Add Goal
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-dark-background border-white/10">
                <DialogHeader>
                  <DialogTitle className="font-heading text-2xl text-light-foreground">
                    {editingGoal ? 'Edit Goal' : 'Create New Goal'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="goalTitle" className="font-paragraph text-light-foreground">Goal Title</Label>
                    <Input
                      id="goalTitle"
                      value={formData.goalTitle}
                      onChange={(e) => setFormData({ ...formData, goalTitle: e.target.value })}
                      required
                      className="bg-white/5 border-white/10 text-light-foreground font-paragraph"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description" className="font-paragraph text-light-foreground">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="bg-white/5 border-white/10 text-light-foreground font-paragraph"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category" className="font-paragraph text-light-foreground">Category</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="e.g., Health, Career, Personal"
                      className="bg-white/5 border-white/10 text-light-foreground font-paragraph"
                    />
                  </div>
                  <div>
                    <Label htmlFor="targetDate" className="font-paragraph text-light-foreground">Target Date</Label>
                    <Input
                      id="targetDate"
                      type="date"
                      value={formData.targetDate}
                      onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                      className="bg-white/5 border-white/10 text-light-foreground font-paragraph"
                    />
                  </div>
                  <div>
                    <Label htmlFor="progressPercentage" className="font-paragraph text-light-foreground">
                      Progress: {formData.progressPercentage}%
                    </Label>
                    <Input
                      id="progressPercentage"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.progressPercentage}
                      onChange={(e) => setFormData({ ...formData, progressPercentage: Number(e.target.value) })}
                      className="bg-white/5 border-white/10 text-light-foreground font-paragraph"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-br from-accent-teal to-accent-purple text-black font-bold py-3 rounded-lg font-paragraph"
                  >
                    {editingGoal ? 'Update Goal' : 'Create Goal'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Goals Grid */}
          <div className="min-h-[400px]">
            {isLoading ? null : goals.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {goals.map((goal, index) => (
                  <motion.div
                    key={goal._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-accent-purple/30 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {goal.category && (
                            <span className="font-paragraph text-xs px-3 py-1 rounded-full bg-accent-purple/20 text-accent-purple border border-accent-purple/30">
                              {goal.category}
                            </span>
                          )}
                        </div>
                        <h3 className="font-heading text-2xl font-bold text-light-foreground mb-2">
                          {goal.goalTitle}
                        </h3>
                        {goal.description && (
                          <p className="font-paragraph text-sm text-light-foreground/70 mb-4">
                            {goal.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-paragraph text-sm text-light-foreground/70">Progress</span>
                          <span className="font-heading text-lg font-bold text-accent-purple">
                            {goal.progressPercentage || 0}%
                          </span>
                        </div>
                        <Progress value={goal.progressPercentage || 0} className="h-2" />
                      </div>

                      {goal.targetDate && (
                        <div className="font-paragraph text-sm text-light-foreground/60">
                          Target: {new Date(goal.targetDate).toLocaleDateString()}
                        </div>
                      )}

                      <div className="flex gap-2 pt-2">
                        <Button
                          onClick={() => openEditDialog(goal)}
                          className="flex-1 bg-white/5 text-accent-purple border border-accent-purple/30 hover:bg-accent-purple/10 font-paragraph text-sm"
                        >
                          <Edit2 className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDelete(goal._id)}
                          className="flex-1 bg-white/5 text-destructive border border-destructive/30 hover:bg-destructive/10 font-paragraph text-sm"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </div>
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
                <Target className="w-16 h-16 text-light-foreground/30 mx-auto mb-4" />
                <h3 className="font-heading text-2xl font-bold text-light-foreground mb-2">
                  No goals yet
                </h3>
                <p className="font-paragraph text-light-foreground/60 mb-6">
                  Start achieving your dreams by setting your first goal
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
