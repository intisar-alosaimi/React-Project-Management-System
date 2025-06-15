import { ArrowLeft, GraduationCap, Mail, User, Users } from 'lucide-react';
import { Link } from 'react-router';

import {
  Badge,
  Button,
  LoadingSpinner,
  PageHeader,
  useGetData,
} from '@/components';

function MyStudents() {
  const { currentUser, loading, supervision, teams } = useGetData();

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-96'>
        <LoadingSpinner size='lg' text='Loading students...' />
      </div>
    );
  }

  const myTeams = teams.filter((t) => t.teacher?.id === currentUser.id);

  return (
    <div className='space-y-8'>
      <PageHeader
        actions={
          <Button size='sm' variant='outline' asChild>
            <Link className='inline-flex items-center' to='/teacher/dashboard'>
              <ArrowLeft className='w-4 h-4 mr-2' />
              Back to Dashboard
            </Link>
          </Button>
        }
        className='text-center'
        subtitle='Manage your teams and students'
        title='My Students'
      />

      <div className='space-y-6'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='p-2 bg-blue-100 rounded-lg'>
              <Users className='w-5 h-5 text-blue-600' />
            </div>
            <div>
              <h2 className='text-xl font-semibold text-gray-900'>My Teams</h2>
              <p className='text-sm text-gray-600'>Teams you are supervising</p>
            </div>
          </div>
          {myTeams.length > 0 && (
            <Badge
              className='bg-blue-50 text-blue-700 border-blue-200'
              variant='outline'>
              {myTeams.length} team{myTeams.length !== 1 ? 's' : ''}
            </Badge>
          )}
        </div>

        {myTeams.length === 0 ? (
          <div className='bg-gray-50 border border-gray-200 rounded-lg p-8 text-center'>
            <Users className='w-12 h-12 text-gray-400 mx-auto mb-4' />
            <p className='text-gray-600 font-medium mb-2'>No teams assigned</p>
            <p className='text-sm text-gray-500'>
              You don't have any teams assigned to you yet.
            </p>
          </div>
        ) : (
          <div className='space-y-4'>
            {myTeams.map((team) => (
              <div
                className='bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-sm transition-shadow duration-200'
                key={team.id}>
                <div className='bg-gray-50 px-6 py-4 border-b border-gray-200'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                      <div className='p-2 bg-blue-100 rounded-lg'>
                        <Users className='w-5 h-5 text-blue-600' />
                      </div>
                      <div>
                        <h3 className='text-lg font-semibold text-gray-900'>
                          {team.name}
                        </h3>
                        <p className='text-sm text-gray-600'>
                          {team.members?.length || 0} member
                          {(team.members?.length || 0) !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='p-6'>
                  {team.members?.length > 0 ? (
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      {team.members.map((member) => (
                        <div
                          className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200'
                          key={member.id}>
                          <div className='p-2 bg-white rounded-full shadow-sm'>
                            <User className='w-4 h-4 text-gray-600' />
                          </div>
                          <div className='flex-1 min-w-0'>
                            <p className='text-sm font-medium text-gray-900 truncate'>
                              {member.name}
                            </p>
                            <div className='flex items-center gap-1 mt-1'>
                              <Mail className='w-3 h-3 text-gray-400' />
                              <p className='text-xs text-gray-600 truncate'>
                                {member.email}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className='text-center py-8'>
                      <User className='w-8 h-8 text-gray-400 mx-auto mb-3' />
                      <p className='text-sm text-gray-500 font-medium'>
                        No students in this team yet
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {supervision?.length > 0 && (
        <div className='space-y-6'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='p-2 bg-green-100 rounded-lg'>
                <GraduationCap className='w-5 h-5 text-green-600' />
              </div>
              <div>
                <h2 className='text-xl font-semibold text-gray-900'>
                  Individual Supervision
                </h2>
                <p className='text-sm text-gray-600'>
                  Students under your direct supervision
                </p>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {supervision.map((s) => {
              const student = s.student || s;
              return (
                <div
                  className='flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow duration-200'
                  key={s.id}>
                  <div className='p-2 bg-green-50 rounded-full'>
                    <User className='w-5 h-5 text-green-600' />
                  </div>
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm font-medium text-gray-900 truncate'>
                      {student.name}
                    </p>
                    <div className='flex items-center gap-1 mt-1'>
                      <Mail className='w-3 h-3 text-gray-400' />
                      <p className='text-xs text-gray-600 truncate'>
                        {student.email}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default MyStudents;
