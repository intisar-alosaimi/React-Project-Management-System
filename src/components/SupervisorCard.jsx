import { Card, CardContent, CardHeader } from '@/components/ui/card';

function SupervisorCard({ mode = 'student', supervision }) {
  const isTeacher = mode === 'teacher';
  const personType = isTeacher ? 'student' : 'teacher';

  if (!supervision || supervision.length === 0) {
    return (
      <p className='text-gray-500'>
        {isTeacher
          ? 'No students assigned for supervision.'
          : 'No supervisors assigned.'}
      </p>
    );
  }

  return (
    <div className='space-y-4'>
      {supervision.map((s) => {
        const person = s[personType];
        return (
          <Card key={person.id}>
            <CardHeader className='pb-2 text-sm font-medium text-gray-500'>
              {isTeacher ? 'Student' : 'Supervisor'}
            </CardHeader>
            <CardContent className='space-y-1 text-sm text-gray-700'>
              <p>
                <strong>Name:</strong>{' '}
                <span className='text-gray-900'>{person.name}</span>
              </p>
              <p>
                <strong>Email:</strong>{' '}
                <span className='text-blue-600'>{person.email}</span>
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export default SupervisorCard;
