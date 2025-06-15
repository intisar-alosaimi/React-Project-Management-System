import {
  Calendar,
  GraduationCap,
  Mail,
  Plus,
  Search,
  Settings,
  Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  LoadingSpinner,
  RoleBadge,
} from '@/components';
import { getAllUsers } from '@/services';

function AllUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const usersData = await getAllUsers();
      setUsers(usersData);
    } catch (error) {
      toast.error('Failed to load users');
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };
  // search func
  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalStudents = users.filter((user) => user.role === 'student').length;
  const totalTeachers = users.filter((user) => user.role === 'teacher').length;

  if (loading) {
    return <LoadingSpinner message='Loading users...' />;
  }

  return (
    <div className='max-w-7xl mx-auto p-6 space-y-6'>
      <div className='bg-cyan-700 text-white rounded-lg p-6 shadow-sm'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold mb-2'>All Users</h1>
            <p className='text-blue-100'>Manage and view all system users</p>
          </div>
          <div className='flex items-center gap-3'>
            <Button
              className='bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm'
              onClick={() => navigate('/admin/users')}>
              <Plus className='h-4 w-4 mr-2' />
              Add User
            </Button>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <Card className='bg-blue-50'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-600'>Total Users</p>
                <p className='text-2xl font-bold text-blue-600'>
                  {users.length}
                </p>
              </div>
              <Users className='w-8 h-8 text-blue-600' />
            </div>
          </CardContent>
        </Card>
        <Card className='bg-green-50'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-600'>Students</p>
                <p className='text-2xl font-bold text-green-600'>
                  {totalStudents}
                </p>
              </div>
              <GraduationCap className='w-8 h-8 text-green-600' />
            </div>
          </CardContent>
        </Card>
        <Card className='bg-purple-50'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-600'>Teachers</p>
                <p className='text-2xl font-bold text-purple-600'>
                  {totalTeachers}
                </p>
              </div>
              <Users className='w-8 h-8 text-purple-600' />
            </div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Search className='h-5 w-5' />
            Search Users
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col md:flex-row gap-4'>
            <div className='flex-1'>
              <Input
                className='w-full'
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder='Search by name, email, or role...'
                value={searchTerm}
              />
            </div>
            <Button onClick={() => setSearchTerm('')} variant='outline'>
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Users List ({filteredUsers.length}
            {filteredUsers.length === 1 ? ' user' : ' users'})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredUsers.length === 0 ? (
            <div className='text-center py-8'>
              <Users className='h-16 w-16 text-gray-400 mx-auto mb-4' />
              <p className='text-gray-500'>
                {searchTerm
                  ? 'No users found matching your search'
                  : 'No users found'}
              </p>
            </div>
          ) : (
            <div className='space-y-4'>
              {filteredUsers.map((user) => (
                <div
                  className='flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex-col md:flex-row gap-4'
                  key={user.id}>
                  <div className='flex flex-1 items-center gap-4'>
                    <div className='w-12 h-12 rounded-full bg-cyan-800 flex items-center justify-center text-white text-lg font-bold'>
                      {user.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <div>
                      <h3 className='font-semibold text-lg'>
                        {user.name || 'No Name'}
                      </h3>
                      <div className='flex flex-wrap items-center gap-3 text-sm text-gray-600'>
                        <div className='flex items-center gap-1'>
                          <Mail className='h-4 w-4' />
                          {user.email || 'No Email'}
                        </div>
                        <div className='flex items-center gap-1'>
                          <Calendar className='h-4 w-4' />
                          {user.createdAt
                            ? new Date(user.createdAt).toLocaleDateString()
                            : 'Unknown'}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className='flex flex-col md:flex-row items-center gap-3'>
                    <RoleBadge role={user.role} />
                    <Button
                      onClick={() => navigate(`/admin/user/${user.id}`)}
                      size='sm'
                      title='Manage User'
                      variant='outline'>
                      <Settings className='h-4 w-4 mr-2' />
                      Manage User
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default AllUsers;
