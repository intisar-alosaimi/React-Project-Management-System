import {
  BookOpen,
  CheckCircle,
  GraduationCap,
  LayoutDashboard,
  Lightbulb,
  LogOut,
  Menu,
  Plus,
  User,
  UserPlus,
  Users,
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router';

import { Button, Sheet, SheetContent, SheetTrigger } from '@/components';

const navItemsByRole = {
  admin: [
    { icon: LayoutDashboard, label: 'Dashboard', to: '/admin/dashboard' },
    { icon: Users, label: 'All Users', to: '/admin/AllUsers' },
    { icon: Lightbulb, label: 'All Ideas', to: '/admin/ideas' },
    { icon: UserPlus, label: 'Add Users', to: '/admin/users' },
    { icon: User, label: 'Profile', to: '/profile' },
  ],
  student: [
    { icon: LayoutDashboard, label: 'Dashboard', to: '/student/dashboard' },
    { icon: CheckCircle, label: 'All Ideas', to: '/student/approved-ideas' },
    { icon: Plus, label: 'Submit Idea', to: '/student/create-idea' },
    { icon: BookOpen, label: 'My Idea', to: '/student/my-ideas' },
    { icon: User, label: 'Profile', to: '/profile' },
  ],
  teacher: [
    { icon: LayoutDashboard, label: 'Dashboard', to: '/teacher/dashboard' },
    { icon: Lightbulb, label: 'Ideas', to: '/teacher/ideas' },
    { icon: GraduationCap, label: 'My Students', to: '/teacher/students' },
    { icon: User, label: 'Profile', to: '/profile' },
  ],
};

function SidebarContent({ role }) {
  const location = useLocation();
  const navigate = useNavigate();
  const navItems = navItemsByRole[role] || [];

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <aside className='flex flex-col h-full bg-white px-4 py-6 w-64 border-r'>
      <h2 className='text-xl font-bold mb-6'>Project Hub</h2>
      <nav className='flex flex-col gap-2 flex-1'>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              className={`px-3 py-2 rounded text-sm font-medium hover:bg-gray-100 flex items-center gap-2 ${
                location.pathname === item.to
                  ? 'bg-gray-100 text-primary'
                  : 'text-muted-foreground'
              }`}
              key={item.to}
              to={item.to}>
              {Icon && <Icon className='w-4 h-4' />}
              {item.label}
            </Link>
          );
        })}
      </nav>
      <Button
        className='justify-start text-red-600'
        onClick={handleLogout}
        size='sm'
        variant='ghost'>
        <LogOut className='w-4 h-4 mr-2' />
        Logout
      </Button>
    </aside>
  );
}

export default function Sidebar({ role }) {
  return (
    <>
      <div className='md:hidden fixed top-4 left-4 z-50'>
        <Sheet>
          <SheetTrigger asChild>
            <button className='p-2 rounded-md bg-gray-100'>
              <Menu className='h-5 w-5' />
            </button>
          </SheetTrigger>
          <SheetContent className='p-0 w-64' side='left'>
            <SidebarContent role={role} />
          </SheetContent>
        </Sheet>
      </div>
      <aside className='hidden md:flex fixed left-0 top-0 h-screen'>
        <SidebarContent role={role} />
      </aside>
    </>
  );
}
