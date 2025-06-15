import { getAllSupervision } from '@/services';

async function getSupervision(user) {
  try {
    const allSupervision = await getAllSupervision();

    switch (user.role) {
      case 'admin':
        return allSupervision;

      case 'teacher':
        return allSupervision.filter(
          (supervision) => supervision.teacher?.id === user.id.toString()
        );

      case 'student':
        return allSupervision.filter(
          (supervision) => supervision.student?.id === user.id.toString()
        );

      default:
        return [];
    }
  } catch (error) {
    console.error('Error fetching supervision:', error);
    return [];
  }
}

export default getSupervision;
