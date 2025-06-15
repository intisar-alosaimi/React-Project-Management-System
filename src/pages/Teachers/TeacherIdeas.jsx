import { ArrowLeft, Filter, Lightbulb } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';

import {
  CardSection,
  getStatusCounts,
  IdeaCard,
  LoadingSpinner,
  PageHeader,
  useGetData,
} from '@/components';

function TeacherIdeas() {
  const { ideas, loading } = useGetData();
  const [statusFilter, setStatusFilter] = useState('all');
  if (loading) {
    return <LoadingSpinner message='Loading ideas...' />;
  }

  const filteredIdeas =
    statusFilter === 'all'
      ? ideas
      : ideas.filter((idea) => idea.status === statusFilter);
  const statusCounts = getStatusCounts(ideas);

  return (
    <div className='space-y-6 p-6'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <Link
            className='inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors'
            to='/teacher/dashboard'>
            <ArrowLeft className='w-4 h-4 mr-2' />
            Back to Dashboard
          </Link>
        </div>
        <div className='text-right'>
          <p className='text-sm text-gray-500'>Total Ideas</p>
          <p className='text-2xl font-bold text-yellow-600'>{ideas.length}</p>
        </div>
      </div>

      <PageHeader
        subtitle='Review and manage student ideas'
        title='All Ideas'
      />

      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        <div className='bg-white rounded-lg p-4 shadow-sm border'>
          <p className='text-sm text-gray-500 mb-1'>Total</p>
          <p className='text-xl font-bold text-gray-800'>{statusCounts.all}</p>
        </div>
        <div className='bg-white rounded-lg p-4 shadow-sm border'>
          <p className='text-sm text-gray-500 mb-1'>Pending</p>
          <p className='text-xl font-bold text-yellow-600'>
            {statusCounts.pending}
          </p>
        </div>
        <div className='bg-white rounded-lg p-4 shadow-sm border'>
          <p className='text-sm text-gray-500 mb-1'>Approved</p>
          <p className='text-xl font-bold text-green-600'>
            {statusCounts.approved}
          </p>
        </div>
        <div className='bg-white rounded-lg p-4 shadow-sm border'>
          <p className='text-sm text-gray-500 mb-1'>Rejected</p>
          <p className='text-xl font-bold text-red-600'>
            {statusCounts.rejected}
          </p>
        </div>
      </div>

      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div className='flex items-center gap-2'>
          <Filter className='w-4 h-4 text-gray-500' />
          <span className='text-sm font-medium text-gray-700'>
            Filter by status:
          </span>
        </div>
        <div className='flex flex-wrap gap-2'>
          {[
            { color: 'gray', key: 'all', label: 'All' },
            { color: 'yellow', key: 'pending', label: 'Pending' },
            { color: 'green', key: 'approved', label: 'Approved' },
            { color: 'red', key: 'rejected', label: 'Rejected' },
          ].map((filter) => (
            <button
              className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                statusFilter === filter.key
                  ? `bg-${filter.color}-100 text-${filter.color}-800 border border-${filter.color}-200`
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              key={filter.key}
              onClick={() => setStatusFilter(filter.key)}>
              {filter.label} ({statusCounts[filter.key]})
            </button>
          ))}
        </div>
      </div>

      <CardSection
        title={`${
          statusFilter === 'all'
            ? 'All'
            : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)
        } Ideas`}
        icon={Lightbulb}
        iconColor='text-yellow-500'>
        {' '}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredIdeas.length > 0 ? (
            filteredIdeas.map((idea) => (
              <div className='relative' key={idea.id}>
                <IdeaCard idea={idea} />
              </div>
            ))
          ) : (
            <p className='text-gray-500 col-span-full text-center py-8'>
              No {statusFilter === 'all' ? '' : statusFilter} ideas found.
            </p>
          )}
        </div>
      </CardSection>
    </div>
  );
}

export default TeacherIdeas;
