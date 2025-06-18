import React, { useState } from 'react';
import { CalendarView } from './CalendarView';
import { PostSidebar } from './PostSidebar';
import { PostModal } from './PostModal';
import { Button } from '@/components/ui/button';
import { Calendar, Edit, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export interface SocialPost {
  id: string;
  title: string;
  content: string;
  platform: 'instagram' | 'facebook' | 'twitter' | 'linkedin';
  date: string;
  time: string;
  status: 'scheduled' | 'draft' | 'published';
  image?: string;
  hashtags: string[];
  utm?: string;
}

const mockPosts: SocialPost[] = [
  {
    id: '1',
    title: 'Not just a workspace. A workstation revolution.',
    content: 'Meet Hexcal Studio, where tech meets taste.\n\nOrder now - Link in Bio',
    platform: 'instagram',
    date: '2025-06-12',
    time: '10:32',
    status: 'scheduled',
    hashtags: ['#21genx', '#hexcalstudio', '#workstationrevolution', '#minimalworkspace'],
  },
  {
    id: '2',
    title: 'Premium desk setup goals',
    content: 'Premium desk setup #smartworkspace #deskorganization',
    platform: 'instagram',
    date: '2025-06-12',
    time: '10:32',
    status: 'scheduled',
    hashtags: ['#premiumdesksetup', '#smartworkspace', '#deskorganization'],
  },
  {
    id: '3',
    title: 'Tech workspace inspiration',
    content: 'Modern workstation #ergonomicsetup #workspaceupgrade',
    platform: 'instagram',
    date: '2025-06-12',
    time: '10:33',
    status: 'scheduled',
    hashtags: ['#modernworkstation', '#ergonomicsetup', '#workspaceupgrade'],
  },
  {
    id: '4',
    title: 'Professional setup showcase',
    content: 'Futuristic desk #desksetupgoals #creatorsworkspace',
    platform: 'instagram',
    date: '2025-06-12',
    time: '10:34',
    status: 'scheduled',
    hashtags: ['#futuristicdesk', '#desksetupgoals', '#creatorsworkspace'],
  },
  {
    id: '5',
    title: 'Facebook engagement post',
    content: 'Not just any pen for our dads',
    platform: 'facebook',
    date: '2025-06-15',
    time: '09:00',
    status: 'scheduled',
    hashtags: [],
  },
  {
    id: '6',
    title: 'LinkedIn professional update',
    content: 'Experience the joy of cooking',
    platform: 'linkedin',
    date: '2025-06-13',
    time: '21:00',
    status: 'scheduled',
    hashtags: [],
  },
];

export const SocialScheduler = () => {
  const [selectedDate, setSelectedDate] = useState<string>('2025-06-12');
  const [selectedPost, setSelectedPost] = useState<SocialPost | null>(null);
  const [viewMode, setViewMode] = useState<'Month' | 'Timeline'>('Month');
  const [showPostModal, setShowPostModal] = useState(false);
  const [posts, setPosts] = useState<SocialPost[]>(mockPosts);

  const postsForSelectedDate = posts.filter(post => post.date === selectedDate);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
  };

  const handlePostSelect = (post: SocialPost) => {
    setSelectedPost(post);
    setShowPostModal(true);
  };

  const handleNewPost = () => {
    const newPost: SocialPost = {
      id: Date.now().toString(),
      title: 'New Post',
      content: '',
      platform: 'instagram',
      date: selectedDate,
      time: '12:00',
      status: 'draft',
      hashtags: [],
    };
    setSelectedPost(newPost);
    setShowPostModal(true);
  };

  const handleSavePost = (updatedPost: SocialPost) => {
    const existingPostIndex = posts.findIndex(p => p.id === updatedPost.id);
    
    if (existingPostIndex >= 0) {
      // Update existing post
      const updatedPosts = [...posts];
      updatedPosts[existingPostIndex] = updatedPost;
      setPosts(updatedPosts);
    } else {
      // Add new post
      setPosts([...posts, updatedPost]);
    }
    
    setShowPostModal(false);
    setSelectedPost(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white"
    >
      {/* Header */}
      <div className="border-b border-gray-200 bg-white/80 backdrop-blur-sm px-6 py-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-semibold text-gray-900"
            >
              Social Poster
            </motion.h1>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <span>Calendar</span>
              <span>Posts</span>
              <span>Content ideas</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                onClick={handleNewPost}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all"
              >
                <Edit className="w-4 h-4" />
                <span>New post</span>
              </Button>
            </motion.div>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setViewMode('Month')}
                className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                  viewMode === 'Month' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Month
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setViewMode('Timeline')}
                className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                  viewMode === 'Timeline' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Timeline
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Calendar */}
        <div className="flex-1">
          <CalendarView 
            posts={posts}
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
          />
        </div>

        {/* Sidebar */}
        <PostSidebar 
          selectedDate={selectedDate}
          posts={postsForSelectedDate}
          onPostSelect={handlePostSelect}
        />
      </div>

      {/* Post Modal */}
      {showPostModal && selectedPost && (
        <PostModal
          post={selectedPost}
          onClose={() => {
            setShowPostModal(false);
            setSelectedPost(null);
          }}
          onSave={handleSavePost}
        />
      )}
    </motion.div>
  );
};
