import { getAllIdeas } from '@/services';

async function getIdeas(user) {
  try {
    const allIdeas = await getAllIdeas();

    switch (user.role) {
      case 'admin':
        return allIdeas;

      case 'teacher':
        return allIdeas.filter((idea) =>
          idea.teacher?.id === user.id.toString()
        );

      case 'student':
        return allIdeas.filter((idea) =>
          idea.student?.id === user.id.toString()
        );

      default:
        return [];
    }
  } catch (error) {
    console.error('Error fetching ideas:', error);
    return [];
  }
}

export default getIdeas;
