import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Plus, Edit2, Trash2 } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { useMember } from '@/integrations';
import { Goals } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { LoginPromptModal } from '@/components/ui/login-prompt-modal';

export default function GoalsPage() {
  const { isAuthenticated } = useMember();
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [goals, setGoals] = useState<Goals[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goals | null>(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
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
    
    if (!isAuthenticated) {
      setIsDialogOpen(false);
      setShowLoginPrompt(true);
      return;
    }
    
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
    if (!isAuthenticated) {
      setShowLoginPrompt(true);
      return;
    }
    
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
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="pt-24 pb-16 px-6 lg:px-8">
        <div className="max-w-[100rem] mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <h1 className="text-5xl lg:text-6xl font-bold">
                <span className="text-light-text dark:text-dark-text">Goal</span>{' '}
                <span className="text-primary">
                  Tracker
                </span>
              </h1>
              <p className="text-lg text-light-text-secondary dark:text-dark-text-secondary">
                Set, track, and achieve your personal goals
              </p>
            </motion.div>

            <Dialog open={isDialogOpen} onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) resetForm();
            }}>
              <DialogTrigger asChild>
                <Button 
                  onClick={() => {
                    if (!isAuthenticated) {
                      setShowLoginPrompt(true);
                    } else {
                      setIsDialogOpen(true);
                    }
                  }}
                  className="bg-primary text-white hover:bg-primary-hover font-bold py-3 px-6 rounded-lg shadow-soft hover:shadow-soft-hover transition-all"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Goal
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border">
                <DialogHeader>
                  <DialogTitle className="text-2xl text-light-text dark:text-dark-text">
                    {editingGoal ? 'Edit Goal' : 'Create New Goal'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="goalTitle" className="text-light-text dark:text-dark-text">Goal Title</Label>
                    <Input
                      id="goalTitle"
                      value={formData.goalTitle}
                      onChange={(e) => setFormData({ ...formData, goalTitle: e.target.value })}
                      required
                      className="bg-light-bg dark:bg-dark-bg border-light-border dark:border-dark-border text-light-text dark:text-dark-text"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description" className="text-light-text dark:text-dark-text">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="bg-light-bg dark:bg-dark-bg border-light-border dark:border-dark-border text-light-text dark:text-dark-text"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category" className="text-light-text dark:text-dark-text">Category</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="e.g., Health, Career, Personal"
                      className="bg-light-bg dark:bg-dark-bg border-light-border dark:border-dark-border text-light-text dark:text-dark-text"
                    />
                  </div>
                  <div>
                    <Label htmlFor="targetDate" className="text-light-text dark:text-dark-text">Target Date</Label>
                    <Input
                      id="targetDate"
                      type="date"
                      value={formData.targetDate}
                      onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                      className="bg-light-bg dark:bg-dark-bg border-light-border dark:border-dark-border text-light-text dark:text-dark-text"
                    />
                  </div>
                  <div>
                    <Label htmlFor="progressPercentage" className="text-light-text dark:text-dark-text">
                      Progress: {formData.progressPercentage}%
                    </Label>
                    <Input
                      id="progressPercentage"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.progressPercentage}
                      onChange={(e) => setFormData({ ...formData, progressPercentage: Number(e.target.value) })}
                      className="bg-light-bg dark:bg-dark-bg border-light-border dark:border-dark-border text-light-text dark:text-dark-text"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-primary text-white hover:bg-primary-hover font-bold py-3 rounded-lg"
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
                    className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-2xl p-6 hover:shadow-soft-lg transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {goal.category && (
                            <span className="text-xs px-3 py-1 rounded-full bg-accent-teal/10 text-accent-teal border border-accent-teal/30">
                              {goal.category}
                            </span>
                          )}
                        </div>
                        <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-2">
                          {goal.goalTitle}
                        </h3>
                        {goal.description && (
                          <p className="text-sm text-light-text-secondary dark:text-dark-text-secondary mb-4">
                            {goal.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-light-text-secondary dark:text-dark-text-secondary">Progress</span>
                          <span className="text-lg font-bold text-accent-teal">
                            {goal.progressPercentage || 0}%
                          </span>
                        </div>
                        <Progress value={goal.progressPercentage || 0} className="h-2" />
                      </div>

                      {goal.targetDate && (
                        <div className="text-sm text-light-text-secondary dark:text-dark-text-secondary">
                          Target: {new Date(goal.targetDate).toLocaleDateString()}
                        </div>
                      )}

                      <div className="flex gap-2 pt-2">
                        <Button
                          onClick={() => openEditDialog(goal)}
                          className="flex-1 bg-transparent text-primary border border-primary/30 hover:bg-primary/10 text-sm"
                        >
                          <Edit2 className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDelete(goal._id)}
                          className="flex-1 bg-transparent text-error border border-error/30 hover:bg-error/10 text-sm"
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
                <Target className="w-16 h-16 text-light-text-secondary dark:text-dark-text-secondary mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-2">
                  No goals yet
                </h3>
                <p className="text-light-text-secondary dark:text-dark-text-secondary mb-6">
                  Start achieving your dreams by setting your first goal
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <LoginPromptModal 
        isOpen={showLoginPrompt} 
        onClose={() => setShowLoginPrompt(false)}
        title="Sign in required"
        message="Please sign in to save your progress and use this feature."
      />
    </div>
  );
}
