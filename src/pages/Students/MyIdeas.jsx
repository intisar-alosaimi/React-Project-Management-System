import { Lightbulb } from 'lucide-react';

import {
  CardSection,
  IdeaCard,
  LoadingSpinner,
  PageHeader,
  useGetData,
} from '@/components';

function MyIdeas() {
  const { currentUser, ideas, loading } = useGetData();
  if (loading) {
    return <LoadingSpinner message='Loading your ideas...' />;
  }

  return (
    <>
      <div className='space-y-6 p-6'>
        <PageHeader
          subtitle='Here are your submitted ideas.'
          title={`Welcome, ${currentUser.name}!`}
        />
        <CardSection
          icon={Lightbulb}
          iconColor='text-yellow-500'
          title='My Ideas'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {ideas.length > 0 ? (
              ideas.map((idea) => <IdeaCard idea={idea} key={idea.id} />)
            ) : (
              <p className='text-gray-500 col-span-full'>
                You haven't submitted any ideas yet.
              </p>
            )}
          </div>
        </CardSection>
      </div>
    </>
  );
}

export default MyIdeas;
