import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Plus, Edit2, Trash2, Bell, BellOff } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Reminders } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export default function RemindersPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [reminders, setReminders] = useState<Reminders[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingReminder, setEditingReminder] = useState<Reminders | null>(null);
  const [formData, setFormData] = useState({
    reminderTitle: '',
    reminderDateTime: '',
    recurrenceRule: '',
    isActive: true,
    trackerCategory: '',
  });

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<Reminders>('reminders');
      setReminders(result.items);
    } catch (error) {
      console.error('Error loading reminders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingReminder) {
        await BaseCrudService.update<Reminders>('reminders', {
          _id: editingReminder._id,
          ...formData,
        });
        setReminders(reminders.map(r => r._id === editingReminder._id ? { ...r, ...formData } : r));
      } else {
        const newReminder = await BaseCrudService.create<Reminders>('reminders', {
          _id: crypto.randomUUID(),
          ...formData,
        });
        setReminders([newReminder, ...reminders]);
      }
      
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error saving reminder:', error);
    }
  };

  const handleDelete = async (id: string) => {
    setReminders(reminders.filter(r => r._id !== id));
    try {
      await BaseCrudService.delete('reminders', id);
    } catch (error) {
      loadReminders();
    }
  };

  const toggleActive = async (reminder: Reminders) => {
    const newActive = !reminder.isActive;
    setReminders(reminders.map(r => 
      r._id === reminder._id 
        ? { ...r, isActive: newActive }
        : r
    ));
    
    try {
      await BaseCrudService.update<Reminders>('reminders', {
        _id: reminder._id,
        isActive: newActive,
      });
    } catch (error) {
      loadReminders();
    }
  };

  const openEditDialog = (reminder: Reminders) => {
    setEditingReminder(reminder);
    setFormData({
      reminderTitle: reminder.reminderTitle || '',
      reminderDateTime: reminder.reminderDateTime ? new Date(reminder.reminderDateTime).toISOString().slice(0, 16) : '',
      recurrenceRule: reminder.recurrenceRule || '',
      isActive: reminder.isActive !== undefined ? reminder.isActive : true,
      trackerCategory: reminder.trackerCategory || '',
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingReminder(null);
    setFormData({
      reminderTitle: '',
      reminderDateTime: '',
      recurrenceRule: '',
      isActive: true,
      trackerCategory: '',
    });
  };

  const activeReminders = reminders.filter(r => r.isActive).length;

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
                <span className="text-light-foreground">Smart</span>{' '}
                <span className="bg-gradient-to-r from-accent-teal to-accent-purple bg-clip-text text-transparent">
                  Reminders
                </span>
              </h1>
              <p className="font-paragraph text-lg text-light-foreground/70">
                Never miss a beat with intelligent reminders
              </p>
            </motion.div>

            <Dialog open={isDialogOpen} onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) resetForm();
            }}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-br from-accent-teal to-accent-purple text-black font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-paragraph">
                  <Plus className="w-5 h-5 mr-2" />
                  Add Reminder
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-dark-background border-white/10">
                <DialogHeader>
                  <DialogTitle className="font-heading text-2xl text-light-foreground">
                    {editingReminder ? 'Edit Reminder' : 'Create New Reminder'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="reminderTitle" className="font-paragraph text-light-foreground">Reminder Title</Label>
                    <Input
                      id="reminderTitle"
                      value={formData.reminderTitle}
                      onChange={(e) => setFormData({ ...formData, reminderTitle: e.target.value })}
                      required
                      className="bg-white/5 border-white/10 text-light-foreground font-paragraph"
                    />
                  </div>
                  <div>
                    <Label htmlFor="trackerCategory" className="font-paragraph text-light-foreground">Category</Label>
                    <Input
                      id="trackerCategory"
                      value={formData.trackerCategory}
                      onChange={(e) => setFormData({ ...formData, trackerCategory: e.target.value })}
                      placeholder="e.g., Habit, Goal, Wellness"
                      className="bg-white/5 border-white/10 text-light-foreground font-paragraph"
                    />
                  </div>
                  <div>
                    <Label htmlFor="reminderDateTime" className="font-paragraph text-light-foreground">Date & Time</Label>
                    <Input
                      id="reminderDateTime"
                      type="datetime-local"
                      value={formData.reminderDateTime}
                      onChange={(e) => setFormData({ ...formData, reminderDateTime: e.target.value })}
                      className="bg-white/5 border-white/10 text-light-foreground font-paragraph"
                    />
                  </div>
                  <div>
                    <Label htmlFor="recurrenceRule" className="font-paragraph text-light-foreground">Recurrence</Label>
                    <Input
                      id="recurrenceRule"
                      value={formData.recurrenceRule}
                      onChange={(e) => setFormData({ ...formData, recurrenceRule: e.target.value })}
                      placeholder="e.g., Daily, Weekly, Monthly"
                      className="bg-white/5 border-white/10 text-light-foreground font-paragraph"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="isActive" className="font-paragraph text-light-foreground">Active</Label>
                    <Switch
                      id="isActive"
                      checked={formData.isActive}
                      onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-br from-accent-teal to-accent-purple text-black font-bold py-3 rounded-lg font-paragraph"
                  >
                    {editingReminder ? 'Update Reminder' : 'Create Reminder'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <div className="font-paragraph text-sm text-light-foreground/60 mb-2">Total Reminders</div>
              <div className="font-heading text-4xl font-bold text-accent-teal">{reminders.length}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <div className="font-paragraph text-sm text-light-foreground/60 mb-2">Active Reminders</div>
              <div className="font-heading text-4xl font-bold text-accent-purple">{activeReminders}</div>
            </motion.div>
          </div>

          {/* Reminders List */}
          <div className="min-h-[400px]">
            {isLoading ? null : reminders.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {reminders.map((reminder, index) => (
                  <motion.div
                    key={reminder._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`backdrop-blur-xl bg-white/5 border rounded-2xl p-6 transition-all duration-300 ${
                      reminder.isActive 
                        ? 'border-accent-teal/30 hover:border-accent-teal/50' 
                        : 'border-white/10 opacity-60'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {reminder.trackerCategory && (
                            <span className="font-paragraph text-xs px-3 py-1 rounded-full bg-accent-teal/20 text-accent-teal border border-accent-teal/30">
                              {reminder.trackerCategory}
                            </span>
                          )}
                        </div>
                        <h3 className="font-heading text-xl font-bold text-light-foreground mb-2">
                          {reminder.reminderTitle}
                        </h3>
                        <div className="space-y-1 font-paragraph text-sm text-light-foreground/60">
                          {reminder.reminderDateTime && (
                            <div>{new Date(reminder.reminderDateTime).toLocaleString()}</div>
                          )}
                          {reminder.recurrenceRule && (
                            <div>Repeats: {reminder.recurrenceRule}</div>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => toggleActive(reminder)}
                        className={`p-2 rounded-lg transition-all duration-300 ${
                          reminder.isActive
                            ? 'bg-accent-teal/20 text-accent-teal'
                            : 'bg-white/5 text-light-foreground/30'
                        }`}
                      >
                        {reminder.isActive ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
                      </button>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => openEditDialog(reminder)}
                        className="flex-1 bg-white/5 text-accent-teal border border-accent-teal/30 hover:bg-accent-teal/10 font-paragraph text-sm"
                      >
                        <Edit2 className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(reminder._id)}
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
                <Calendar className="w-16 h-16 text-light-foreground/30 mx-auto mb-4" />
                <h3 className="font-heading text-2xl font-bold text-light-foreground mb-2">
                  No reminders yet
                </h3>
                <p className="font-paragraph text-light-foreground/60 mb-6">
                  Stay on track by creating your first reminder
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
