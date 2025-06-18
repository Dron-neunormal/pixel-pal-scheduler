
import React from 'react';
import { SocialPost } from './SocialScheduler';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarViewProps {
  posts: SocialPost[];
  selectedDate: string;
  onDateSelect: (date: string) => void;
}

const platformColors = {
  instagram: 'bg-gradient-to-r from-purple-500 to-pink-500',
  facebook: 'bg-blue-600',
  twitter: 'bg-sky-500',
  linkedin: 'bg-blue-700',
};

const platformIcons = {
  instagram: '📸',
  facebook: '👥',
  twitter: '🐦',
  linkedin: '💼',
};

export const CalendarView: React.FC<CalendarViewProps> = ({
  posts,
  selectedDate,
  onDateSelect,
}) => {
  const currentDate = new Date('2025-06-12');
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  
  const daysInMonth = lastDayOfMonth.getDate();
  const daysFromPrevMonth = firstDayOfWeek;
  const totalCells = Math.ceil((daysInMonth + daysFromPrevMonth) / 7) * 7;

  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getPostsForDate = (date: string) => {
    return posts.filter(post => post.date === date);
  };

  const formatDate = (day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  return (
    <div className="p-6 h-full flex flex-col">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-semibold text-gray-900">
            {monthNames[month]} {year}
          </h2>
          <div className="flex space-x-1">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          Today
        </button>
      </div>

      {/* Week Days Header */}
      <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg mb-2 overflow-hidden">
        {weekDays.map((day) => (
          <div
            key={day}
            className="bg-gray-50 px-3 py-2 text-center text-sm font-medium text-gray-600"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
        {Array.from({ length: totalCells }, (_, index) => {
          const dayNumber = index - daysFromPrevMonth + 1;
          const isCurrentMonth = dayNumber > 0 && dayNumber <= daysInMonth;
          const dateString = isCurrentMonth ? formatDate(dayNumber) : '';
          const dayPosts = dateString ? getPostsForDate(dateString) : [];
          const isSelected = dateString === selectedDate;
          const isToday = dateString === '2025-06-12';

          return (
            <div
              key={index}
              className={`
                bg-white min-h-[120px] p-2 border-r border-b border-gray-100 cursor-pointer
                hover:bg-gray-50 transition-colors relative
                ${isSelected ? 'ring-2 ring-blue-500 ring-inset' : ''}
                ${!isCurrentMonth ? 'bg-gray-50' : ''}
              `}
              onClick={() => isCurrentMonth && onDateSelect(dateString)}
            >
              {isCurrentMonth && (
                <>
                  <div className="flex justify-between items-start mb-2">
                    <span
                      className={`
                        text-sm font-medium
                        ${isToday ? 'bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs' : 'text-gray-900'}
                        ${isSelected ? 'text-blue-600' : ''}
                      `}
                    >
                      {dayNumber}
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    {dayPosts.slice(0, 3).map((post, idx) => (
                      <div
                        key={post.id}
                        className={`
                          text-xs px-2 py-1 rounded-md text-white font-medium
                          cursor-pointer hover:opacity-80 transition-opacity
                          ${platformColors[post.platform]}
                        `}
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('Post clicked:', post);
                        }}
                      >
                        <div className="flex items-center space-x-1">
                          <span>{platformIcons[post.platform]}</span>
                          <span>{post.time}</span>
                        </div>
                      </div>
                    ))}
                    {dayPosts.length > 3 && (
                      <div className="text-xs text-gray-500 font-medium px-2">
                        +{dayPosts.length - 3} more
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
