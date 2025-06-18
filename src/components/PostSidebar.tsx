
import React from 'react';
import { SocialPost } from './SocialScheduler';
import { Plus, Check, Instagram, Facebook, Youtube, Linkedin, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PostSidebarProps {
  selectedDate: string;
  posts: SocialPost[];
  onPostSelect: (post: SocialPost) => void;
}

const platformColors = {
  x: 'border-l-black bg-gray-50',
  instagram: 'border-l-purple-500 bg-gradient-to-r from-purple-50 to-pink-50',
  facebook: 'border-l-blue-600 bg-blue-50',
  youtube: 'border-l-red-600 bg-red-50',
  linkedin: 'border-l-blue-700 bg-blue-50',
  pinterest: 'border-l-red-500 bg-red-50',
};

const platformIcons = {
  x: X,
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  pinterest: '📌',
};

export const PostSidebar: React.FC<PostSidebarProps> = ({
  selectedDate,
  posts,
  onPostSelect,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    return `${dayNames[date.getDay()]}, ${monthNames[date.getMonth()]} ${date.getDate()}`;
  };

  return (
    <motion.div
      initial={{ x: 320, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="w-80 bg-white/80 backdrop-blur-sm border-l border-gray-200 flex flex-col"
    >
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-200 bg-white/60 backdrop-blur-sm">
        <motion.h3
          key={selectedDate}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-lg font-semibold text-gray-900 mb-1"
        >
          {formatDate(selectedDate)}
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-sm text-gray-500"
        >
          {posts.length} {posts.length === 1 ? 'post' : 'posts'} scheduled
        </motion.p>
      </div>

      {/* Posts List */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {posts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-6 text-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3"
              >
                <Plus className="w-8 h-8 text-gray-400" />
              </motion.div>
              <p className="text-gray-500 text-sm mb-4">No posts scheduled for this day</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:bg-blue-50 px-3 py-1 rounded-lg transition-all"
              >
                Schedule a post
              </motion.button>
            </motion.div>
          ) : (
            <div className="p-4 space-y-3">
              <AnimatePresence>
                {posts.map((post, index) => {
                  const IconComponent = platformIcons[post.platform];
                  return (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ 
                        scale: 1.02, 
                        y: -2,
                        boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
                      }}
                      whileTap={{ scale: 0.98 }}
                      className={`
                        border-l-4 rounded-lg p-3 cursor-pointer
                        transition-all duration-200
                        backdrop-blur-sm bg-white/80 hover:bg-white/90
                        ${platformColors[post.platform]}
                      `}
                      onClick={() => onPostSelect(post)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          {typeof IconComponent === 'string' ? (
                            <span className="text-sm">{IconComponent}</span>
                          ) : (
                            <IconComponent className="w-4 h-4 text-gray-600" />
                          )}
                          <span className="text-sm font-medium text-gray-600">
                            {post.time}
                          </span>
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          className="flex items-center space-x-1"
                        >
                          <Check className="w-4 h-4 text-green-500" />
                        </motion.div>
                      </div>
                      
                      <h4 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2">
                        {post.title}
                      </h4>
                      
                      <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                        {post.content}
                      </p>
                      
                      {post.hashtags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {post.hashtags.slice(0, 3).map((tag, idx) => (
                            <motion.span
                              key={idx}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.1 + idx * 0.05 }}
                              className="text-xs text-blue-600 font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                          {post.hashtags.length > 3 && (
                            <span className="text-xs text-gray-500">
                              +{post.hashtags.length - 3}
                            </span>
                          )}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
