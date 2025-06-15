import React from 'react';

export default function Unauthorized() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 text-center px-4'>
      <div>
        <h1 className='text-2xl font-semibold text-gray-800 mb-2'>Access Denied</h1>
        <p className='text-gray-600'>You don’t have permission to view this page.</p>
      </div>
    </div>
  );
}
