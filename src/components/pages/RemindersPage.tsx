import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Plus, Edit2, Trash2, Bell, BellOff, Clock, AlertCircle } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Reminders } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

export default function RemindersPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [reminders, setReminders] = useState<Reminders[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingReminder, setEditingReminder] = useState<Reminders | null>(null);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    reminderTitle: '',
    reminderDateTime: '',
    recurrenceRule: 'none',
    isActive: true,
    trackerCategory: '',
  });

  useEffect(() => {
    loadReminders();
    checkNotificationPermission();
    setupReminderChecks();
  }, []);

  const checkNotificationPermission = async () => {
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }
  };

  const requestNotificationPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      if (permission === 'granted') {
        toast({
          title: 'Notifications Enabled',
          description: 'You will now receive reminder notifications',
        });
      }
    }
  };

  const setupReminderChecks = () => {
    // Check reminders every minute
    const interval = setInterval(() => {
      checkDueReminders();
    }, 60000);

    return () => clearInterval(interval);
  };

  const checkDueReminders = async () => {
    const now = new Date();
    const result = await BaseCrudService.getAll<Reminders>('reminders');
    const activeReminders = result.items.filter(r => r.isActive);

    activeReminders.forEach(reminder => {
      if (reminder.reminderDateTime) {
        const reminderTime = new Date(reminder.reminderDateTime);
        const timeDiff = reminderTime.getTime() - now.getTime();
        
        // Trigger if within 1 minute
        if (timeDiff > 0 && timeDiff < 60000) {
          triggerNotification(reminder);
        }
      }
    });
  };

  const triggerNotification = (reminder: Reminders) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('QuantumLife Reminder', {
        body: reminder.reminderTitle || 'You have a reminder',
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: reminder._id,
      });
    }

    // Also show in-app toast
    toast({
      title: '🔔 Reminder',
      description: reminder.reminderTitle,
    });
  };

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
      recurrenceRule: reminder.recurrenceRule || 'none',
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
      recurrenceRule: 'none',
      isActive: true,
      trackerCategory: '',
    });
  };

  const activeReminders = reminders.filter(r => r.isActive).length;
  const upcomingReminders = reminders.filter(r => {
    if (!r.isActive || !r.reminderDateTime) return false;
    return new Date(r.reminderDateTime) > new Date();
  }).length;

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
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
                <span className="text-[var(--text-primary)]">Smart</span>{' '}
                <span className="bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent">
                  Reminders
                </span>
              </h1>
              <p className="font-paragraph text-lg text-[var(--text-secondary)]">
                Never miss a beat with intelligent reminders
              </p>
            </motion.div>

            <div className="flex gap-3">
              {notificationPermission !== 'granted' && (
                <Button 
                  onClick={requestNotificationPermission}
                  className="bg-warning/20 text-warning border border-warning/30 hover:bg-warning/30 font-paragraph"
                >
                  <Bell className="w-5 h-5 mr-2" />
                  Enable Notifications
                </Button>
              )}
              <Dialog open={isDialogOpen} onOpenChange={(open) => {
                setIsDialogOpen(open);
                if (!open) resetForm();
              }}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-br from-accent-cyan to-accent-purple text-white font-bold py-3 px-6 rounded-[18px] shadow-md hover:shadow-lg transition-all duration-300 font-paragraph ai-glow-cyan">
                  <Plus className="w-5 h-5 mr-2" />
                  Add Reminder
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[var(--bg-surface)] border-[var(--glass-border)]">
                <DialogHeader>
                  <DialogTitle className="font-heading text-2xl text-[var(--text-primary)]">
                    {editingReminder ? 'Edit Reminder' : 'Create New Reminder'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="reminderTitle" className="font-paragraph text-[var(--text-primary)]">Reminder Title</Label>
                    <Input
                      id="reminderTitle"
                      value={formData.reminderTitle}
                      onChange={(e) => setFormData({ ...formData, reminderTitle: e.target.value })}
                      required
                      className="bg-[var(--bg-elevated)] border-[var(--glass-border)] text-[var(--text-primary)] font-paragraph"
                      placeholder="e.g., Morning meditation"
                    />
                  </div>
                  <div>
                    <Label htmlFor="trackerCategory" className="font-paragraph text-[var(--text-primary)]">Category</Label>
                    <Input
                      id="trackerCategory"
                      value={formData.trackerCategory}
                      onChange={(e) => setFormData({ ...formData, trackerCategory: e.target.value })}
                      placeholder="e.g., Habit, Goal, Wellness"
                      className="bg-[var(--bg-elevated)] border-[var(--glass-border)] text-[var(--text-primary)] font-paragraph"
                    />
                  </div>
                  <div>
                    <Label htmlFor="reminderDateTime" className="font-paragraph text-[var(--text-primary)]">Date & Time</Label>
                    <Input
                      id="reminderDateTime"
                      type="datetime-local"
                      value={formData.reminderDateTime}
                      onChange={(e) => setFormData({ ...formData, reminderDateTime: e.target.value })}
                      className="bg-[var(--bg-elevated)] border-[var(--glass-border)] text-[var(--text-primary)] font-paragraph"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="recurrenceRule" className="font-paragraph text-[var(--text-primary)]">Recurrence</Label>
                    <Select
                      value={formData.recurrenceRule}
                      onValueChange={(value) => setFormData({ ...formData, recurrenceRule: value })}
                    >
                      <SelectTrigger className="bg-[var(--bg-elevated)] border-[var(--glass-border)] text-[var(--text-primary)] font-paragraph">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[var(--bg-surface)] border-[var(--glass-border)]">
                        <SelectItem value="none" className="font-paragraph text-[var(--text-primary)]">None</SelectItem>
                        <SelectItem value="daily" className="font-paragraph text-[var(--text-primary)]">Daily</SelectItem>
                        <SelectItem value="weekly" className="font-paragraph text-[var(--text-primary)]">Weekly</SelectItem>
                        <SelectItem value="monthly" className="font-paragraph text-[var(--text-primary)]">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="isActive" className="font-paragraph text-[var(--text-primary)]">Active</Label>
                    <Switch
                      id="isActive"
                      checked={formData.isActive}
                      onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-br from-accent-cyan to-accent-purple text-white font-bold py-3 rounded-[18px] font-paragraph ai-glow-cyan"
                  >
                    {editingReminder ? 'Update Reminder' : 'Create Reminder'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card glass-card-hover neomorph-shadow p-6"
            >
              <div className="font-paragraph text-sm text-[var(--text-secondary)] mb-2">Total Reminders</div>
              <div className="font-heading text-4xl font-bold text-accent-cyan">{reminders.length}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card glass-card-hover neomorph-shadow p-6"
            >
              <div className="font-paragraph text-sm text-[var(--text-secondary)] mb-2">Active Reminders</div>
              <div className="font-heading text-4xl font-bold text-accent-purple">{activeReminders}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card glass-card-hover neomorph-shadow p-6"
            >
              <div className="font-paragraph text-sm text-[var(--text-secondary)] mb-2">Upcoming</div>
              <div className="font-heading text-4xl font-bold text-success">{upcomingReminders}</div>
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
                    className={`glass-card glass-card-hover neomorph-shadow p-6 transition-all duration-300 ${
                      reminder.isActive 
                        ? 'border-accent-cyan/30' 
                        : 'opacity-60'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {reminder.trackerCategory && (
                            <span className="font-paragraph text-xs px-3 py-1 rounded-full bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/30">
                              {reminder.trackerCategory}
                            </span>
                          )}
                          {reminder.reminderDateTime && new Date(reminder.reminderDateTime) < new Date() && (
                            <span className="font-paragraph text-xs px-3 py-1 rounded-full bg-error/20 text-error border border-error/30">
                              Overdue
                            </span>
                          )}
                        </div>
                        <h3 className="font-heading text-xl font-bold text-[var(--text-primary)] mb-2">
                          {reminder.reminderTitle}
                        </h3>
                        <div className="space-y-1 font-paragraph text-sm text-[var(--text-secondary)]">
                          {reminder.reminderDateTime && (
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              {new Date(reminder.reminderDateTime).toLocaleString()}
                            </div>
                          )}
                          {reminder.recurrenceRule && reminder.recurrenceRule !== 'none' && (
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              Repeats: {reminder.recurrenceRule}
                            </div>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => toggleActive(reminder)}
                        className={`p-2 rounded-lg transition-all duration-300 ${
                          reminder.isActive
                            ? 'bg-accent-cyan/20 text-accent-cyan ai-glow-cyan'
                            : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)]'
                        }`}
                      >
                        {reminder.isActive ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
                      </button>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => openEditDialog(reminder)}
                        className="flex-1 bg-[var(--bg-elevated)] text-accent-cyan border border-accent-cyan/30 hover:bg-accent-cyan/10 font-paragraph text-sm"
                      >
                        <Edit2 className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(reminder._id)}
                        className="flex-1 bg-[var(--bg-elevated)] text-error border border-error/30 hover:bg-error/10 font-paragraph text-sm"
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
                <Calendar className="w-16 h-16 text-[var(--text-secondary)] mx-auto mb-4" />
                <h3 className="font-heading text-2xl font-bold text-[var(--text-primary)] mb-2">
                  No reminders yet
                </h3>
                <p className="font-paragraph text-[var(--text-secondary)] mb-6">
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
