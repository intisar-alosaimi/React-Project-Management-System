import { Eye, Lightbulb, Users } from 'lucide-react';
import { Link } from 'react-router';

import {
  CardSection,
  IdeaCard,
  LoadingSpinner,
  PageHeader,
  StatCard,
  useGetData,
} from '@/components';

function Dashboard() {
  const { currentUser, ideas, loading, teams } = useGetData();

  if (loading) return <LoadingSpinner message='Loading dashboard...' />;

  const myTeams = teams.filter((t) => t.teacher?.id === currentUser.id);
  const myStudents = myTeams.reduce(
    (sum, t) => sum + (t.members?.length || 0),
    0
  );
  const myTeamsTotal = myTeams.length;
  const pendingIdeas = ideas.filter((i) => i.status === 'pending').length;
  const recentIdeas = ideas.slice(0, 3);

  return (
    <div className='space-y-6 p-6'>
      <PageHeader
        subtitle='This is your teacher dashboard.'
        title={`Welcome, ${currentUser.name}!`}
      />

      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
        <StatCard
          icon={Users}
          iconColor='text-blue-500'
          title='My Students'
          value={myStudents}
        />
        <StatCard
          icon={Users}
          iconColor='text-green-500'
          title='My Teams'
          value={myTeamsTotal}
        />
        <StatCard
          icon={Lightbulb}
          iconColor='text-yellow-500'
          title='Pending Ideas'
          value={pendingIdeas}
        />
      </div>

      <CardSection
        icon={Users}
        iconColor='text-blue-500'
        title='My Teams & Students'>
        {myTeams.length === 0 ? (
          <p className='text-gray-500 text-center py-4'>
            You have no teams assigned.
          </p>
        ) : (
          <>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {myTeams.slice(0, 2).map((team) => (
                <div className='bg-gray-50 rounded-lg p-4' key={team.id}>
                  <h3 className='font-semibold text-lg mb-2 text-gray-800'>
                    {team.name}
                  </h3>
                  <p className='text-sm text-gray-600'>
                    {team.members?.length || 0} student
                    {(team.members?.length || 0) !== 1 ? 's' : ''}
                  </p>
                </div>
              ))}
            </div>
            <div className='flex justify-center'>
              <Link
                className='inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors'
                to='/teacher/students'>
                <Eye className='w-4 h-4 mr-2' />
                View All Teams
              </Link>
            </div>
          </>
        )}
      </CardSection>
      <CardSection
        icon={Lightbulb}
        iconColor='text-yellow-500'
        title='Recent Ideas'>
        {recentIdeas.length === 0 ? (
          <p className='text-gray-500 text-center py-4'>
            No ideas submitted yet.
          </p>
        ) : (
          <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {recentIdeas.map((idea) => (
                <IdeaCard idea={idea} key={idea.id} />
              ))}
            </div>
            <div className='flex justify-center'>
              <Link
                className='inline-flex items-center px-4 py-2 text-sm font-medium text-yellow-600 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors'
                to='/teacher/ideas'>
                <Eye className='w-4 h-4 mr-2' />
                View All Ideas
              </Link>
            </div>
          </>
        )}
      </CardSection>
    </div>
  );
}

export default Dashboard;
