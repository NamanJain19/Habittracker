import { motion } from 'framer-motion';
import { User, Mail, Calendar, Award } from 'lucide-react';
import { useMember } from '@/integrations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';

export default function ProfilePage() {
  const { member } = useMember();

  return (
    <div className="min-h-screen bg-dark-background text-light-foreground">
      <Header />
      
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
                <span className="text-light-foreground">Your</span>{' '}
                <span className="bg-gradient-to-r from-accent-teal to-accent-purple bg-clip-text text-transparent">
                  Profile
                </span>
              </h1>
              <p className="font-paragraph text-lg text-light-foreground/70">
                Manage your account information and preferences
              </p>
            </div>

            {/* Profile Card */}
            <div className="max-w-3xl">
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {/* Profile Picture */}
                  <div className="flex-shrink-0">
                    {member?.profile?.photo?.url ? (
                      <Image
                        src={member.profile.photo.url}
                        alt={member.profile?.nickname || 'Profile'}
                        width={120}
                        className="w-32 h-32 rounded-2xl object-cover border-2 border-accent-teal/30"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-accent-teal to-accent-purple flex items-center justify-center">
                        <User className="w-16 h-16 text-black" />
                      </div>
                    )}
                  </div>

                  {/* Profile Info */}
                  <div className="flex-1 space-y-6">
                    <div>
                      <h2 className="font-heading text-3xl font-bold text-light-foreground mb-2">
                        {member?.profile?.nickname || member?.contact?.firstName || 'User'}
                      </h2>
                      {member?.profile?.title && (
                        <p className="font-paragraph text-sm text-accent-teal">
                          {member.profile.title}
                        </p>
                      )}
                    </div>

                    <div className="space-y-4">
                      {member?.loginEmail && (
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                            <Mail className="w-5 h-5 text-accent-teal" />
                          </div>
                          <div>
                            <div className="font-paragraph text-xs text-light-foreground/60">Email</div>
                            <div className="font-paragraph text-sm text-light-foreground">
                              {member.loginEmail}
                            </div>
                          </div>
                        </div>
                      )}

                      {member?._createdDate && (
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                            <Calendar className="w-5 h-5 text-accent-purple" />
                          </div>
                          <div>
                            <div className="font-paragraph text-xs text-light-foreground/60">Member Since</div>
                            <div className="font-paragraph text-sm text-light-foreground">
                              {new Date(member._createdDate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                          <Award className="w-5 h-5 text-accent-teal" />
                        </div>
                        <div>
                          <div className="font-paragraph text-xs text-light-foreground/60">Status</div>
                          <div className="font-paragraph text-sm text-light-foreground">
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
              <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8">
                <h3 className="font-heading text-2xl font-bold text-light-foreground mb-6">
                  Account Details
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="font-paragraph text-sm text-light-foreground/60 mb-1">First Name</div>
                    <div className="font-paragraph text-base text-light-foreground">
                      {member?.contact?.firstName || 'Not set'}
                    </div>
                  </div>
                  <div>
                    <div className="font-paragraph text-sm text-light-foreground/60 mb-1">Last Name</div>
                    <div className="font-paragraph text-base text-light-foreground">
                      {member?.contact?.lastName || 'Not set'}
                    </div>
                  </div>
                  <div>
                    <div className="font-paragraph text-sm text-light-foreground/60 mb-1">Email Verified</div>
                    <div className="font-paragraph text-base text-light-foreground">
                      {member?.loginEmailVerified ? (
                        <span className="text-accent-teal">✓ Verified</span>
                      ) : (
                        <span className="text-light-foreground/60">Not verified</span>
                      )}
                    </div>
                  </div>
                  {member?.lastLoginDate && (
                    <div>
                      <div className="font-paragraph text-sm text-light-foreground/60 mb-1">Last Login</div>
                      <div className="font-paragraph text-base text-light-foreground">
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
