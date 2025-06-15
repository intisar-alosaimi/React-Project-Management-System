import { createBrowserRouter, RouterProvider } from 'react-router';

import { ProtectedLayout } from '../layout';
import {
  AddUsers,
  AdminDashboard,
  AdminIdeasAll,
  AllUsers,
  CreateIdea,
  Dashboard,
  Homepage,
  IdeasAll,
  Login,
  Mainpage,
  MyIdeas,
  MyStudents,
  NotFound,
  ProfilePage,
  Register,
  SingleIdea,
  SingleUser,
  TeacherIdeas,
  Unauthorized,
} from '../pages';

function AppRoutes() {
  const router = createBrowserRouter([
    { element: <Homepage />, index: true },
    {
      children: [
        { element: <SingleIdea />, path: 'idea/:id' },
        { element: <ProfilePage />, path: 'profile' },
        {
          children: [
            { element: <Mainpage />, path: 'dashboard' },
            { element: <MyIdeas />, path: 'my-ideas' },
            { element: <IdeasAll />, path: 'approved-ideas' },
            { element: <CreateIdea />, path: 'create-idea' },
          ],
          path: '/student',
        },
        {
          children: [
            { element: <Dashboard />, path: 'dashboard' },
            { element: <MyStudents />, path: 'students' },
            { element: <TeacherIdeas />, path: 'ideas' },
          ],
          path: '/teacher',
        },
        {
          children: [
            { element: <AdminDashboard />, path: 'dashboard' },
            { element: <AllUsers />, path: 'AllUsers' },
            { element: <SingleUser />, path: 'user/:id' },
            { element: <AdminIdeasAll />, path: 'ideas' },
            { element: <AddUsers />, path: 'users' },
          ],
          path: '/admin',
        },
      ],
      element: <ProtectedLayout />,
    },
    { element: <Login />, path: '/login' },
    { element: <Register />, path: '/register' },

    { element: <Unauthorized />, path: '/unauthorized' },
    { element: <NotFound />, path: '*' },
  ]);

  return <RouterProvider router={router} />;
}

export default AppRoutes;
