import { Eye, Mail, User } from 'lucide-react';

import { Button, Card, CardContent } from '@/components';

function UserCard({ user }) {
  const { email, name, role } = user;

  return (
    <Card className='w-full'>
      <CardContent className='p-4 space-y-2'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-2'>
            <User className='w-4 h-4 text-blue-500' />
            <h3 className='font-medium'>{name}</h3>
          </div>
          <span className='text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full capitalize'>
            {role}
          </span>
        </div>
        <div className='flex items-center gap-2 text-sm text-muted-foreground'>
          <Mail className='w-4 h-4' />
          <span>{email}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default UserCard;
