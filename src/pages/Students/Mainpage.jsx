import { BookOpen, Lightbulb, Users } from 'lucide-react';
import { Link } from 'react-router';

import {
  CardSection,
  IdeaCard,
  LoadingSpinner,
  PageHeader,
  StatCard,
  SupervisorCard,
  TeamCard,
  useGetData,
} from '@/components';

function Mainpage() {
  const { approvedIdeas, currentUser, ideas, loading, supervision, teams } =
    useGetData();
  if (loading) {
    return <LoadingSpinner message='Loading dashboard...' />;
  }

  return (
    <div className='space-y-6 p-6'>
      <PageHeader
        subtitle='Let’s get started on your graduation journey.'
        title={`Welcome, ${currentUser.name}!`}
      />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {teams.length > 0 ? (
          teams.map((team) => (
            <TeamCard key={team.id} team={team} user={currentUser} />
          ))
        ) : (
          <p className='text-gray-500'>You haven't joined any teams yet.</p>
        )}
        {supervision.length > 0 && (
          <CardSection
            icon={BookOpen}
            iconColor='text-green-600'
            title='Assigned Supervisor'>
            <SupervisorCard supervision={supervision} />
          </CardSection>
        )}
      </div>
      <CardSection
        headerAction={
          <Link
            className='text-sm text-blue-600 hover:text-blue-800 underline'
            to='/student/my-ideas'>
            View More
          </Link>
        }
        icon={Lightbulb}
        iconColor='text-yellow-500'
        title='My Ideas'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {ideas.length > 0 ? (
            ideas
              .slice(0, 3)
              .map((idea) => <IdeaCard idea={idea} key={idea.id} />)
          ) : (
            <p className='text-gray-500 col-span-full'>
              You haven't submitted any ideas yet.
            </p>
          )}
        </div>
      </CardSection>
      <CardSection
        headerAction={
          <Link
            className='text-sm text-blue-600 hover:text-blue-800 underline'
            to='/student/approved-ideas'>
            View More
          </Link>
        }
        icon={Lightbulb}
        iconColor='text-green-500'
        title='Approved Ideas (All Students)'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {approvedIdeas.length > 0 ? (
            approvedIdeas
              .slice(0, 3)
              .map((idea) => <IdeaCard idea={idea} key={idea.id} />)
          ) : (
            <p className='text-gray-500 col-span-full'>
              No approved ideas found.
            </p>
          )}
        </div>
      </CardSection>
    </div>
  );
}

export default Mainpage;
