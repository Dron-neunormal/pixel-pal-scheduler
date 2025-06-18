
import React from 'react';
import { SocialPost } from './SocialScheduler';
import { Plus, Check } from 'lucide-react';

interface PostSidebarProps {
  selectedDate: string;
  posts: SocialPost[];
  onPostSelect: (post: SocialPost) => void;
}

const platformColors = {
  instagram: 'border-l-purple-500 bg-purple-50',
  facebook: 'border-l-blue-600 bg-blue-50',
  twitter: 'border-l-sky-500 bg-sky-50',
  linkedin: 'border-l-blue-700 bg-blue-50',
};

const platformIcons = {
  instagram: '📸',
  facebook: '👥',
  twitter: '🐦',
  linkedin: '💼',
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
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          {formatDate(selectedDate)}
        </h3>
        <p className="text-sm text-gray-500">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'} scheduled
        </p>
      </div>

      {/* Posts List */}
      <div className="flex-1 overflow-y-auto">
        {posts.length === 0 ? (
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm mb-4">No posts scheduled for this day</p>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Schedule a post
            </button>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className={`
                  border-l-4 rounded-lg p-3 cursor-pointer
                  hover:shadow-md transition-all duration-200
                  backdrop-blur-sm bg-white/80
                  ${platformColors[post.platform]}
                `}
                onClick={() => onPostSelect(post)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">{platformIcons[post.platform]}</span>
                    <span className="text-sm font-medium text-gray-600">
                      {post.time}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Check className="w-4 h-4 text-green-500" />
                  </div>
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
                      <span
                        key={idx}
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
