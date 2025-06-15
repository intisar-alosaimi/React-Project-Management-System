import React from 'react';

function PageHeader({ actions, children, className = '', subtitle, title }) {
  return (
    <div className={`mb-8 ${className}`}>
      <div className='flex flex-col-reverse sm:flex-row-reverse sm:items-center sm:justify-between gap-4'>
        <div className='min-w-0 flex-1'>
          <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight'>
            {title}
          </h1>
          {subtitle && (
            <p className='mt-2 text-base text-gray-600 leading-relaxed'>
              {subtitle}
            </p>
          )}
        </div>

        {actions && (
          <div className='flex items-center gap-3 flex-shrink-0'>{actions}</div>
        )}
      </div>

      {children && (
        <div className='mt-6 pt-6 border-t border-gray-100'>{children}</div>
      )}
    </div>
  );
}

export default PageHeader;
