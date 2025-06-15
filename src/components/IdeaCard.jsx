import { Eye } from 'lucide-react';
import { Link } from 'react-router';

import { Card, CardContent } from '@/components';

function IdeaCard({ idea }) {
  return (
    <Card className='w-full'>
      <CardContent className='p-4 space-y-2'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-2'>
            <h3 className='font-semibold text-base'>{idea.title}</h3>
          </div>
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              idea.status === 'approved'
                ? 'bg-green-100 text-green-700'
                : idea.status === 'rejected'
                ? 'bg-red-100 text-red-700'
                : 'bg-yellow-100 text-yellow-700'
            }`}>
            {idea.status}
          </span>
        </div>
        {idea.student?.name && (
          <p className='text-sm text-muted-foreground'>
            By: {idea.student.name}
          </p>
        )}
        <p className='text-sm text-gray-700'>
          {idea.description?.slice(0, 100)}...
        </p>
        <Link
          className='text-primary underline-offset-4 hover:underline text-sm'
          to={`/idea/${idea.id}`}>
          <Eye className='inline mr-1 h-5' />
          View more
        </Link>
      </CardContent>
    </Card>
  );
}

export default IdeaCard;
