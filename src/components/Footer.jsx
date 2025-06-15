function Footer() {
  return (
    <footer className='bg-white border-t border-gray-200 mt-auto'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='py-8'>
          <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
            <div className='flex flex-col gap-1'>
              <div className='text-sm font-medium text-gray-900'>
                GradTuwaiq
              </div>
              <div className='text-sm text-gray-500'>
                &copy; 2025 Built for project management.
              </div>
            </div>

            <div className='flex items-center gap-6'>
              <a
                className='text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200'
                href='#'>
                Help Center
              </a>
              <a
                className='text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200'
                href='#'>
                Support
              </a>
              <a
                className='text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200'
                href='#'>
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
