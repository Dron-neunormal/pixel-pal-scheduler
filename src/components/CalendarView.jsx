
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CalendarView = ({
  posts,
  selectedDate,
  onDateSelect,
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate));
  const [showYearPicker, setShowYearPicker] = useState(false);

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

  const navigateToToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    onDateSelect(formatDate(today));
  };

  const setYear = (year) => {
    const newMonth = new Date(currentMonth);
    newMonth.setFullYear(year);
    setCurrentMonth(newMonth);
    setShowYearPicker(false);
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
  const currentYear = currentMonth.getFullYear();
  const years = Array.from({ length: 21 }, (_, i) => currentYear - 10 + i);

  // Calculate how many weeks we need to display
  const totalCells = days.length;
  const weeksNeeded = Math.ceil(totalCells / 7);

  return (
    <div className="flex-1 bg-gradient-to-br from-blue-50 to-white p-6 overflow-auto">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <CalendarIcon className="w-7 h-7 text-blue-600" />
          <div className="flex items-center space-x-2">
            <h2 className="text-3xl font-bold text-gray-900">
              {monthNames[currentMonth.getMonth()]}
            </h2>
            <div className="relative">
              <button
                onClick={() => setShowYearPicker(!showYearPicker)}
                className="flex items-center space-x-1 text-3xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
              >
                <span>{currentYear}</span>
                <ChevronDown className="w-5 h-5" />
              </button>
              
              {showYearPicker && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                  {years.map(year => (
                    <button
                      key={year}
                      onClick={() => setYear(year)}
                      className={`w-full px-4 py-2 text-left hover:bg-blue-50 transition-colors ${
                        year === currentYear ? 'bg-blue-100 text-blue-600 font-semibold' : 'text-gray-700'
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={navigateToToday}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium"
          >
            Today
          </button>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <button
              onClick={() => navigateMonth(1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-lg">
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

        {/* Calendar Days Grid */}
        <div className="grid grid-cols-7" style={{ gridTemplateRows: `repeat(${weeksNeeded}, 1fr)` }}>
          {Array.from({ length: weeksNeeded * 7 }).map((_, index) => {
            const date = days[index];
            const postsForDate = getPostsForDate(date);
            const hasSelectedDate = isSelected(date);
            const isTodayDate = isToday(date);
            
            return (
              <motion.div
                key={date ? `${currentMonth.getMonth()}-${date.getDate()}` : `empty-${index}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.01 }}
                className={`
                  min-h-[140px] h-full border-r border-b border-gray-200 last:border-r-0 p-3
                  ${date ? 'cursor-pointer hover:bg-blue-50 transition-all duration-200' : 'bg-gray-25'}
                  ${hasSelectedDate ? 'bg-blue-100 ring-2 ring-blue-400 ring-inset' : ''}
                  ${isTodayDate && !hasSelectedDate ? 'bg-yellow-50 ring-1 ring-yellow-300 ring-inset' : ''}
                `}
                onClick={() => date && onDateSelect(formatDate(date))}
                whileHover={date ? { scale: 1.02 } : {}}
              >
                {date && (
                  <div className="h-full flex flex-col">
                    {/* Date Number */}
                    <div className="flex justify-between items-start mb-3">
                      <div
                        className={`
                          w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold
                          ${isTodayDate ? 'bg-blue-600 text-white shadow-md' : 'text-gray-700'}
                          ${hasSelectedDate && !isTodayDate ? 'bg-blue-500 text-white' : ''}
                        `}
                      >
                        {date.getDate()}
                      </div>
                      {postsForDate.length > 0 && (
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      )}
                    </div>

                    {/* Posts Preview */}
                    <div className="flex-1 space-y-1 overflow-hidden">
                      {postsForDate.slice(0, 3).map((post) => (
                        <motion.div
                          key={post.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`
                            text-xs p-2 rounded-md truncate font-medium shadow-sm
                            ${post.platform === 'instagram' ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border border-purple-200' : ''}
                            ${post.platform === 'x' ? 'bg-gray-100 text-gray-700 border border-gray-200' : ''}
                            ${post.platform === 'facebook' ? 'bg-blue-100 text-blue-700 border border-blue-200' : ''}
                            ${post.platform === 'linkedin' ? 'bg-blue-100 text-blue-800 border border-blue-200' : ''}
                            ${post.platform === 'youtube' ? 'bg-red-100 text-red-700 border border-red-200' : ''}
                            ${post.platform === 'pinterest' ? 'bg-red-100 text-red-600 border border-red-200' : ''}
                          `}
                        >
                          {post.title}
                        </motion.div>
                      ))}
                      
                      {postsForDate.length > 3 && (
                        <div className="text-xs text-gray-500 font-medium px-2 py-1 bg-gray-100 rounded-md">
                          +{postsForDate.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export { CalendarView };
