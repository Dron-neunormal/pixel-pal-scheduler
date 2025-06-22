
import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, Hash, Send, Instagram, Facebook, Youtube, Linkedin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PostModal = ({ post, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    platform: 'instagram',
    date: '',
    time: '',
    hashtags: [],
    status: 'draft',
  });

  const [hashtagInput, setHashtagInput] = useState('');

  useEffect(() => {
    if (post) {
      setFormData(post);
      setHashtagInput(post.hashtags.join(' '));
    }
  }, [post]);

  const platformOptions = [
    { value: 'instagram', label: 'Instagram', icon: Instagram, color: 'from-purple-500 to-pink-500' },
    { value: 'x', label: 'X (Twitter)', icon: X, color: 'from-gray-800 to-gray-600' },
    { value: 'facebook', label: 'Facebook', icon: Facebook, color: 'from-blue-600 to-blue-700' },
    { value: 'linkedin', label: 'LinkedIn', icon: Linkedin, color: 'from-blue-700 to-blue-800' },
    { value: 'youtube', label: 'YouTube', icon: Youtube, color: 'from-red-600 to-red-700' },
    { value: 'pinterest', label: 'Pinterest', icon: '📌', color: 'from-red-500 to-red-600' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const hashtags = hashtagInput
      .split(/\s+/)
      .filter(tag => tag.startsWith('#'))
      .map(tag => tag.trim());
    
    onSave({
      ...formData,
      hashtags,
    });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  if (!post) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-semibold text-gray-900"
            >
              {post.id.includes('new') ? 'Create New Post' : 'Edit Post'}
            </motion.h2>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 hover:bg-white/80 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </motion.button>
          </div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
            className="p-6 space-y-6 overflow-y-auto max-h-[70vh]"
          >
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Post Title
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter post title..."
                required
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <motion.textarea
                whileFocus={{ scale: 1.02 }}
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all h-32 resize-none"
                placeholder="Write your post content..."
                required
              />
            </div>

            {/* Platform Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Platform
              </label>
              <div className="grid grid-cols-3 gap-3">
                {platformOptions.map((platform) => {
                  const IconComponent = platform.icon;
                  return (
                    <motion.button
                      key={platform.value}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleInputChange('platform', platform.value)}
                      className={`
                        p-3 rounded-lg border-2 transition-all flex flex-col items-center space-y-2
                        ${formData.platform === platform.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                        }
                      `}
                    >
                      {typeof IconComponent === 'string' ? (
                        <span className="text-xl">{IconComponent}</span>
                      ) : (
                        <IconComponent className="w-6 h-6" />
                      )}
                      <span className="text-xs font-medium">{platform.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Date
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Time
                </label>
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleInputChange('time', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            {/* Hashtags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Hash className="w-4 h-4 inline mr-1" />
                Hashtags
              </label>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                value={hashtagInput}
                onChange={(e) => setHashtagInput(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="#hashtag1 #hashtag2 #hashtag3"
              />
              <p className="text-xs text-gray-500 mt-1">
                Separate hashtags with spaces
              </p>
            </div>
          </motion.form>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center space-x-2 transition-all shadow-lg hover:shadow-xl"
            >
              <Send className="w-4 h-4" />
              <span>Save Post</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export { PostModal };
