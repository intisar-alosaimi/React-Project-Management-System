import { Lightbulb } from 'lucide-react';

import {
  CardSection,
  IdeaCard,
  LoadingSpinner,
  useGetData,
} from '@/components';

function IdeasAll() {
  const { approvedIdeas, loading } = useGetData();

  if (loading) {
    return <LoadingSpinner message='Loading ideas...' />;
  }

  const approved = approvedIdeas.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div>
      <CardSection
        icon={Lightbulb}
        iconColor='text-yellow-500'
        title='approved Ideas -(all students)'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {approved.length > 0 ? (
            approved.map((idea) => <IdeaCard idea={idea} key={idea.id} />)
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

export default IdeasAll;
