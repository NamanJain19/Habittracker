import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Save, CheckCircle2 } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { UserSettings } from '@/entities';
import { useThemeStore } from '@/lib/theme-store';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const { theme, language, setTheme, setLanguage } = useThemeStore();
  const [formData, setFormData] = useState({
    themePreference: theme,
    enableNotifications: true,
    notificationSound: true,
    shareActivityData: false,
    languagePreference: language,
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<UserSettings>('usersettings', {}, { limit: 1 });
      if (result.items.length > 0) {
        const userSettings = result.items[0];
        setSettings(userSettings);
        const loadedTheme = (userSettings.themePreference || 'dark') as 'dark' | 'light' | 'auto';
        const loadedLang = userSettings.languagePreference || 'en';
        
        setFormData({
          themePreference: loadedTheme,
          enableNotifications: userSettings.enableNotifications !== undefined ? userSettings.enableNotifications : true,
          notificationSound: userSettings.notificationSound !== undefined ? userSettings.notificationSound : true,
          shareActivityData: userSettings.shareActivityData || false,
          languagePreference: loadedLang,
        });
        
        // Apply loaded settings
        setTheme(loadedTheme);
        setLanguage(loadedLang);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleThemeChange = (value: string) => {
    const newTheme = value as 'dark' | 'light' | 'auto';
    setFormData({ ...formData, themePreference: newTheme });
    setTheme(newTheme);
  };

  const handleLanguageChange = (value: string) => {
    setFormData({ ...formData, languagePreference: value });
    setLanguage(value);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (settings) {
        await BaseCrudService.update<UserSettings>('usersettings', {
          _id: settings._id,
          ...formData,
        });
      } else {
        const newSettings = await BaseCrudService.create<UserSettings>('usersettings', {
          _id: crypto.randomUUID(),
          ...formData,
        });
        setSettings(newSettings);
      }
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg">
      <Header onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="pt-24 pb-16 px-6 lg:px-8">
        <div className="max-w-[100rem] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="space-y-2">
              <h1 className="font-heading text-5xl lg:text-6xl font-bold">
                <span className="text-[var(--text-primary)]">App</span>{' '}
                <span className="bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent">
                  Settings
                </span>
              </h1>
              <p className="font-paragraph text-lg text-[var(--text-secondary)]">
                Customize your experience and preferences
              </p>
            </div>

            {/* Settings Form */}
            <div className="max-w-3xl min-h-[400px]">
              {isLoading ? (
                <div className="flex justify-center items-center py-20">
                  <LoadingSpinner />
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Appearance */}
                  <div className="glass-card glass-card-hover neomorph-shadow p-8">
                    <h3 className="font-heading text-2xl font-bold text-[var(--text-primary)] mb-6">
                      Appearance
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="themePreference" className="font-paragraph text-[var(--text-primary)] mb-2 block">
                          Theme
                        </Label>
                        <Select
                          value={formData.themePreference}
                          onValueChange={handleThemeChange}
                        >
                          <SelectTrigger className="bg-[var(--bg-elevated)] border-[var(--glass-border)] text-[var(--text-primary)] font-paragraph">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[var(--bg-surface)] border-[var(--glass-border)]">
                            <SelectItem value="dark" className="font-paragraph text-[var(--text-primary)]">🌙 Dark Mode</SelectItem>
                            <SelectItem value="light" className="font-paragraph text-[var(--text-primary)]">☀️ Light Mode</SelectItem>
                            <SelectItem value="auto" className="font-paragraph text-[var(--text-primary)]">🔄 Auto (System)</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="font-paragraph text-xs text-[var(--text-secondary)] mt-2">
                          {formData.themePreference === 'auto' 
                            ? 'Automatically switches based on your system preferences' 
                            : `Currently using ${formData.themePreference} mode`}
                        </p>
                      </div>
                      <div>
                        <Label htmlFor="languagePreference" className="font-paragraph text-[var(--text-primary)] mb-2 block">
                          Language
                        </Label>
                        <Select
                          value={formData.languagePreference}
                          onValueChange={handleLanguageChange}
                        >
                          <SelectTrigger className="bg-[var(--bg-elevated)] border-[var(--glass-border)] text-[var(--text-primary)] font-paragraph">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-[var(--bg-surface)] border-[var(--glass-border)]">
                            <SelectItem value="en" className="font-paragraph text-[var(--text-primary)]">🇺🇸 English</SelectItem>
                            <SelectItem value="es" className="font-paragraph text-[var(--text-primary)]">🇪🇸 Español</SelectItem>
                            <SelectItem value="fr" className="font-paragraph text-[var(--text-primary)]">🇫🇷 Français</SelectItem>
                            <SelectItem value="de" className="font-paragraph text-[var(--text-primary)]">🇩🇪 Deutsch</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Notifications */}
                  <div className="glass-card glass-card-hover neomorph-shadow p-8">
                    <h3 className="font-heading text-2xl font-bold text-[var(--text-primary)] mb-6">
                      Notifications
                    </h3>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="enableNotifications" className="font-paragraph text-[var(--text-primary)]">
                            Enable Notifications
                          </Label>
                          <p className="font-paragraph text-sm text-[var(--text-secondary)] mt-1">
                            Receive reminders and updates
                          </p>
                        </div>
                        <Switch
                          id="enableNotifications"
                          checked={formData.enableNotifications}
                          onCheckedChange={(checked) => setFormData({ ...formData, enableNotifications: checked })}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="notificationSound" className="font-paragraph text-[var(--text-primary)]">
                            Notification Sound
                          </Label>
                          <p className="font-paragraph text-sm text-[var(--text-secondary)] mt-1">
                            Play sound for notifications
                          </p>
                        </div>
                        <Switch
                          id="notificationSound"
                          checked={formData.notificationSound}
                          onCheckedChange={(checked) => setFormData({ ...formData, notificationSound: checked })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Privacy */}
                  <div className="glass-card glass-card-hover neomorph-shadow p-8">
                    <h3 className="font-heading text-2xl font-bold text-[var(--text-primary)] mb-6">
                      Privacy
                    </h3>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="shareActivityData" className="font-paragraph text-[var(--text-primary)]">
                            Share Activity Data
                          </Label>
                          <p className="font-paragraph text-sm text-[var(--text-secondary)] mt-1">
                            Share your progress with the community
                          </p>
                        </div>
                        <Switch
                          id="shareActivityData"
                          checked={formData.shareActivityData}
                          onCheckedChange={(checked) => setFormData({ ...formData, shareActivityData: checked })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Save Button */}
                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="w-full bg-gradient-to-br from-accent-cyan to-accent-purple text-white font-bold py-4 rounded-[18px] shadow-md hover:shadow-lg transition-all duration-300 font-paragraph text-base ai-glow-cyan"
                  >
                    {isSaving ? (
                      <>
                        <LoadingSpinner />
                        <span className="ml-2">Saving...</span>
                      </>
                    ) : showSuccess ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 mr-2" />
                        Settings Saved!
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5 mr-2" />
                        Save Settings
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
