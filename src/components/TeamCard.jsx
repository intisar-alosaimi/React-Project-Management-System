import { Card, CardContent } from '@/components';

function TeamCard({ team, user }) {
  const showSupervisor = user.role !== 'teacher' && team.teacher;
  const members = team.members || [];

  return (
    <div className='bg-white rounded-lg border border-gray-200 p-6 hover:shadow-sm transition-shadow duration-200'>
      <div className='space-y-4'>
        <div>
          <h3 className='text-lg font-semibold text-gray-900 mb-1'>
            {team.name}
          </h3>

          {showSupervisor && (
            <div className='flex items-center gap-2 text-sm text-gray-600'>
              <span>Supervised by</span>
              <span className='font-medium text-gray-900'>
                {team.teacher.name}
              </span>
              <span className='text-blue-600'>
                ({team.teacher.email})
              </span>
            </div>
          )}
        </div>

        {members.length > 0 && (
          <div className='space-y-2'>
            <h4 className='text-sm font-medium text-gray-700'>
              Team Members ({members.length})
            </h4>
            <div className='space-y-1.5'>
              {members.map((member) => (
                <div
                  key={member.id}
                  className='flex items-center justify-between py-1.5 px-3 bg-gray-50 rounded-md'
                >
                  <span className='text-sm font-medium text-gray-900'>
                    {member.name}
                  </span>
                  <span className='text-sm text-blue-600'>
                    {member.email}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TeamCard;
