function LoadingSpinner({ size = 'default', className = '', text = 'Loading...' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    default: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-gray-200 border-t-blue-600`}
        role="status"
        aria-label="Loading"
      />
      {text && (
        <p className='text-sm text-gray-600 font-medium'>
          {text}
        </p>
      )}
    </div>
  );
}

export default LoadingSpinner;
