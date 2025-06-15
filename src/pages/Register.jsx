import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from '@/components';
import { registerApi } from '@/services';

function Register() {
  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    await registerApi(data, navigate, toast);
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-background'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle className='text-center'>Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
            <div className='space-y-2'>
              <Label htmlFor='name'>Name</Label>
              <Input
                id='name'
                placeholder='Enter your name'
                type='text'
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && (
                <p className='text-sm text-destructive'>
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                placeholder='Enter your @tuwaiq.edu.sa email'
                type='email'
                {...register('email', {
                  pattern: {
                    message: 'Email must be a valid @tuwaiq.edu.sa address',
                    value: /^[a-zA-Z0-9._%+-]+@tuwaiq\.edu\.sa$/,
                  },
                  required: 'Email is required',
                  validate: (value) => {
                    if (!value.toLowerCase().endsWith('@tuwaiq.edu.sa')) {
                      return 'Only @tuwaiq.edu.sa email addresses are allowed';
                    }
                    return true;
                  },
                })}
              />
              {errors.email && (
                <p className='text-sm text-destructive'>
                  {errors.email.message}
                </p>
              )}
              <p className='text-xs text-muted-foreground'>
                Only Tuwaiq Academy email addresses (@tuwaiq.edu.sa) are
                accepted
              </p>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                placeholder='Enter your password'
                type='password'
                {...register('password', {
                  minLength: {
                    message: 'Password must be at least 6 characters long',
                    value: 6,
                  },
                  required: 'Password is required',
                })}
              />
              {errors.password && (
                <p className='text-sm text-destructive'>
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='confirmPassword'>Confirm Password</Label>
              <Input
                id='confirmPassword'
                placeholder='Confirm your password'
                type='password'
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) =>
                    value === watch('password') || 'Passwords do not match',
                })}
              />
              {errors.confirmPassword && (
                <p className='text-sm text-destructive'>
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button className='w-full' type='submit'>
              Register
            </Button>
          </form>
          <div className='text-center mt-4'>
            <p className='text-sm text-muted-foreground'>
              Already have an account?{' '}
              <button
                className='text-primary hover:underline font-medium'
                onClick={() => navigate('/login')}
                type='button'>
                Sign in
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Register;
