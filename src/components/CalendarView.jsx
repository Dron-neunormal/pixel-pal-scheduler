
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
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="flex-1 bg-white/60 backdrop-blur-sm p-6 overflow-hidden"
    >
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-3"
        >
          <CalendarIcon className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h2>
        </motion.div>
        
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigateMonth(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigateMonth(1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </motion.button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 overflow-hidden shadow-lg">
        {/* Day Headers */}
        <div className="grid grid-cols-7 bg-gray-50/80 backdrop-blur-sm">
          {dayNames.map((day) => (
            <div
              key={day}
              className="p-3 text-center text-sm font-medium text-gray-600 border-r border-gray-200 last:border-r-0"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7">
          <AnimatePresence mode="wait">
            {days.map((date, index) => {
              const postsForDate = getPostsForDate(date);
              const hasSelectedDate = isSelected(date);
              const isTodayDate = isToday(date);
              
              return (
                <motion.div
                  key={date ? `${currentMonth.getMonth()}-${date.getDate()}` : `empty-${index}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: index * 0.01 }}
                  whileHover={date ? { scale: 1.02, y: -2 } : {}}
                  className={`
                    min-h-[100px] border-r border-b border-gray-200 last:border-r-0
                    ${date ? 'cursor-pointer hover:bg-blue-50/50 transition-all duration-200' : ''}
                    ${hasSelectedDate ? 'bg-blue-100/60 ring-2 ring-blue-400' : ''}
                    ${isTodayDate && !hasSelectedDate ? 'bg-yellow-50/60' : ''}
                  `}
                  onClick={() => date && onDateSelect(formatDate(date))}
                >
                  {date && (
                    <div className="p-2 h-full flex flex-col">
                      {/* Date Number */}
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className={`
                          w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium mb-2
                          ${isTodayDate ? 'bg-blue-500 text-white' : 'text-gray-700'}
                          ${hasSelectedDate && !isTodayDate ? 'bg-blue-600 text-white' : ''}
                        `}
                      >
                        {date.getDate()}
                      </motion.div>

                      {/* Posts Preview */}
                      <div className="flex-1 space-y-1">
                        <AnimatePresence>
                          {postsForDate.slice(0, 3).map((post, postIndex) => (
                            <motion.div
                              key={post.id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 10 }}
                              transition={{ delay: postIndex * 0.05 }}
                              whileHover={{ scale: 1.05 }}
                              className={`
                                text-xs p-1.5 rounded truncate font-medium shadow-sm
                                ${post.platform === 'instagram' ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700' : ''}
                                ${post.platform === 'x' ? 'bg-gray-100 text-gray-700' : ''}
                                ${post.platform === 'facebook' ? 'bg-blue-100 text-blue-700' : ''}
                                ${post.platform === 'linkedin' ? 'bg-blue-100 text-blue-800' : ''}
                                ${post.platform === 'youtube' ? 'bg-red-100 text-red-700' : ''}
                                ${post.platform === 'pinterest' ? 'bg-red-100 text-red-600' : ''}
                              `}
                            >
                              {post.title}
                            </motion.div>
                          ))}
                        </AnimatePresence>
                        
                        {postsForDate.length > 3 && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-xs text-gray-500 font-medium"
                          >
                            +{postsForDate.length - 3} more
                          </motion.div>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export { CalendarView };
