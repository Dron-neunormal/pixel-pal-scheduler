
import React, { useState } from 'react';
import { SocialPost } from './SocialScheduler';
import { ChevronLeft, ChevronRight, Instagram, Facebook, Youtube, Linkedin, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const platformIcons = {
  x: X,
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  pinterest: '📌',
};

const platformColors = {
  x: 'bg-black hover:bg-gray-800',
  instagram: 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 hover:from-purple-600 hover:via-pink-600 hover:to-orange-500',
  facebook: 'bg-blue-600 hover:bg-blue-700',
  youtube: 'bg-red-600 hover:bg-red-700',
  linkedin: 'bg-blue-700 hover:bg-blue-800',
  pinterest: 'bg-red-500 hover:bg-red-600',
};

export const CalendarView = ({
  posts,
  selectedDate,
  onDateSelect,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 5, 12)); // June 2025
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  
  const daysInMonth = lastDayOfMonth.getDate();
  const daysFromPrevMonth = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
  const totalCells = Math.ceil((daysInMonth + daysFromPrevMonth) / 7) * 7;

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date(2025, 5, 12)); // June 2025
  };

  const getPostsForDate = (date) => {
    return posts.filter(post => post.date === date);
  };

  const formatDate = (day) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  return (
    <div className="p-6 h-full flex flex-col w-full">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <motion.h2 
            key={`${year}-${month}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="text-2xl font-semibold text-gray-900"
          >
            {monthNames[month]} {year}
          </motion.h2>
          <div className="flex space-x-1">
            <motion.button 
              onClick={() => navigateMonth('prev')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </motion.button>
            <motion.button 
              onClick={() => navigateMonth('next')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </motion.button>
          </div>
        </div>
        <motion.button 
          onClick={goToToday}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:bg-blue-50 px-3 py-1 rounded-lg transition-all"
        >
          Today
        </motion.button>
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
      <div className="flex-1 overflow-y-auto grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
        <AnimatePresence mode="wait">
          {Array.from({ length: totalCells }, (_, index) => {
            const dayNumber = index - daysFromPrevMonth + 1;
            const isCurrentMonth = dayNumber > 0 && dayNumber <= daysInMonth;
            const dateString = isCurrentMonth ? formatDate(dayNumber) : '';
            const dayPosts = dateString ? getPostsForDate(dateString) : [];
            const isSelected = dateString === selectedDate;
            const isToday = dateString === '2025-06-12';

            return (
              <motion.div
                key={`${year}-${month}-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: index * 0.01 }}
                whileHover={isCurrentMonth ? { 
                  scale: 1.02, 
                  y: -2,
                  boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                  backgroundColor: 'rgb(249, 250, 251)'
                } : {}}
                className={`
                  bg-white min-h-[120px] p-2 cursor-pointer
                  transition-all duration-200 relative overflow-hidden
                  ${isSelected ? 'ring-2 ring-blue-500 ring-inset bg-blue-50' : ''}
                  ${!isCurrentMonth ? 'bg-gray-50 opacity-50' : ''}
                  ${isCurrentMonth ? 'hover:shadow-lg' : ''}
                `}
                onClick={() => isCurrentMonth && onDateSelect(dateString)}
              >
                {isCurrentMonth && (
                  <>
                    <div className="flex justify-between items-start mb-2">
                      <span
                        className={`
                          text-sm font-medium transition-all duration-200
                          ${isToday ? 'bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs' : 'text-gray-900'}
                          ${isSelected ? 'text-blue-600 font-semibold' : ''}
                        `}
                      >
                        {dayNumber}
                      </span>
                    </div>
                    
                    <div className="space-y-1">
                      <AnimatePresence>
                        {dayPosts.slice(0, 3).map((post, idx) => {
                          const IconComponent = platformIcons[post.platform];
                          return (
                            <motion.div
                              key={post.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              transition={{ delay: idx * 0.1 }}
                              whileHover={{ scale: 1.05, zIndex: 10 }}
                              className={`
                                text-xs px-2 py-1.5 rounded-md text-white font-medium
                                cursor-pointer transition-all duration-200
                                backdrop-blur-sm bg-opacity-90 hover:bg-opacity-100
                                ${platformColors[post.platform]}
                                shadow-sm hover:shadow-md
                              `}
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log('Post clicked:', post);
                              }}
                            >
                              <div className="flex items-center space-x-1.5">
                                {typeof IconComponent === 'string' ? (
                                  <span className="text-white drop-shadow-sm text-xs">{IconComponent}</span>
                                ) : (
                                  <IconComponent className="w-3 h-3 text-white drop-shadow-sm" />
                                )}
                                <span className="font-medium truncate">{post.time}</span>
                              </div>
                            </motion.div>
                          );
                        })}
                      </AnimatePresence>
                      {dayPosts.length > 3 && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-xs text-gray-500 font-medium px-2 bg-gray-100 rounded py-1"
                        >
                          +{dayPosts.length - 3} more
                        </motion.div>
                      )}
                    </div>
                  </>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
