import { getAllTeams } from '@/services';

async function getTeams(user) {
  try {
    const allTeams = await getAllTeams();
    if (!allTeams || allTeams.length === 0) {
      return [];
    }
    switch (user.role) {
      case 'admin':
        return allTeams;

      case 'teacher': {
        const teacherTeams = allTeams.filter(
          (team) => team.teacher?.id === user.id.toString()
        );
        return teacherTeams;
      }

      case 'student': {
        const studentTeams = allTeams.filter((team) =>
          team.members?.some((member) => member.id === user.id.toString())
        );
        return studentTeams;
      }

      default:
        return [];
    }
  } catch (error) {
    console.error('Error fetching teams:', error);
    return [];
  }
}

export default getTeams;
