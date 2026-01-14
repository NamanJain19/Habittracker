import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Plus, Edit2, Trash2 } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { FitnessActivities } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function FitnessPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [activities, setActivities] = useState<FitnessActivities[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<FitnessActivities | null>(null);
  const [formData, setFormData] = useState({
    activityType: '',
    duration: 0,
    caloriesBurned: 0,
    activityDate: '',
    performanceNotes: '',
  });

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<FitnessActivities>('fitnessactivities');
      setActivities(result.items);
    } catch (error) {
      console.error('Error loading fitness activities:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingActivity) {
        await BaseCrudService.update<FitnessActivities>('fitnessactivities', {
          _id: editingActivity._id,
          ...formData,
        });
        setActivities(activities.map(a => a._id === editingActivity._id ? { ...a, ...formData } : a));
      } else {
        const newActivity = await BaseCrudService.create<FitnessActivities>('fitnessactivities', {
          _id: crypto.randomUUID(),
          ...formData,
        });
        setActivities([newActivity, ...activities]);
      }
      
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error saving fitness activity:', error);
    }
  };

  const handleDelete = async (id: string) => {
    setActivities(activities.filter(a => a._id !== id));
    try {
      await BaseCrudService.delete('fitnessactivities', id);
    } catch (error) {
      loadActivities();
    }
  };

  const openEditDialog = (activity: FitnessActivities) => {
    setEditingActivity(activity);
    setFormData({
      activityType: activity.activityType || '',
      duration: activity.duration || 0,
      caloriesBurned: activity.caloriesBurned || 0,
      activityDate: activity.activityDate ? new Date(activity.activityDate).toISOString().split('T')[0] : '',
      performanceNotes: activity.performanceNotes || '',
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingActivity(null);
    setFormData({
      activityType: '',
      duration: 0,
      caloriesBurned: 0,
      activityDate: '',
      performanceNotes: '',
    });
  };

  const totalCalories = activities.reduce((sum, a) => sum + (a.caloriesBurned || 0), 0);
  const totalDuration = activities.reduce((sum, a) => sum + (a.duration || 0), 0);

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
                <span className="text-light-foreground">Fitness</span>{' '}
                <span className="bg-gradient-to-r from-accent-teal to-accent-purple bg-clip-text text-transparent">
                  Tracker
                </span>
              </h1>
              <p className="font-paragraph text-lg text-light-foreground/70">
                Monitor your physical activities and performance
              </p>
            </motion.div>

            <Dialog open={isDialogOpen} onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) resetForm();
            }}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-br from-accent-teal to-accent-purple text-black font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-paragraph">
                  <Plus className="w-5 h-5 mr-2" />
                  Add Activity
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-dark-background border-white/10">
                <DialogHeader>
                  <DialogTitle className="font-heading text-2xl text-light-foreground">
                    {editingActivity ? 'Edit Activity' : 'Log New Activity'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="activityType" className="font-paragraph text-light-foreground">Activity Type</Label>
                    <Input
                      id="activityType"
                      value={formData.activityType}
                      onChange={(e) => setFormData({ ...formData, activityType: e.target.value })}
                      placeholder="e.g., Running, Cycling, Gym"
                      required
                      className="bg-white/5 border-white/10 text-light-foreground font-paragraph"
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration" className="font-paragraph text-light-foreground">Duration (minutes)</Label>
                    <Input
                      id="duration"
                      type="number"
                      min="0"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
                      className="bg-white/5 border-white/10 text-light-foreground font-paragraph"
                    />
                  </div>
                  <div>
                    <Label htmlFor="caloriesBurned" className="font-paragraph text-light-foreground">Calories Burned</Label>
                    <Input
                      id="caloriesBurned"
                      type="number"
                      min="0"
                      value={formData.caloriesBurned}
                      onChange={(e) => setFormData({ ...formData, caloriesBurned: Number(e.target.value) })}
                      className="bg-white/5 border-white/10 text-light-foreground font-paragraph"
                    />
                  </div>
                  <div>
                    <Label htmlFor="activityDate" className="font-paragraph text-light-foreground">Date</Label>
                    <Input
                      id="activityDate"
                      type="date"
                      value={formData.activityDate}
                      onChange={(e) => setFormData({ ...formData, activityDate: e.target.value })}
                      className="bg-white/5 border-white/10 text-light-foreground font-paragraph"
                    />
                  </div>
                  <div>
                    <Label htmlFor="performanceNotes" className="font-paragraph text-light-foreground">Performance Notes</Label>
                    <Textarea
                      id="performanceNotes"
                      value={formData.performanceNotes}
                      onChange={(e) => setFormData({ ...formData, performanceNotes: e.target.value })}
                      className="bg-white/5 border-white/10 text-light-foreground font-paragraph"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-br from-accent-teal to-accent-purple text-black font-bold py-3 rounded-lg font-paragraph"
                  >
                    {editingActivity ? 'Update Activity' : 'Log Activity'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <div className="font-paragraph text-sm text-light-foreground/60 mb-2">Total Activities</div>
              <div className="font-heading text-4xl font-bold text-accent-teal">{activities.length}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <div className="font-paragraph text-sm text-light-foreground/60 mb-2">Total Duration</div>
              <div className="font-heading text-4xl font-bold text-accent-purple">{totalDuration} min</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <div className="font-paragraph text-sm text-light-foreground/60 mb-2">Calories Burned</div>
              <div className="font-heading text-4xl font-bold text-accent-teal">{totalCalories}</div>
            </motion.div>
          </div>

          {/* Activities List */}
          <div className="min-h-[400px]">
            {isLoading ? null : activities.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {activities.map((activity, index) => (
                  <motion.div
                    key={activity._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-accent-teal/30 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-heading text-2xl font-bold text-light-foreground mb-2">
                          {activity.activityType}
                        </h3>
                        <div className="flex flex-wrap gap-4 font-paragraph text-sm text-light-foreground/60 mb-3">
                          <span>{activity.duration} minutes</span>
                          <span>{activity.caloriesBurned} calories</span>
                          {activity.activityDate && (
                            <span>{new Date(activity.activityDate).toLocaleDateString()}</span>
                          )}
                        </div>
                        {activity.performanceNotes && (
                          <p className="font-paragraph text-sm text-light-foreground/70">
                            {activity.performanceNotes}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => openEditDialog(activity)}
                        className="flex-1 bg-white/5 text-accent-teal border border-accent-teal/30 hover:bg-accent-teal/10 font-paragraph text-sm"
                      >
                        <Edit2 className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(activity._id)}
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
                <Zap className="w-16 h-16 text-light-foreground/30 mx-auto mb-4" />
                <h3 className="font-heading text-2xl font-bold text-light-foreground mb-2">
                  No activities yet
                </h3>
                <p className="font-paragraph text-light-foreground/60 mb-6">
                  Start tracking your fitness journey by logging your first activity
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
