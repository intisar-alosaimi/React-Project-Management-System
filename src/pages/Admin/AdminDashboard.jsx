import { Lightbulb, Plus, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  getStatusCounts,
  LoadingSpinner,
} from '@/components';
import { getAllIdeas, getAllUsers } from '@/services';

function AdminDashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [usersData, ideasData] = await Promise.all([
        getAllUsers(),
        getAllIdeas(),
      ]);
      setUsers(usersData);
      setIdeas(ideasData);
    } catch (error) {
      toast.error('Failed to load dashboard data');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  const totalStudents = users.filter((user) => user.role === 'student').length;
  const totalTeachers = users.filter((user) => user.role === 'teacher').length;
  const {
    approved: approvedIdeas,
    pending: pendingIdeas,
    rejected: rejectedIdeas,
  } = getStatusCounts(ideas);
  if (loading) {
    return <LoadingSpinner message='Loading dashboard...' />;
  }

  return (
    <div className='max-w-7xl mx-auto p-6 space-y-6'>
      <div className='bg-slate-900 text-white rounded-lg p-6 border border-slate-200 shadow-sm'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl font-bold mb-2'>Admin Dashboard</h1>
            <p className='text-slate-300'>
              Manage users, ideas, and system overview
            </p>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-1 gap-6'>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3'>
              <Button
                className='justify-start'
                onClick={() => navigate('/admin/AllUsers')}
                variant='outline'>
                <Users className='h-4 w-4 mr-2' />
                View All Students
              </Button>
              <Button
                className='justify-start'
                onClick={() => navigate('/admin/ideas')}
                variant='outline'>
                <Lightbulb className='h-4 w-4 mr-2' />
                Manage Ideas
              </Button>
              <Button
                className='justify-start'
                onClick={() => navigate('/admin/users')}
                variant='outline'>
                <Plus className='h-4 w-4 mr-2' />
                Add New User
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Lightbulb className='h-5 w-5' />
              Ideas Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer height={250} width='100%'>
              <BarChart
                data={[
                  { name: 'Approved', value: approvedIdeas },
                  { name: 'Pending', value: pendingIdeas },
                  { name: 'Rejected', value: rejectedIdeas },
                ]}
                margin={{ bottom: 5, left: 20, right: 30, top: 20 }}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis
                  allowDecimals={false}
                  tickFormatter={(value) => Math.floor(value)}
                />
                <Tooltip />
                <Bar dataKey='value'>
                  <Cell fill='#10B981' />
                  <Cell fill='#F59E0B' />
                  <Cell fill='#EF4444' />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Users className='h-5 w-5' />
              User Distribution
            </CardTitle>
          </CardHeader>{' '}
          <CardContent>
            <ResponsiveContainer height={300} width='100%'>
              <PieChart>
                <Pie
                  data={[
                    {
                      color: '#10B981',
                      name: 'Students',
                      value: totalStudents,
                    },
                    {
                      color: '#8B5CF6',
                      name: 'Teachers',
                      value: totalTeachers,
                    },
                  ]}
                  cx='50%'
                  cy='50%'
                  dataKey='value'
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}>
                  {[
                    {
                      color: '#10B981',
                      name: 'Students',
                      value: totalStudents,
                    },
                    {
                      color: '#8B5CF6',
                      name: 'Teachers',
                      value: totalTeachers,
                    },
                  ].map((entry, index) => (
                    <Cell fill={entry.color} key={`cell-${index}`} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [value, name]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AdminDashboard;
