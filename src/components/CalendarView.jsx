
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CalendarView = ({
  posts,
  selectedDate,
  onDateSelect,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate));

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const getPostsForDate = (date) => {
    if (!date) return [];
    const dateString = formatDate(date);
    return posts.filter(post => post.date === dateString);
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date) => {
    if (!date) return false;
    return formatDate(date) === selectedDate;
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="flex-1 bg-gradient-to-br from-blue-50 to-white p-6 overflow-auto">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <CalendarIcon className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h2>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={() => navigateMonth(1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        {/* Day Headers */}
        <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
          {dayNames.map((day) => (
            <div
              key={day}
              className="p-4 text-center text-sm font-semibold text-gray-700 border-r border-gray-200 last:border-r-0"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7">
          {days.map((date, index) => {
            const postsForDate = getPostsForDate(date);
            const hasSelectedDate = isSelected(date);
            const isTodayDate = isToday(date);
            
            return (
              <div
                key={date ? `${currentMonth.getMonth()}-${date.getDate()}` : `empty-${index}`}
                className={`
                  min-h-[120px] border-r border-b border-gray-200 last:border-r-0 p-2
                  ${date ? 'cursor-pointer hover:bg-blue-50 transition-colors' : 'bg-gray-50'}
                  ${hasSelectedDate ? 'bg-blue-100 ring-2 ring-blue-400 ring-inset' : ''}
                  ${isTodayDate && !hasSelectedDate ? 'bg-yellow-50' : ''}
                `}
                onClick={() => date && onDateSelect(formatDate(date))}
              >
                {date && (
                  <div className="h-full flex flex-col">
                    {/* Date Number */}
                    <div
                      className={`
                        w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium mb-2
                        ${isTodayDate ? 'bg-blue-500 text-white' : 'text-gray-700'}
                        ${hasSelectedDate && !isTodayDate ? 'bg-blue-600 text-white' : ''}
                      `}
                    >
                      {date.getDate()}
                    </div>

                    {/* Posts Preview */}
                    <div className="flex-1 space-y-1 overflow-hidden">
                      {postsForDate.slice(0, 3).map((post) => (
                        <div
                          key={post.id}
                          className={`
                            text-xs p-1.5 rounded truncate font-medium
                            ${post.platform === 'instagram' ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700' : ''}
                            ${post.platform === 'x' ? 'bg-gray-100 text-gray-700' : ''}
                            ${post.platform === 'facebook' ? 'bg-blue-100 text-blue-700' : ''}
                            ${post.platform === 'linkedin' ? 'bg-blue-100 text-blue-800' : ''}
                            ${post.platform === 'youtube' ? 'bg-red-100 text-red-700' : ''}
                            ${post.platform === 'pinterest' ? 'bg-red-100 text-red-600' : ''}
                          `}
                        >
                          {post.title}
                        </div>
                      ))}
                      
                      {postsForDate.length > 3 && (
                        <div className="text-xs text-gray-500 font-medium">
                          +{postsForDate.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export { CalendarView };
