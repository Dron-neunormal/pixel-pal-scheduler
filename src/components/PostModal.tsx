
import React, { useState } from 'react';
import { SocialPost } from './SocialScheduler';
import { X, Calendar, Eye, Edit, Image, Tag, Link, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface PostModalProps {
  post: SocialPost;
  onClose: () => void;
  onSave: (post: SocialPost) => void;
}

const platformColors = {
  instagram: 'from-purple-500 to-pink-500',
  facebook: 'from-blue-600 to-blue-700',
  twitter: 'from-sky-500 to-sky-600',
  linkedin: 'from-blue-700 to-blue-800',
};

export const PostModal: React.FC<PostModalProps> = ({
  post,
  onClose,
  onSave,
}) => {
  const [editedPost, setEditedPost] = useState<SocialPost>(post);
  const [activeTab, setActiveTab] = useState<'Preview' | 'Calendar'>('Preview');
  const [isEditing, setIsEditing] = useState(true);

  const handleSave = () => {
    onSave(editedPost);
  };

  const handlePostNow = () => {
    const updatedPost = { ...editedPost, status: 'published' as const };
    onSave(updatedPost);
  };

  const handleSchedule = () => {
    const updatedPost = { ...editedPost, status: 'scheduled' as const };
    onSave(updatedPost);
  };

  const handleSaveAsDraft = () => {
    const updatedPost = { ...editedPost, status: 'draft' as const };
    onSave(updatedPost);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl h-[90vh] flex overflow-hidden">
        {/* Header */}
        <div className="w-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className={`w-6 h-6 rounded bg-gradient-to-r ${platformColors[editedPost.platform]}`}></div>
              <h2 className="text-lg font-semibold text-gray-900">
                Edit post for {editedPost.platform}
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('Preview')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    activeTab === 'Preview' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Post preview
                </button>
                <button
                  onClick={() => setActiveTab('Calendar')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    activeTab === 'Calendar' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Calendar
                </button>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="flex h-[calc(90vh-140px)]">
            {/* Left Panel - Edit Form */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="space-y-6">
                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content
                  </label>
                  <Textarea
                    value={editedPost.content}
                    onChange={(e) => setEditedPost({ ...editedPost, content: e.target.value })}
                    className="w-full h-32 resize-none"
                    placeholder="Write your post content..."
                  />
                </div>

                {/* Hashtags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hashtags
                  </label>
                  <Input
                    value={editedPost.hashtags.join(' ')}
                    onChange={(e) => setEditedPost({ 
                      ...editedPost, 
                      hashtags: e.target.value.split(' ').filter(tag => tag.trim()) 
                    })}
                    placeholder="#hashtag1 #hashtag2 #hashtag3"
                  />
                </div>

                {/* Media Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Media
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
                    <Image className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG, MP4 up to 10MB</p>
                  </div>
                </div>

                {/* Tools */}
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex items-center space-x-1">
                    <span>📷</span>
                    <span>GIF</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center space-x-1">
                    <Link className="w-4 h-4" />
                    <span>UTM</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center space-x-1">
                    <Tag className="w-4 h-4" />
                    <span>Add tag</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center space-x-1">
                    <Sparkles className="w-4 h-4" />
                    <span>AI Assistant</span>
                  </Button>
                </div>

                {/* Platform Settings */}
                <div className="border-t pt-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className={`w-4 h-4 rounded bg-gradient-to-r ${platformColors[editedPost.platform]}`}></div>
                    <span className="text-sm font-medium">Link in bio</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-4">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium">Story</span>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">OFF</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">💬</span>
                    <span className="text-sm font-medium">First comment</span>
                  </div>
                </div>

                {/* Schedule Settings */}
                <div className="border-t pt-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-4">Schedule</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Date</label>
                      <Input
                        type="date"
                        value={editedPost.date}
                        onChange={(e) => setEditedPost({ ...editedPost, date: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-500 mb-1">Time</label>
                      <Input
                        type="time"
                        value={editedPost.time}
                        onChange={(e) => setEditedPost({ ...editedPost, time: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-gray-700">Post needs approval.</span>
                      <span className="text-sm text-blue-600 cursor-pointer hover:underline">Learn more</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel - Preview */}
            <div className="w-96 bg-gray-50 p-6 border-l border-gray-200">
              <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  <div>
                    <div className="flex items-center space-x-1">
                      <span className="text-sm font-semibold">21genx</span>
                      <span className="text-xs text-gray-500">•••</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-200 h-64 rounded-lg mb-3 flex items-center justify-center">
                  <Image className="w-12 h-12 text-gray-400" />
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex space-x-4">
                    <span>❤️</span>
                    <span>💬</span>
                    <span>📤</span>
                  </div>
                  <span>🔖</span>
                </div>
                
                <div className="text-sm">
                  <span className="font-semibold">21genx</span>
                  <span className="ml-1">{editedPost.content}</span>
                </div>
                
                {editedPost.hashtags.length > 0 && (
                  <div className="text-sm text-blue-600 mt-1">
                    {editedPost.hashtags.join(' ')}
                  </div>
                )}
                
                <div className="text-xs text-gray-500 mt-2">
                  JUNE 13, 21:00
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 flex justify-between">
            <div className="flex space-x-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleSaveAsDraft}>
                Save as Draft
              </Button>
              <Button variant="outline" onClick={handleSchedule}>
                Schedule
              </Button>
              <Button onClick={handlePostNow} className="bg-blue-600 hover:bg-blue-700">
                Post Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
