import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Award } from 'lucide-react';
import { useMember } from '@/integrations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import { Image } from '@/components/ui/image';

export default function ProfilePage() {
  const { member } = useMember();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
              <h1 className="font-heading text-5xl lg:text-6xl font-bold text-light-text dark:text-dark-text">
                Your Profile
              </h1>
              <p className="font-paragraph text-lg text-light-text-secondary dark:text-dark-text-secondary">
                Manage your account information and preferences
              </p>
            </div>

            {/* Profile Card */}
            <div className="max-w-3xl">
              <div className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-2xl p-8 shadow-soft">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {/* Profile Picture */}
                  <div className="flex-shrink-0">
                    {member?.profile?.photo?.url ? (
                      <Image
                        src={member.profile.photo.url}
                        alt={member.profile?.nickname || 'Profile'}
                        width={120}
                        className="w-32 h-32 rounded-2xl object-cover border-2 border-primary/30"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <User className="w-16 h-16 text-primary" />
                      </div>
                    )}
                  </div>

                  {/* Profile Info */}
                  <div className="flex-1 space-y-6">
                    <div>
                      <h2 className="font-heading text-3xl font-bold text-light-text dark:text-dark-text mb-2">
                        {member?.profile?.nickname || member?.contact?.firstName || 'User'}
                      </h2>
                      {member?.profile?.title && (
                        <p className="font-paragraph text-sm text-primary">
                          {member.profile.title}
                        </p>
                      )}
                    </div>

                    <div className="space-y-4">
                      {member?.loginEmail && (
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                            <Mail className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-paragraph text-xs text-light-text-secondary dark:text-dark-text-secondary">Email</div>
                            <div className="font-paragraph text-sm text-light-text dark:text-dark-text">
                              {member.loginEmail}
                            </div>
                          </div>
                        </div>
                      )}

                      {member?._createdDate && (
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                            <Calendar className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-paragraph text-xs text-light-text-secondary dark:text-dark-text-secondary">Member Since</div>
                            <div className="font-paragraph text-sm text-light-text dark:text-dark-text">
                              {new Date(member._createdDate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                          <Award className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-paragraph text-xs text-light-text-secondary dark:text-dark-text-secondary">Status</div>
                          <div className="font-paragraph text-sm text-light-text dark:text-dark-text">
                            {member?.status || 'Active'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="max-w-3xl">
              <div className="bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border rounded-2xl p-8 shadow-soft">
                <h3 className="font-heading text-2xl font-bold text-light-text dark:text-dark-text mb-6">
                  Account Details
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="font-paragraph text-sm text-light-text-secondary dark:text-dark-text-secondary mb-1">First Name</div>
                    <div className="font-paragraph text-base text-light-text dark:text-dark-text">
                      {member?.contact?.firstName || 'Not set'}
                    </div>
                  </div>
                  <div>
                    <div className="font-paragraph text-sm text-light-text-secondary dark:text-dark-text-secondary mb-1">Last Name</div>
                    <div className="font-paragraph text-base text-light-text dark:text-dark-text">
                      {member?.contact?.lastName || 'Not set'}
                    </div>
                  </div>
                  <div>
                    <div className="font-paragraph text-sm text-light-text-secondary dark:text-dark-text-secondary mb-1">Email Verified</div>
                    <div className="font-paragraph text-base text-light-text dark:text-dark-text">
                      {member?.loginEmailVerified ? (
                        <span className="text-success">✓ Verified</span>
                      ) : (
                        <span className="text-light-text-secondary dark:text-dark-text-secondary">Not verified</span>
                      )}
                    </div>
                  </div>
                  {member?.lastLoginDate && (
                    <div>
                      <div className="font-paragraph text-sm text-light-text-secondary dark:text-dark-text-secondary mb-1">Last Login</div>
                      <div className="font-paragraph text-base text-light-text dark:text-dark-text">
                        {new Date(member.lastLoginDate).toLocaleDateString()}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
