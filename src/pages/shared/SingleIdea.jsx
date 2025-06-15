import { useQuery } from '@tanstack/react-query';
import { ArrowLeft, Calendar, Mail, User } from 'lucide-react';
import { Link, useParams } from 'react-router';

import {
  Card,
  CardContent,
  ManageIdeas,
  StatusBadge,
  useGetData,
} from '@/components';
import { getIdeaById } from '@/services';

function SingleIdea() {
  const { id } = useParams();
  const { currentUser } = useGetData();

  const {
    data: idea,
    error,
    isLoading,
  } = useQuery({
    queryFn: () => getIdeaById(id),
    queryKey: ['idea', id],
  });

  if (isLoading) {
    return <div className='p-6 text-center text-gray-600'>Loading idea...</div>;
  }

  if (error || !idea) {
    return (
      <div className='p-6 text-center text-red-600'>
        Idea not found or error occurred.
      </div>
    );
  }

  const getBackLink = () => {
    if (currentUser?.role === 'student') {
      return '/student/dashboard';
    } else if (currentUser?.role === 'teacher') {
      return '/teacher/dashboard';
    } else if (currentUser?.role === 'admin') {
      return '/admin/ideas';
    }
    return '/';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className='space-y-6 p-4 sm:p-6 max-w-4xl mx-auto'>
      <div className='flex flex-col sm:flex-row sm:items-center gap-4'>
        <Link
          className='inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors w-fit'
          to={getBackLink()}>
          <ArrowLeft className='w-4 h-4 mr-2' />
          Back to Dashboard
        </Link>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>Idea Details</h1>
          <p className='text-gray-600'>View full idea information</p>
        </div>
      </div>

      <Card className='shadow-lg'>
        <CardContent className='p-6 sm:p-8 space-y-6'>
          <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4'>
            <div className='flex-1'>
              <h2 className='text-3xl font-bold text-gray-900 mb-2'>
                {idea.title}
              </h2>
              <div className='flex flex-wrap items-center gap-3 text-sm text-gray-600'>
                <div className='flex items-center gap-1'>
                  <Calendar className='w-4 h-4' />
                  <span>Created: {formatDate(idea.createdAt)}</span>
                </div>
              </div>
            </div>
            <StatusBadge
              reason={idea.rejectionReason || idea.deletionReason}
              status={idea.status}
            />
          </div>

          <div>
            <h3 className='text-lg font-semibold text-gray-900 mb-3'>
              Description
            </h3>
            <p className='text-gray-700 leading-relaxed text-base'>
              {idea.description}
            </p>
          </div>

          {idea.status === 'rejected' && idea.rejectionReason && (
            <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
              <h3 className='text-lg font-semibold text-red-800 mb-2'>
                Rejection Reason
              </h3>
              <p className='text-red-700'>{idea.rejectionReason}</p>
            </div>
          )}

          {idea.student && (
            <div className='bg-gray-50 rounded-lg p-4'>
              <h3 className='text-lg font-semibold text-gray-900 mb-3'>
                Student Information
              </h3>
              <div className='flex items-center gap-3'>
                <User className='w-5 h-5 text-gray-500' />
                <div>
                  <p className='font-medium text-gray-900'>
                    {idea.student.name}
                  </p>
                  <div className='flex items-center gap-1 text-sm text-gray-600'>
                    <Mail className='w-3 h-3' />
                    <span>{idea.student.email}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {(currentUser?.role === 'student' || currentUser?.role === 'admin') &&
            idea.teacher && (
              <div className='bg-blue-50 rounded-lg p-4'>
                <h3 className='text-lg font-semibold text-gray-900 mb-3'>
                  Assigned Teacher
                </h3>
                <div className='flex items-center gap-3'>
                  <User className='w-5 h-5 text-blue-500' />
                  <div>
                    <p className='font-medium text-gray-900'>
                      {idea.teacher.name}
                    </p>
                    <div className='flex items-center gap-1 text-sm text-gray-600'>
                      <Mail className='w-3 h-3' />
                      <span>{idea.teacher.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

          {(currentUser?.role === 'teacher' ||
            currentUser?.role === 'admin') && (
            <div className='pt-4 border-t border-gray-200'>
              <h3 className='text-lg font-semibold text-gray-900 mb-3'>
                Actions
              </h3>
              <ManageIdeas currentUser={currentUser} idea={idea} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default SingleIdea;
