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
import { loginApi } from '@/services';

function Login() {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    await loginApi(data, navigate, toast);
  };
  return (
    <div className='min-h-screen flex items-center justify-center bg-background'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle className='text-center'>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                placeholder='Enter your email'
                type='email'
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && (
                <p className='text-sm text-destructive'>
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className='space-y-2'>
              <Label htmlFor='password'>Password</Label>
              <Input
                id='password'
                placeholder='Enter your password'
                type='password'
                {...register('password', { required: 'Password is required' })}
              />
              {errors.password && (
                <p className='text-sm text-destructive'>
                  {errors.password.message}
                </p>
              )}
            </div>{' '}
            <Button className='w-full' type='submit'>
              Login
            </Button>
          </form>
          <div className='text-center mt-4'>
            <p className='text-sm text-muted-foreground'>
              Don't have an account?{' '}
              <button
                className='text-primary hover:underline font-medium'
                onClick={() => navigate('/register')}
                type='button'>
                Sign up
              </button>
            </p>
          </div>
          <div className='mt-6 text-xs text-muted-foreground space-y-1'>
            <p className='font-semibold text-center'>Test Accounts</p>
            <p>
              <strong>Student:</strong> example@tuwaiq.edu.sa / 123
            </p>
            <p>
              <strong>Teacher:</strong> nasser@tuwaiq.edu.sa / t123
            </p>
            <p>
              <strong>Admin:</strong> abeer@tuwaiq.edu.sa / admin123
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
