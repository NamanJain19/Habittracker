import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Plus, Edit2, Trash2 } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { ProductivityLogs } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ProductivityPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [logs, setLogs] = useState<ProductivityLogs[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLog, setEditingLog] = useState<ProductivityLogs | null>(null);
  const [formData, setFormData] = useState({
    taskOrSessionName: '',
    durationMinutes: 0,
    logDateTime: '',
    productivityScore: 0,
    categoryTag: '',
  });

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<ProductivityLogs>('productivitylogs');
      setLogs(result.items);
    } catch (error) {
      console.error('Error loading productivity logs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingLog) {
        await BaseCrudService.update<ProductivityLogs>('productivitylogs', {
          _id: editingLog._id,
          ...formData,
        });
        setLogs(logs.map(l => l._id === editingLog._id ? { ...l, ...formData } : l));
      } else {
        const newLog = await BaseCrudService.create<ProductivityLogs>('productivitylogs', {
          _id: crypto.randomUUID(),
          ...formData,
        });
        setLogs([newLog, ...logs]);
      }
      
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error saving productivity log:', error);
    }
  };

  const handleDelete = async (id: string) => {
    setLogs(logs.filter(l => l._id !== id));
    try {
      await BaseCrudService.delete('productivitylogs', id);
    } catch (error) {
      loadLogs();
    }
  };

  const openEditDialog = (log: ProductivityLogs) => {
    setEditingLog(log);
    setFormData({
      taskOrSessionName: log.taskOrSessionName || '',
      durationMinutes: log.durationMinutes || 0,
      logDateTime: log.logDateTime ? new Date(log.logDateTime).toISOString().slice(0, 16) : '',
      productivityScore: log.productivityScore || 0,
      categoryTag: log.categoryTag || '',
    });
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setEditingLog(null);
    setFormData({
      taskOrSessionName: '',
      durationMinutes: 0,
      logDateTime: '',
      productivityScore: 0,
      categoryTag: '',
    });
  };

  const avgScore = logs.length > 0
    ? (logs.reduce((sum, l) => sum + (l.productivityScore || 0), 0) / logs.length).toFixed(1)
    : '0';

  const totalMinutes = logs.reduce((sum, l) => sum + (l.durationMinutes || 0), 0);
  const totalHours = (totalMinutes / 60).toFixed(1);

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
                <span className="text-light-foreground">Productivity</span>{' '}
                <span className="bg-gradient-to-r from-accent-teal to-accent-purple bg-clip-text text-transparent">
                  Tracker
                </span>
              </h1>
              <p className="font-paragraph text-lg text-light-foreground/70">
                Log and analyze your productivity metrics
              </p>
            </motion.div>

            <Dialog open={isDialogOpen} onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) resetForm();
            }}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-br from-accent-teal to-accent-purple text-black font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-paragraph">
                  <Plus className="w-5 h-5 mr-2" />
                  Add Log
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-dark-background border-white/10">
                <DialogHeader>
                  <DialogTitle className="font-heading text-2xl text-light-foreground">
                    {editingLog ? 'Edit Log' : 'Create New Log'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="taskOrSessionName" className="font-paragraph text-light-foreground">Task/Session Name</Label>
                    <Input
                      id="taskOrSessionName"
                      value={formData.taskOrSessionName}
                      onChange={(e) => setFormData({ ...formData, taskOrSessionName: e.target.value })}
                      required
                      className="bg-white/5 border-white/10 text-light-foreground font-paragraph"
                    />
                  </div>
                  <div>
                    <Label htmlFor="categoryTag" className="font-paragraph text-light-foreground">Category</Label>
                    <Input
                      id="categoryTag"
                      value={formData.categoryTag}
                      onChange={(e) => setFormData({ ...formData, categoryTag: e.target.value })}
                      placeholder="e.g., Work, Study, Project"
                      className="bg-white/5 border-white/10 text-light-foreground font-paragraph"
                    />
                  </div>
                  <div>
                    <Label htmlFor="durationMinutes" className="font-paragraph text-light-foreground">Duration (minutes)</Label>
                    <Input
                      id="durationMinutes"
                      type="number"
                      min="0"
                      value={formData.durationMinutes}
                      onChange={(e) => setFormData({ ...formData, durationMinutes: Number(e.target.value) })}
                      className="bg-white/5 border-white/10 text-light-foreground font-paragraph"
                    />
                  </div>
                  <div>
                    <Label htmlFor="productivityScore" className="font-paragraph text-light-foreground">Productivity Score (1-10)</Label>
                    <Input
                      id="productivityScore"
                      type="number"
                      min="1"
                      max="10"
                      value={formData.productivityScore}
                      onChange={(e) => setFormData({ ...formData, productivityScore: Number(e.target.value) })}
                      className="bg-white/5 border-white/10 text-light-foreground font-paragraph"
                    />
                  </div>
                  <div>
                    <Label htmlFor="logDateTime" className="font-paragraph text-light-foreground">Date & Time</Label>
                    <Input
                      id="logDateTime"
                      type="datetime-local"
                      value={formData.logDateTime}
                      onChange={(e) => setFormData({ ...formData, logDateTime: e.target.value })}
                      className="bg-white/5 border-white/10 text-light-foreground font-paragraph"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-br from-accent-teal to-accent-purple text-black font-bold py-3 rounded-lg font-paragraph"
                  >
                    {editingLog ? 'Update Log' : 'Create Log'}
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
              <div className="font-paragraph text-sm text-light-foreground/60 mb-2">Total Sessions</div>
              <div className="font-heading text-4xl font-bold text-accent-teal">{logs.length}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <div className="font-paragraph text-sm text-light-foreground/60 mb-2">Total Hours</div>
              <div className="font-heading text-4xl font-bold text-accent-purple">{totalHours}h</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <div className="font-paragraph text-sm text-light-foreground/60 mb-2">Avg Score</div>
              <div className="font-heading text-4xl font-bold text-accent-teal">{avgScore}/10</div>
            </motion.div>
          </div>

          {/* Logs List */}
          <div className="min-h-[400px]">
            {isLoading ? null : logs.length > 0 ? (
              <div className="space-y-4">
                {logs.map((log, index) => (
                  <motion.div
                    key={log._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-accent-teal/30 transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {log.categoryTag && (
                            <span className="font-paragraph text-xs px-3 py-1 rounded-full bg-accent-teal/20 text-accent-teal border border-accent-teal/30">
                              {log.categoryTag}
                            </span>
                          )}
                        </div>
                        <h3 className="font-heading text-xl font-bold text-light-foreground mb-1">
                          {log.taskOrSessionName}
                        </h3>
                        <div className="flex flex-wrap gap-4 font-paragraph text-sm text-light-foreground/60">
                          <span>{log.durationMinutes} minutes</span>
                          <span>Score: {log.productivityScore}/10</span>
                          {log.logDateTime && (
                            <span>{new Date(log.logDateTime).toLocaleString()}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => openEditDialog(log)}
                          className="bg-white/5 text-accent-teal border border-accent-teal/30 hover:bg-accent-teal/10 font-paragraph text-sm"
                        >
                          <Edit2 className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDelete(log._id)}
                          className="bg-white/5 text-destructive border border-destructive/30 hover:bg-destructive/10 font-paragraph text-sm"
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
                <TrendingUp className="w-16 h-16 text-light-foreground/30 mx-auto mb-4" />
                <h3 className="font-heading text-2xl font-bold text-light-foreground mb-2">
                  No logs yet
                </h3>
                <p className="font-paragraph text-light-foreground/60 mb-6">
                  Start tracking your productivity by creating your first log
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
