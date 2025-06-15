import { Badge } from '@/components';

const statusConfig = {
  pending: {
    label: 'Pending',
    className: 'bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100'
  },
  approved: {
    label: 'Approved',
    className: 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
  },
  rejected: {
    label: 'Rejected',
    className: 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
  },
  deleted: {
    label: 'Deleted',
    className: 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
  }
};

function StatusBadge({ status, className = '' }) {
  const config = statusConfig[status] || statusConfig.pending;

  return (
    <Badge
      variant="outline"
      className={`font-medium transition-colors duration-200 ${config.className} ${className}`}
    >
      {config.label}
    </Badge>
  );
}

export default StatusBadge;
