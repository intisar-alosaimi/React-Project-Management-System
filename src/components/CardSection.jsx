import { Card, CardContent } from '@/components';

function CardSection({
  children,
  className = '',
  title,
  subtitle,
  actions,
  variant = 'default'
}) {
  const variants = {
    default: 'bg-white border border-gray-200',
    subtle: 'bg-gray-50 border border-gray-100',
    elevated: 'bg-white border border-gray-200 shadow-sm',
    transparent: 'bg-transparent border-0'
  };

  return (
    <div className={`rounded-lg p-6 ${variants[variant]} ${className}`}>
      {(title || subtitle || actions) && (
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6'>
          <div className='min-w-0 flex-1'>
            {title && (
              <h3 className='text-lg font-semibold text-gray-900 mb-1'>
                {title}
              </h3>
            )}
            {subtitle && (
              <p className='text-sm text-gray-600'>
                {subtitle}
              </p>
            )}
          </div>

          {actions && (
            <div className='flex items-center gap-3 flex-shrink-0'>
              {actions}
            </div>
          )}
        </div>
      )}

      <div className='space-y-4'>
        {children}
      </div>
    </div>
  );
}

export default CardSection;
