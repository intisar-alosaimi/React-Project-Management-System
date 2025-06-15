import React from 'react';

import { Card, CardContent } from '@/components';

function StatCard({ icon: Icon, title, value, trend, color = 'blue' }) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    green: 'bg-green-50 text-green-600 border-green-100',
    purple: 'bg-purple-50 text-purple-600 border-purple-100',
    orange: 'bg-orange-50 text-orange-600 border-orange-100',
    red: 'bg-red-50 text-red-600 border-red-100',
  };

  return (
    <div className='bg-white rounded-lg border border-gray-200 p-6 hover:shadow-sm transition-all duration-200'>
      <div className='flex items-center justify-between'>
        <div className='flex-1'>
          <p className='text-sm font-medium text-gray-600 mb-1'>
            {title}
          </p>
          <p className='text-2xl font-bold text-gray-900'>
            {value}
          </p>
          {trend && (
            <p className='text-sm text-gray-500 mt-2'>
              {trend}
            </p>
          )}
        </div>

        {Icon && (
          <div className={`p-3 rounded-lg border ${colorClasses[color] || colorClasses.blue}`}>
            <Icon className='w-6 h-6' />
          </div>
        )}
      </div>
    </div>
  );
}

export default StatCard;
