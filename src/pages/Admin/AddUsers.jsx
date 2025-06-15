import {
  ArrowLeft,
  BookOpen,
  GraduationCap,
  Mail,
  Shield,
  User,
  Users,
} from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from '@/components';
import { PageHeader } from '@/components';
import { createUser } from '@/services';

function AddUsers() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    role: 'student',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleSelect = (role) => {
    setFormData((prev) => ({
      ...prev,
      role,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error('Name is required');
      return false;
    }
    if (!formData.email.trim()) {
      toast.error('Email is required');
      return false;
    }
    if (!formData.email.includes('@')) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (!formData.password.trim()) {
      toast.error('Password is required');
      return false;
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const userData = {
        ...formData,
        createdAt: new Date().toISOString(),
        isActive: true,
      };

      await createUser(userData);
      toast.success(
        `${
          formData.role.charAt(0).toUpperCase() + formData.role.slice(1)
        } created successfully!`
      );

      setFormData({
        email: '',
        name: '',
        password: '',
        role: 'student',
      });
    } catch (error) {
      toast.error('Failed to create user. Please try again.');
      console.error('Error creating user:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-4xl mx-auto p-6 space-y-6'>
      <PageHeader
        actions={
          <Button size='sm' variant='outline' asChild>
            <Link className='inline-flex items-center' to='/admin/dashboard'>
              <ArrowLeft className='w-4 h-4 mr-2' />
              Back to Dashboard
            </Link>
          </Button>
        }
        className='p-2 '
        subtitle='Create new student or teacher accounts'
        title='Add New User'
      />

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <Card className='lg:col-span-1'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Shield className='h-5 w-5' />
              Select Role
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <div
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                formData.role === 'student'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleRoleSelect('student')}>
              <div className='flex items-center gap-3'>
                <GraduationCap
                  className={`h-6 w-6 ${
                    formData.role === 'student'
                      ? 'text-blue-600'
                      : 'text-gray-500'
                  }`}
                />
                <div>
                  <h3
                    className={`font-semibold ${
                      formData.role === 'student'
                        ? 'text-blue-900'
                        : 'text-gray-700'
                    }`}>
                    Student
                  </h3>
                  <p className='text-sm text-gray-600'>
                    Can submit and manage ideas
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                formData.role === 'teacher'
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleRoleSelect('teacher')}>
              <div className='flex items-center gap-3'>
                <BookOpen
                  className={`h-6 w-6 ${
                    formData.role === 'teacher'
                      ? 'text-purple-600'
                      : 'text-gray-500'
                  }`}
                />
                <div>
                  <h3
                    className={`font-semibold ${
                      formData.role === 'teacher'
                        ? 'text-purple-900'
                        : 'text-gray-700'
                    }`}>
                    Teacher
                  </h3>
                  <p className='text-sm text-gray-600'>
                    Can supervise and review ideas
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='lg:col-span-2'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Users className='h-5 w-5' />
              User Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className='space-y-6' onSubmit={handleSubmit}>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label className='flex items-center gap-2' htmlFor='name'>
                    <User className='h-4 w-4' />
                    Full Name
                  </Label>
                  <Input
                    className='w-full'
                    id='name'
                    name='name'
                    onChange={handleInputChange}
                    placeholder='Enter full name'
                    type='text'
                    value={formData.name}
                    required
                  />
                </div>

                <div className='space-y-2'>
                  <Label className='flex items-center gap-2' htmlFor='email'>
                    <Mail className='h-4 w-4' />
                    Email Address
                  </Label>
                  <Input
                    className='w-full'
                    id='email'
                    name='email'
                    onChange={handleInputChange}
                    placeholder='Enter email address'
                    type='email'
                    value={formData.email}
                    required
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <Label className='flex items-center gap-2' htmlFor='password'>
                  <Shield className='h-4 w-4' />
                  Password
                </Label>
                <Input
                  className='w-full'
                  id='password'
                  minLength={6}
                  name='password'
                  onChange={handleInputChange}
                  placeholder='Enter password (min 6 characters)'
                  type='password'
                  value={formData.password}
                  required
                />
              </div>

              <div className='p-4 bg-gray-50 rounded-lg'>
                <h4 className='font-medium text-gray-900 mb-2'>
                  Creating Account For:
                </h4>
                <div className='flex items-center gap-2'>
                  {formData.role === 'student' ? (
                    <GraduationCap className='h-5 w-5 text-blue-600' />
                  ) : (
                    <BookOpen className='h-5 w-5 text-purple-600' />
                  )}
                  <span
                    className={`font-semibold capitalize ${
                      formData.role === 'student'
                        ? 'text-blue-600'
                        : 'text-purple-600'
                    }`}>
                    {formData.role}
                  </span>
                </div>
              </div>

              <div className='flex gap-3 pt-4'>
                <Button
                  className='flex-1 bg-cyan-600 hover:bg-cyan-700 text-white'
                  disabled={loading}
                  type='submit'>
                  {loading ? 'Creating...' : 'Create User'}
                </Button>
                <Button
                  onClick={() =>
                    setFormData({
                      email: '',
                      name: '',
                      password: '',
                      role: 'student',
                    })
                  }
                  disabled={loading}
                  type='button'
                  variant='outline'>
                  Clear Form
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AddUsers;
