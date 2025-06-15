import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { Button, Input, PageHeader, Textarea, useGetData } from '@/components';
import { useCreateIdea } from '@/hooks';

const FieldError = ({ error }) =>
  error ? <p className='text-sm text-red-500 mt-1'>{error.message}</p> : null;

function CreateIdea() {
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm();
  const { isPending, mutate } = useCreateIdea();
  const { currentUser, supervision } = useGetData();

  const assignedTeacher = supervision?.[0]?.teacher;

  const onSubmit = ({ description, title }) => {
    mutate(
      {
        description,
        status: 'pending',
        student: {
          email: currentUser.email,
          id: currentUser.id,
          name: currentUser.name,
        },
        teacher: assignedTeacher,
        title,
      },
      {
        onError: () => toast.error('Submission failed'),
        onSuccess: () => {
          toast.success('Idea submitted!');
          reset();
        },
      }
    );
  };

  return (
    <div className='max-w-lg mx-auto mt-10 bg-white p-8 rounded shadow'>
      <PageHeader title='Submit New Idea' />
      <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            {...register('title', { required: 'Title is required' })}
            placeholder='Idea title'
          />
          <FieldError error={errors.title} />
        </div>
        <div>
          <Textarea
            {...register('description', {
              required: 'Description is required',
            })}
            placeholder='Explain your idea clearly...'
          />
          <FieldError error={errors.description} />
        </div>
        <Button className='w-full' disabled={isPending} type='submit'>
          {isPending ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
    </div>
  );
}
export default CreateIdea;
