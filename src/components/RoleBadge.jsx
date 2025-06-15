import { Badge } from '@/components';

const roleConfig = {
  admin: {
    label: 'Administrator',
    className: 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100'
  },
  teacher: {
    label: 'Teacher',
    className: 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
  },
  student: {
    label: 'Student',
    className: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
  }
};

function RoleBadge({ role, className = '' }) {
  const config = roleConfig[role] || roleConfig.student;

  return (
    <Badge
      variant="outline"
      className={`font-medium transition-colors duration-200 ${config.className} ${className}`}
    >
      {config.label}
    </Badge>
  );
}

export default RoleBadge;
