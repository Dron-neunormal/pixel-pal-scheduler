
import React, { useState } from 'react';
import { CalendarView } from './CalendarView';
import { PostSidebar } from './PostSidebar';
import { PostModal } from './PostModal';
import { Plus, Bell, User } from 'lucide-react';
import { motion } from 'framer-motion';

export interface SocialPost {
  id: string;
  title: string;
  content: string;
  platform: 'x' | 'instagram' | 'facebook' | 'youtube' | 'linkedin' | 'pinterest';
  date: string;
  time: string;
  hashtags: string[];
  status: 'scheduled' | 'published' | 'draft';
}

const mockPosts: SocialPost[] = [
  {
    id: '1',
    title: 'Summer Product Launch',
    content: 'Exciting news! Our new summer collection is here. Get ready for amazing deals and exclusive offers. Limited time only!',
    platform: 'instagram',
    date: '2025-06-15',
    time: '14:00',
    hashtags: ['#summer', '#launch', '#deals'],
    status: 'scheduled',
  },
  {
    id: '2',
    title: 'Weekly Newsletter',
    content: 'This week in tech: AI breakthroughs, new social media trends, and marketing insights you can\'t miss.',
    platform: 'linkedin',
    date: '2025-06-15',
    time: '09:30',
    hashtags: ['#newsletter', '#tech', '#marketing'],
    status: 'scheduled',
  },
  {
    id: '3',
    title: 'Behind the Scenes',
    content: 'Take a look behind the scenes of our creative process. From concept to execution, here\'s how we make magic happen.',
    platform: 'x',
    date: '2025-06-16',
    time: '16:45',
    hashtags: ['#BTS', '#creative', '#process'],
    status: 'scheduled',
  },
  {
    id: '4',
    title: 'Tutorial Tuesday',
    content: 'Step-by-step guide to mastering social media marketing. Today we cover content planning and audience engagement strategies.',
    platform: 'youtube',
    date: '2025-06-18',
    time: '11:00',
    hashtags: ['#tutorial', '#marketing', '#tips'],
    status: 'scheduled',
  },
  {
    id: '5',
    title: 'Design Inspiration',
    content: 'Beautiful design inspiration for your next project. Clean layouts, vibrant colors, and modern aesthetics.',
    platform: 'pinterest',
    date: '2025-06-12',
    time: '10:15',
    hashtags: ['#design', '#inspiration', '#modern'],
    status: 'scheduled',
  },
  {
    id: '6',
    title: 'Community Update',
    content: 'Thank you to our amazing community! Your support means everything. Here\'s what we\'ve accomplished together this month.',
    platform: 'facebook',
    date: '2025-06-20',
    time: '19:30',
    hashtags: ['#community', '#thankyou', '#update'],
    status: 'scheduled',
  },
];

export const SocialScheduler: React.FC = () => {
  const [posts, setPosts] = useState<SocialPost[]>(mockPosts);
  const [selectedDate, setSelectedDate] = useState<string>('2025-06-15');
  const [selectedPost, setSelectedPost] = useState<SocialPost | null>(null);
  const [showNewPostModal, setShowNewPostModal] = useState(false);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
  };

  const handlePostSelect = (post: SocialPost) => {
    setSelectedPost(post);
  };

  const handlePostSave = (updatedPost: SocialPost) => {
    setPosts(prev => prev.map(post => 
      post.id === updatedPost.id ? updatedPost : post
    ));
    setSelectedPost(null);
  };

  const handleNewPost = () => {
    const newPost: SocialPost = {
      id: Date.now().toString(),
      title: 'New Post',
      content: '',
      platform: 'instagram',
      date: selectedDate,
      time: '12:00',
      hashtags: [],
      status: 'draft',
    };
    setSelectedPost(newPost);
    setShowNewPostModal(true);
  };

  const handleNewPostSave = (newPost: SocialPost) => {
    setPosts(prev => [...prev, newPost]);
    setSelectedPost(null);
    setShowNewPostModal(false);
  };

  const postsForSelectedDate = posts.filter(post => post.date === selectedDate);

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-white flex flex-col overflow-hidden">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between"
      >
        <div className="flex items-center space-x-4">
          <motion.h1 
            whileHover={{ scale: 1.02 }}
            className="text-2xl font-bold text-gray-900"
          >
            Social Scheduler
          </motion.h1>
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNewPost}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-all shadow-lg hover:shadow-xl"
            >
              <Plus className="w-4 h-4" />
              <span>New Post</span>
            </motion.button>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <User className="w-5 h-5 text-gray-600" />
          </motion.button>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <CalendarView
          posts={posts}
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
        />
        <PostSidebar
          selectedDate={selectedDate}
          posts={postsForSelectedDate}
          onPostSelect={handlePostSelect}
        />
      </div>

      {/* Post Modal */}
      {selectedPost && (
        <PostModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onSave={showNewPostModal ? handleNewPostSave : handlePostSave}
        />
      )}
    </div>
  );
};
