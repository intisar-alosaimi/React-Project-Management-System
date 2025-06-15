function TeamCard({ team, user }) {
  const showSupervisor = user.role !== 'teacher' && team.teacher;
  const members = team.members || [];

  return (
    <div className='bg-white rounded-xl border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow duration-200'>
      <div className='space-y-4'>
        <div>
          <h3 className='text-base sm:text-lg font-semibold text-gray-900 mb-1'>
            {team.name}
          </h3>

          {showSupervisor && (
            <div className='flex flex-col sm:flex-row sm:items-center sm:gap-2 text-sm text-gray-600'>
              <span>Supervised by</span>
              <span className='font-medium text-gray-900'>
                {team.teacher.name}
              </span>
              <span className='text-blue-600 truncate'>
                {team.teacher.email}
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
                  className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0 py-1.5 px-3 bg-gray-50 rounded-md'
                  key={member.id}>
                  <span className='text-sm font-medium text-gray-900 truncate'>
                    {member.name}
                  </span>
                  <span className='text-sm text-blue-600 truncate'>
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
