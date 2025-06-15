import { Check, Edit, Trash2, X } from 'lucide-react';
import { useState } from 'react';

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  StatusBadge,
  Textarea,
} from '@/components';
import { updateIdea } from '@/services';

const ACTION_TEXTS = {
  approve: 'Approve Idea',
  delete: 'Delete Idea',
  pending: 'Move to Pending',
  reject: 'Reject Idea',
  restorePending: 'Restore to Pending',
};

const needsReason = ['reject', 'delete'];

function ActionDialog({
  action,
  error,
  loading,
  onOpenChange,
  onSubmit,
  open,
  reason,
  setReason,
}) {
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{ACTION_TEXTS[action] || 'Confirm Action'}</DialogTitle>
        </DialogHeader>

        {needsReason.includes(action) && (
          <div className='mb-4'>
            <label className='block text-sm font-medium mb-1' htmlFor='reason'>
              Reason:
            </label>
            <Textarea
              id='reason'
              onChange={(e) => setReason(e.target.value)}
              placeholder='Enter reason...'
              value={reason}
            />
          </div>
        )}

        {error && <div className='text-red-600 text-sm mb-2'>{error}</div>}

        <DialogFooter>
          <Button
            disabled={loading || (needsReason.includes(action) && !reason)}
            onClick={onSubmit}>
            {loading ? 'Processing...' : 'Confirm'}
          </Button>
          <DialogClose asChild>
            <Button disabled={loading} variant='secondary'>
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ManageIdeas({ currentUser, idea, onApprove, onReject }) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [action, setAction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isAdmin = currentUser?.role === 'admin';
  const isTeacher = currentUser?.role === 'teacher';

  const openAction = (actionType) => {
    setAction(actionType);
    setReason('');
    setError('');
    setOpen(true);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const basePayload = { ...idea, deletionReason: '', rejectionReason: '' };

      const statusMap = {
        approve: { status: 'approved' },
        delete: { deletionReason: reason, status: 'deleted' },
        pending: { status: 'pending' },
        reject: { rejectionReason: reason, status: 'rejected' },
        restorePending: { status: 'pending' },
      };

      const updateData = statusMap[action];
      if (!updateData) throw new Error('Unknown action');

      await updateIdea(idea.id, { ...basePayload, ...updateData });

      if (action === 'approve' && onApprove) onApprove(idea);
      if (action === 'reject' && onReject) onReject(idea, reason);

      setOpen(false);
      setReason('');
      window.location.reload();
    } catch (err) {
      setError('Failed to update idea.', err);
    } finally {
      setLoading(false);
    }
  };

  const button = (label, variant, icon, handler, color) => (
    <Button
      className={`text-${color}-700 border-${color}-500`}
      onClick={handler}
      size='sm'
      variant='outline'>
      {icon}
      {label}
    </Button>
  );

  const getButtons = () => {
    if (isTeacher) {
      if (idea.status === 'pending') {
        return (
          <>
            {button(
              'Approve',
              'outline',
              <Check className='w-3 h-3 mr-1' />,
              () => openAction('approve'),
              'green'
            )}
            {button(
              'Reject',
              'outline',
              <X className='w-3 h-3 mr-1' />,
              () => openAction('reject'),
              'red'
            )}
          </>
        );
      }
      return <StatusBadge status={idea.status} />;
    }

    if (isAdmin) {
      const status = idea.status;
      const actions = {
        approved: [
          {
            color: 'yellow',
            icon: <Edit className='w-3 h-3 mr-1' />,
            label: 'Move to Pending',
            type: 'pending',
          },
          {
            color: 'red',
            icon: <X className='w-3 h-3 mr-1' />,
            label: 'Reject',
            type: 'reject',
          },
        ],
        deleted: [
          {
            color: 'yellow',
            icon: <Edit className='w-3 h-3 mr-1' />,
            label: 'Restore to Pending',
            type: 'restorePending',
          },
        ],
        pending: [
          {
            color: 'green',
            icon: <Check className='w-3 h-3 mr-1' />,
            label: 'Approve',
            type: 'approve',
          },
          {
            color: 'red',
            icon: <X className='w-3 h-3 mr-1' />,
            label: 'Reject',
            type: 'reject',
          },
        ],
        rejected: [
          {
            color: 'green',
            icon: <Check className='w-3 h-3 mr-1' />,
            label: 'Approve',
            type: 'approve',
          },
          {
            color: 'yellow',
            icon: <Edit className='w-3 h-3 mr-1' />,
            label: 'Pending',
            type: 'pending',
          },
          {
            color: 'red',
            icon: <Trash2 className='w-3 h-3 mr-1' />,
            label: 'Delete',
            type: 'delete',
          },
        ],
      };

      return actions[status]?.map(({ color, icon, label, type }) =>
        button(label, 'outline', icon, () => openAction(type), color)
      );
    }

    return null;
  };

  return (
    <>
      <div className='flex flex-col sm:flex-row flex-wrap gap-2'>
        {getButtons()}
      </div>
      {action && (
        <ActionDialog
          action={action}
          error={error}
          loading={loading}
          onOpenChange={setOpen}
          onSubmit={handleSubmit}
          open={open}
          reason={reason}
          setReason={setReason}
        />
      )}
    </>
  );
}

export default ManageIdeas;
