import { Navigate, Outlet, useLocation } from 'react-router';

import { Footer, Sidebar } from '@/components';

export default function ProtectedLayout() {
  const user = JSON.parse(localStorage.getItem('user'));
  const location = useLocation();

  if (!user?.isLoggedIn) {
    return <Navigate state={{ from: location }} to='/login' replace />;
  }

  const pathname = location.pathname;

  const isSharedPath =
    pathname.startsWith('/profile') || pathname.startsWith('/idea/');

  const isAuthorized =
    isSharedPath ||
    (user.role === 'student' && pathname.startsWith('/student')) ||
    (user.role === 'teacher' && pathname.startsWith('/teacher')) ||
    (user.role === 'admin' && pathname.startsWith('/admin'));

  if (!isAuthorized) {
    return <Navigate to='/unauthorized' replace />;
  }

  return (
    <div className='flex flex-col min-h-screen p-2 m-2 bg-gray-50'>
      <Sidebar role={user.role} />

      <main className='flex-1 md:ml-64'>
        <div className='px-4 sm:px-6 lg:px-8 py-6 sm:py-8'>
          <Outlet />
        </div>
      </main>

      <div className='md:ml-64'>
        <Footer />
      </div>
    </div>
  );
}
