import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Plus, Edit2, Trash2, Smile, Frown, Meh } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { WellnessCheckins } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function WellnessPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [checkins, setCheckins] = useState<WellnessCheckins[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCheckin, setEditingCheckin] = useState<WellnessCheckins | null>(null);
  const [formData, setFormData] = useState({
    moodRating: 5,
    journalEntry: '',
    activityType: '',
    checkinDateTime: '',
    stressLevel: 5,
    energyLevel: 5,
  });

  useEffect(() => {
    loadCheckins();
  }, []);

  const loadCheckins = async () => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<WellnessCheckins>('wellnesscheckins');
      setCheckins(result.items);
    } catch (error) {
      console.error('Error loading wellness checkins:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingCheckin) {
        await BaseCrudService.update<WellnessCheckins>('wellnesscheckins', {
          _id: editingCheckin._id,
          ...formData,
        });
        setCheckins(checkins.map(c => c._id === editingCheckin._id ? { ...c, ...formData } : c));
      } else {
        const newCheckin = await BaseCrudService.create<WellnessCheckins>('wellnesscheckins', {
          _id: crypto.randomUUID(),
          ...formData,
        });
        setCheckins([newCheckin, ...checkins]);
      }
      
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error saving wellness checkin:', error);
    }
  };

  const handleDelete = async (id: string) => {
    setCheckins(checkins.filter(c => c._id !== id));
    try {
      await BaseCrudService.delete('wellnesscheckins', id);
    } catch (error) {
      loadCheckins();
    }
  };

  const openEditDialog = (checkin: WellnessCheckins) => {
    setEditingCheckin(checkin);
    setFormData({
      moodRating: checkin.moodRating || 5,
      journalEntry: checkin.journalEntry || '',
      activityType: checkin.activityType || '',
      checkinDateTime: checkin.checkinDateTime ? new Date(checkin.checkinDateTime).toISOString().slice(0, 16) : '',
      stressLevel: checkin.stressLevel || 5,
      energyLevel: checkin.energyLevel || 5,
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingCheckin(null);
    setFormData({
      moodRating: 5,
      journalEntry: '',
      activityType: '',
      checkinDateTime: '',
      stressLevel: 5,
      energyLevel: 5,
    });
  };

  const avgMood = checkins.length > 0
    ? (checkins.reduce((sum, c) => sum + (c.moodRating || 0), 0) / checkins.length).toFixed(1)
    : '0';

  const avgStress = checkins.length > 0
    ? (checkins.reduce((sum, c) => sum + (c.stressLevel || 0), 0) / checkins.length).toFixed(1)
    : '0';

  const avgEnergy = checkins.length > 0
    ? (checkins.reduce((sum, c) => sum + (c.energyLevel || 0), 0) / checkins.length).toFixed(1)
    : '0';

  const getMoodIcon = (rating: number) => {
    if (rating >= 7) return <Smile className="w-5 h-5 text-accent-teal" />;
    if (rating >= 4) return <Meh className="w-5 h-5 text-accent-purple" />;
    return <Frown className="w-5 h-5 text-destructive" />;
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
      <Header />
      
      <main className="pt-24 pb-32 px-6 lg:px-8">
        <div className="max-w-[100rem] mx-auto space-y-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <h1 className="font-heading text-5xl lg:text-6xl font-bold">
                <span className="text-light-text dark:text-dark-text">Wellness</span>{' '}
                <span className="bg-gradient-to-r from-accent-teal to-accent-purple bg-clip-text text-transparent">
                  Tracker
                </span>
              </h1>
              <p className="font-paragraph text-lg text-light-text-secondary dark:text-dark-text-secondary">
                Monitor your mental health and wellness journey
              </p>
            </motion.div>

            <Dialog open={isDialogOpen} onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) resetForm();
            }}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-br from-accent-teal to-accent-purple text-black font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-paragraph">
                  <Plus className="w-5 h-5 mr-2" />
                  Add Check-in
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-light-surface dark:bg-dark-surface border-light-border dark:border-dark-border max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="font-heading text-2xl text-light-text dark:text-dark-text">
                    {editingCheckin ? 'Edit Check-in' : 'New Wellness Check-in'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="moodRating" className="font-paragraph text-light-text dark:text-dark-text">
                      Mood Rating: {formData.moodRating}/10
                    </Label>
                    <Input
                      id="moodRating"
                      type="number"
                      min="1"
                      max="10"
                      value={formData.moodRating}
                      onChange={(e) => setFormData({ ...formData, moodRating: Number(e.target.value) })}
                      className="bg-light-bg dark:bg-dark-bg border-light-border dark:border-dark-border text-light-text dark:text-dark-text font-paragraph"
                    />
                  </div>
                  <div>
                    <Label htmlFor="stressLevel" className="font-paragraph text-light-text dark:text-dark-text">
                      Stress Level: {formData.stressLevel}/10
                    </Label>
                    <Input
                      id="stressLevel"
                      type="number"
                      min="1"
                      max="10"
                      value={formData.stressLevel}
                      onChange={(e) => setFormData({ ...formData, stressLevel: Number(e.target.value) })}
                      className="bg-light-bg dark:bg-dark-bg border-light-border dark:border-dark-border text-light-text dark:text-dark-text font-paragraph"
                    />
                  </div>
                  <div>
                    <Label htmlFor="energyLevel" className="font-paragraph text-light-text dark:text-dark-text">
                      Energy Level: {formData.energyLevel}/10
                    </Label>
                    <Input
                      id="energyLevel"
                      type="number"
                      min="1"
                      max="10"
                      value={formData.energyLevel}
                      onChange={(e) => setFormData({ ...formData, energyLevel: Number(e.target.value) })}
                      className="bg-light-bg dark:bg-dark-bg border-light-border dark:border-dark-border text-light-text dark:text-dark-text font-paragraph"
                    />
                  </div>
                  <div>
                    <Label htmlFor="activityType" className="font-paragraph text-light-text dark:text-dark-text">Activity Type</Label>
                    <Input
                      id="activityType"
                      value={formData.activityType}
                      onChange={(e) => setFormData({ ...formData, activityType: e.target.value })}
                      placeholder="e.g., Meditation, Exercise, Journaling"
                      className="bg-light-bg dark:bg-dark-bg border-light-border dark:border-dark-border text-light-text dark:text-dark-text font-paragraph"
                    />
                  </div>
                  <div>
                    <Label htmlFor="journalEntry" className="font-paragraph text-light-text dark:text-dark-text">Journal Entry</Label>
                    <Textarea
                      id="journalEntry"
                      value={formData.journalEntry}
                      onChange={(e) => setFormData({ ...formData, journalEntry: e.target.value })}
                      placeholder="How are you feeling today?"
                      className="bg-light-bg dark:bg-dark-bg border-light-border dark:border-dark-border text-light-text dark:text-dark-text font-paragraph min-h-[100px]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="checkinDateTime" className="font-paragraph text-light-text dark:text-dark-text">Date & Time</Label>
                    <Input
                      id="checkinDateTime"
                      type="datetime-local"
                      value={formData.checkinDateTime}
                      onChange={(e) => setFormData({ ...formData, checkinDateTime: e.target.value })}
                      className="bg-light-bg dark:bg-dark-bg border-light-border dark:border-dark-border text-light-text dark:text-dark-text font-paragraph"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-br from-accent-teal to-accent-purple text-black font-bold py-3 rounded-lg font-paragraph"
                  >
                    {editingCheckin ? 'Update Check-in' : 'Save Check-in'}
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
              className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-2xl p-6"
            >
              <div className="font-paragraph text-sm text-light-text-secondary dark:text-dark-text-secondary mb-2">Avg Mood</div>
              <div className="font-heading text-4xl font-bold text-accent-teal">{avgMood}/10</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-2xl p-6"
            >
              <div className="font-paragraph text-sm text-light-text-secondary dark:text-dark-text-secondary mb-2">Avg Stress</div>
              <div className="font-heading text-4xl font-bold text-accent-purple">{avgStress}/10</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-2xl p-6"
            >
              <div className="font-paragraph text-sm text-light-text-secondary dark:text-dark-text-secondary mb-2">Avg Energy</div>
              <div className="font-heading text-4xl font-bold text-accent-teal">{avgEnergy}/10</div>
            </motion.div>
          </div>

          {/* Check-ins List */}
          <div className="min-h-[400px]">
            {isLoading ? null : checkins.length > 0 ? (
              <div className="space-y-4">
                {checkins.map((checkin, index) => (
                  <motion.div
                    key={checkin._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-2xl p-6 hover:border-accent-teal/30 transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          {getMoodIcon(checkin.moodRating || 5)}
                          <div className="flex flex-wrap gap-4 font-paragraph text-sm text-light-text-secondary dark:text-dark-text-secondary">
                            <span>Mood: {checkin.moodRating}/10</span>
                            <span>Stress: {checkin.stressLevel}/10</span>
                            <span>Energy: {checkin.energyLevel}/10</span>
                          </div>
                        </div>
                        {checkin.activityType && (
                          <span className="inline-block font-paragraph text-xs px-3 py-1 rounded-full bg-accent-teal/20 text-accent-teal border border-accent-teal/30 mb-3">
                            {checkin.activityType}
                          </span>
                        )}
                        {checkin.journalEntry && (
                          <p className="font-paragraph text-sm text-light-text-secondary dark:text-dark-text-secondary mb-3">
                            {checkin.journalEntry}
                          </p>
                        )}
                        {checkin.checkinDateTime && (
                          <div className="font-paragraph text-xs text-light-text-secondary dark:text-dark-text-secondary">
                            {new Date(checkin.checkinDateTime).toLocaleString()}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => openEditDialog(checkin)}
                          className="bg-light-bg dark:bg-dark-bg text-accent-teal border border-accent-teal/30 hover:bg-accent-teal/10 font-paragraph text-sm"
                        >
                          <Edit2 className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDelete(checkin._id)}
                          className="bg-light-bg dark:bg-dark-bg text-destructive border border-destructive/30 hover:bg-destructive/10 font-paragraph text-sm"
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
                <Heart className="w-16 h-16 text-light-text-secondary dark:text-dark-text-secondary mx-auto mb-4" />
                <h3 className="font-heading text-2xl font-bold text-light-text dark:text-dark-text mb-2">
                  No check-ins yet
                </h3>
                <p className="font-paragraph text-light-text-secondary dark:text-dark-text-secondary mb-6">
                  Start your wellness journey by creating your first check-in
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      <BottomNav />
      <Footer />
    </div>
  );
}
