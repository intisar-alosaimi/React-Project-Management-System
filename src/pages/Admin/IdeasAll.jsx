import {
  CheckCircle,
  Clock,
  Eye,
  Lightbulb,
  Plus,
  Search,
  XCircle,
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
  getStatusCounts,
  Input,
  LoadingSpinner,
  StatusBadge,
} from '@/components';
import { getAllIdeas } from '@/services';

function AdminIdeasAll() {
  const navigate = useNavigate();
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchIdeas();
  }, []);

  const fetchIdeas = async () => {
    try {
      setLoading(true);
      const ideasData = await getAllIdeas();
      setIdeas(ideasData);
    } catch (error) {
      toast.error('Failed to load ideas');
      console.error('Error fetching ideas:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredIdeas = ideas.filter((idea) => {
    const matchesSearch =
      idea.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      idea.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      idea.studentName?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'pending' &&
        (!idea.status || idea.status === 'pending')) ||
      idea.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalIdeas = ideas.length;
  const {
    approved: approvedIdeas,
    pending: pendingIdeas,
    rejected: rejectedIdeas,
  } = getStatusCounts(ideas);

  if (loading) {
    return <LoadingSpinner message='Loading ideas...' />;
  }

  return (
    <div className='max-w-7xl mx-auto p-4 sm:p-6 space-y-6'>
      <div className='bg-cyan-700 text-white rounded-lg p-6 shadow-sm'>
        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
          <div>
            <h1 className='text-3xl font-bold mb-1'>All Ideas</h1>
            <p className='text-cyan-100'>Manage and review all project ideas</p>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        <Card className='bg-blue-50'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-600'>Total Ideas</p>
                <p className='text-2xl font-bold text-blue-600'>{totalIdeas}</p>
              </div>
              <Lightbulb className='w-8 h-8 text-blue-600' />
            </div>
          </CardContent>
        </Card>

        <Card className='bg-green-50'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-600'>Approved</p>
                <p className='text-2xl font-bold text-green-600'>
                  {approvedIdeas}
                </p>
              </div>
              <CheckCircle className='w-8 h-8 text-green-600' />
            </div>
          </CardContent>
        </Card>

        <Card className='bg-orange-50'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-600'>Pending</p>
                <p className='text-2xl font-bold text-orange-600'>
                  {pendingIdeas}
                </p>
              </div>
              <Clock className='w-8 h-8 text-orange-600' />
            </div>
          </CardContent>
        </Card>

        <Card className='bg-red-50'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-600'>Rejected</p>
                <p className='text-2xl font-bold text-red-600'>
                  {rejectedIdeas}
                </p>
              </div>
              <XCircle className='w-8 h-8 text-red-600' />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <Search className='h-5 w-5' />
            Search & Filter Ideas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col md:flex-row gap-4'>
            <Input
              className='w-full'
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder='Search by title, description, or student name...'
              value={searchTerm}
            />
            <div className='flex gap-2'>
              <select
                className='px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                onChange={(e) => setStatusFilter(e.target.value)}
                value={statusFilter}>
                <option value='all'>All Status</option>
                <option value='pending'>Pending</option>
                <option value='approved'>Approved</option>
                <option value='rejected'>Rejected</option>
              </select>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('all');
                }}
                variant='outline'>
                Clear
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Ideas List ({filteredIdeas.length}{' '}
            {filteredIdeas.length === 1 ? 'idea' : 'ideas'})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredIdeas.length === 0 ? (
            <div className='text-center py-8'>
              <Lightbulb className='h-16 w-16 text-gray-400 mx-auto mb-4' />
              <p className='text-gray-500'>
                {searchTerm || statusFilter !== 'all'
                  ? 'No ideas found matching your criteria'
                  : 'No ideas found'}
              </p>
            </div>
          ) : (
            <div className='space-y-4'>
              {filteredIdeas.map((idea) => (
                <div
                  className='border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors'
                  key={idea.id}>
                  <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
                    <div className='flex-1'>
                      <div className='flex items-center gap-3 mb-2'>
                        <h3 className='text-lg font-semibold'>{idea.title}</h3>
                        <StatusBadge
                          reason={idea.rejectionReason || idea.deletionReason}
                          status={idea.status}
                        />
                      </div>
                      <p className='text-gray-600 mb-2 line-clamp-2'>
                        {idea.description}
                      </p>
                      <div className='flex flex-wrap items-center gap-4 text-sm text-gray-500'>
                        <span>
                          By: {idea.student?.name || 'Unknown Student'}
                        </span>
                        <span>•</span>
                        <span>
                          {idea.createdAt
                            ? new Date(idea.createdAt).toLocaleDateString()
                            : 'No Date'}
                        </span>
                      </div>
                    </div>
                    <Button
                      className='bg-cyan-600 hover:bg-cyan-700 text-white self-start md:self-center'
                      onClick={() => navigate(`/idea/${idea.id}`)}
                      size='sm'>
                      <Eye className='h-4 w-4 mr-1' />
                      Manage Idea
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

export default AdminIdeasAll;
