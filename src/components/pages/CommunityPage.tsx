import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Plus, Heart, MessageCircle } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { CommunityPosts } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Image } from '@/components/ui/image';

export default function CommunityPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [posts, setPosts] = useState<CommunityPosts[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    postContent: '',
    authorDisplayName: '',
    mediaAttachment: 'https://static.wixstatic.com/media/0c8865_4b0f85556a134f91a655d950c5858914~mv2.png?originWidth=768&originHeight=576',
  });

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<CommunityPosts>('communityposts');
      setPosts(result.items);
    } catch (error) {
      console.error('Error loading community posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const newPost = await BaseCrudService.create<CommunityPosts>('communityposts', {
        _id: crypto.randomUUID(),
        ...formData,
        timestamp: new Date().toISOString(),
        likeCount: 0,
        commentCount: 0,
      });
      setPosts([newPost, ...posts]);
      
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleLike = async (post: CommunityPosts) => {
    const newLikeCount = (post.likeCount || 0) + 1;
    setPosts(posts.map(p => 
      p._id === post._id 
        ? { ...p, likeCount: newLikeCount }
        : p
    ));
    
    try {
      await BaseCrudService.update<CommunityPosts>('communityposts', {
        _id: post._id,
        likeCount: newLikeCount,
      });
    } catch (error) {
      loadPosts();
    }
  };

  const resetForm = () => {
    setFormData({
      postContent: '',
      authorDisplayName: '',
      mediaAttachment: 'https://static.wixstatic.com/media/0c8865_504fb7d590474eb78ddcb4fd6a8b6b91~mv2.png?originWidth=768&originHeight=576',
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
              <h1 className="font-heading text-5xl lg:text-6xl font-bold">
                <span className="text-light-foreground">Community</span>{' '}
                <span className="bg-gradient-to-r from-accent-teal to-accent-purple bg-clip-text text-transparent">
                  Hub
                </span>
              </h1>
              <p className="font-paragraph text-lg text-light-foreground/70">
                Share your journey and connect with others
              </p>
            </motion.div>

            <Dialog open={isDialogOpen} onOpenChange={(open) => {
              setIsDialogOpen(open);
              if (!open) resetForm();
            }}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-br from-accent-teal to-accent-purple text-black font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-paragraph">
                  <Plus className="w-5 h-5 mr-2" />
                  Create Post
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-dark-background border-white/10">
                <DialogHeader>
                  <DialogTitle className="font-heading text-2xl text-light-foreground">
                    Share Your Achievement
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="authorDisplayName" className="font-paragraph text-light-foreground">Your Name</Label>
                    <Input
                      id="authorDisplayName"
                      value={formData.authorDisplayName}
                      onChange={(e) => setFormData({ ...formData, authorDisplayName: e.target.value })}
                      required
                      className="bg-white/5 border-white/10 text-light-foreground font-paragraph"
                    />
                  </div>
                  <div>
                    <Label htmlFor="postContent" className="font-paragraph text-light-foreground">Post Content</Label>
                    <Textarea
                      id="postContent"
                      value={formData.postContent}
                      onChange={(e) => setFormData({ ...formData, postContent: e.target.value })}
                      placeholder="Share your progress, achievements, or insights..."
                      required
                      className="bg-white/5 border-white/10 text-light-foreground font-paragraph min-h-[120px]"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-br from-accent-teal to-accent-purple text-black font-bold py-3 rounded-lg font-paragraph"
                  >
                    Share Post
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Posts Feed */}
          <div className="min-h-[400px]">
            {isLoading ? null : posts.length > 0 ? (
              <div className="max-w-3xl mx-auto space-y-6">
                {posts.map((post, index) => (
                  <motion.div
                    key={post._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-accent-teal/30 transition-all duration-300"
                  >
                    {/* Author Info */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-teal to-accent-purple flex items-center justify-center font-heading font-bold text-black">
                        {post.authorDisplayName?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div>
                        <div className="font-heading text-sm font-bold text-light-foreground">
                          {post.authorDisplayName}
                        </div>
                        {post.timestamp && (
                          <div className="font-paragraph text-xs text-light-foreground/60">
                            {new Date(post.timestamp).toLocaleString()}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Post Content */}
                    <p className="font-paragraph text-base text-light-foreground/90 mb-4 leading-relaxed">
                      {post.postContent}
                    </p>

                    {/* Media Attachment */}
                    {post.mediaAttachment && (
                      <div className="mb-4 rounded-xl overflow-hidden">
                        <Image
                          src={post.mediaAttachment}
                          alt="Post media"
                          width={800}
                          className="w-full h-auto"
                        />
                      </div>
                    )}

                    {/* Engagement */}
                    <div className="flex items-center gap-6 pt-4 border-t border-white/10">
                      <button
                        onClick={() => handleLike(post)}
                        className="flex items-center gap-2 font-paragraph text-sm text-light-foreground/70 hover:text-accent-teal transition-colors"
                      >
                        <Heart className="w-5 h-5" />
                        <span>{post.likeCount || 0}</span>
                      </button>
                      <div className="flex items-center gap-2 font-paragraph text-sm text-light-foreground/70">
                        <MessageCircle className="w-5 h-5" />
                        <span>{post.commentCount || 0}</span>
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
                <Users className="w-16 h-16 text-light-foreground/30 mx-auto mb-4" />
                <h3 className="font-heading text-2xl font-bold text-light-foreground mb-2">
                  No posts yet
                </h3>
                <p className="font-paragraph text-light-foreground/60 mb-6">
                  Be the first to share your journey with the community
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
