import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

import { Button } from '@/components';

function Homepage() {
  return (
    <div className='min-h-screen bg-slate-50'>
      <div className='absolute inset-0 bg-white/60 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.1)_1px,transparent_0)] [background-size:20px_20px]'></div>

      <div className='relative container mx-auto px-4 py-16 sm:py-20'>
        <div className='text-center max-w-4xl mx-auto mb-20'>
          <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight'>
            Welcome to <span className='text-blue-600'>GradTuwaiq</span>
          </h1>

          <p className='text-lg sm:text-xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto'>
            Manage ides for graduation projects with ease.
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-16'>
            <Button className='px-8 group' size='lg' asChild>
              <Link to='/login'>
                Login to Your Account
                <ArrowRight className='w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform' />
              </Link>
            </Button>

            <Button className='px-8' size='lg' variant='outline' asChild>
              <Link to='/register'>Create New Account</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
