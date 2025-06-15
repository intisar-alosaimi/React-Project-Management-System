import {
  ArrowLeft,
  Calendar,
  Edit,
  GraduationCap,
  Mail,
  Save,
  Trash2,
  User,
  UserCheck,
  X,
} from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router';
import Swal from 'sweetalert2';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
  RoleBadge,
  StatusBadge,
} from '@/components';
import {
  createSupervision,
  deleteSupervision,
  deleteUser,
  getAllSupervision,
  getAllUsers,
  getUserById,
  updateSupervision,
  updateUser,
} from '@/services';

function SingleUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [supervisions, setSupervisions] = useState([]);
  const [assignedTeacher, setAssignedTeacher] = useState(null);
  const [isAssigningTeacher, setIsAssigningTeacher] = useState(false);
  const [selectedTeacherId, setSelectedTeacherId] = useState('');
  const [editForm, setEditForm] = useState({
    email: '',
    name: '',
    role: '',
  });
  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      const [userData, allUsers, allSupervisions] = await Promise.all([
        getUserById(id),
        getAllUsers(),
        getAllSupervision(),
      ]);

      setUser(userData);
      setEditForm({
        email: userData.email || '',
        name: userData.name || '',
        role: userData.role || '',
      });

      const teachersList = allUsers.filter((user) => user.role === 'teacher');
      setTeachers(teachersList);

      setSupervisions(allSupervisions);

      if (userData.role === 'student') {
        const studentSupervision = allSupervisions.find(
          (supervision) => supervision.student?.id === userData.id.toString()
        );
        setAssignedTeacher(studentSupervision?.teacher || null);
        setSelectedTeacherId(studentSupervision?.teacher?.id || '');
      }
    } catch (error) {
      toast.error('Failed to load user details');
      console.error('Error fetching user:', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchUser();
    }
  }, [id, fetchUser]);

  const handleUpdateUser = async () => {
    try {
      const updatedUser = await updateUser(id, editForm);
      setUser(updatedUser);
      setIsEditing(false);
      toast.success('User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
      toast.error('Failed to update user');
    }
  };
  const handleDeleteUser = async () => {
    const result = await Swal.fire({
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      icon: 'warning',
      showCancelButton: true,
      text: 'You want to delete this user? This action cannot be undone.',
      title: 'Are you sure?',
    });

    if (result.isConfirmed) {
      try {
        await deleteUser(id);
        Swal.fire({
          icon: 'success',
          showConfirmButton: false,
          text: 'User has been deleted successfully.',
          timer: 2000,
          title: 'Deleted!',
        });
        navigate('/admin/AllUsers');
      } catch (error) {
        console.error('Error deleting user:', error);
        Swal.fire({
          icon: 'error',
          text: 'Failed to delete user. Please try again.',
          title: 'Error!',
        });
      }
    }
  };
  const handleInputChange = (field, value) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAssignTeacher = async () => {
    if (!selectedTeacherId) {
      toast.error('Please select a teacher');
      return;
    }

    try {
      const selectedTeacher = teachers.find((t) => t.id === selectedTeacherId);

      const existingSupervision = supervisions.find(
        (supervision) => supervision.student?.id === user.id.toString()
      );

      if (existingSupervision) {
        const updatedSupervision = await updateSupervision(
          existingSupervision.id,
          {
            ...existingSupervision,
            teacher: selectedTeacher,
          }
        );
        setSupervisions((prev) =>
          prev.map((s) =>
            s.id === existingSupervision.id ? updatedSupervision : s
          )
        );
      } else {
        const newSupervision = await createSupervision({
          student: user,
          teacher: selectedTeacher,
        });
        setSupervisions((prev) => [...prev, newSupervision]);
      }

      setAssignedTeacher(selectedTeacher);
      setIsAssigningTeacher(false);
      toast.success('Teacher assigned successfully');
    } catch (error) {
      console.error('Error assigning teacher:', error);
      toast.error('Failed to assign teacher');
    }
  };

  const handleRemoveTeacher = async () => {
    const result = await Swal.fire({
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, remove!',
      icon: 'warning',
      showCancelButton: true,
      text: 'Are you sure you want to remove the assigned teacher?',
      title: 'Remove Teacher?',
    });

    if (result.isConfirmed) {
      try {
        const existingSupervision = supervisions.find(
          (supervision) => supervision.student?.id === user.id.toString()
        );

        if (existingSupervision) {
          await deleteSupervision(existingSupervision.id);
          setSupervisions((prev) =>
            prev.filter((s) => s.id !== existingSupervision.id)
          );
          setAssignedTeacher(null);
          setSelectedTeacherId('');
          toast.success('Teacher removed successfully');
        }
      } catch (error) {
        console.error('Error removing teacher:', error);
        toast.error('Failed to remove teacher');
      }
    }
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4'></div>
          <p className='text-gray-600'>Loading user details...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className='max-w-4xl mx-auto p-6'>
        <Card>
          <CardContent className='p-8 text-center'>
            <User className='h-16 w-16 text-gray-400 mx-auto mb-4' />
            <h2 className='text-xl font-semibold text-gray-700 mb-2'>
              User Not Found
            </h2>
            <p className='text-gray-500 mb-4'>
              The user you're looking for doesn't exist.
            </p>
            <Button onClick={() => navigate('/admin/AllUsers')}>
              <ArrowLeft className='h-4 w-4 mr-2' />
              Back to All Users
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='max-w-4xl mx-auto p-6 space-y-6'>
      {/* Top Header */}
      <div className='bg-green-600 text-white rounded-lg p-6 shadow-sm'>
        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
          <div>
            <h1 className='text-3xl font-bold mb-2'>User Profile</h1>
            <p className='text-green-100'>View and manage user information</p>
          </div>
          <Button
            className='bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm'
            onClick={() => navigate('/admin/AllUsers')}>
            <ArrowLeft className='h-4 w-4 mr-2' />
            Back to Users
          </Button>
        </div>
      </div>

      {/* User Info Card */}
      <Card>
        <CardHeader>
          <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
            <CardTitle className='flex items-center gap-2'>
              <UserCheck className='h-5 w-5' />
              User Information
            </CardTitle>
            <div className='flex flex-col sm:flex-row gap-2'>
              {!isEditing ? (
                <>
                  <Button
                    onClick={() => setIsEditing(true)}
                    size='sm'
                    variant='outline'>
                    <Edit className='h-4 w-4 mr-2' />
                    Edit User
                  </Button>
                  <Button
                    className='text-red-600 hover:text-red-700 hover:border-red-300'
                    onClick={handleDeleteUser}
                    size='sm'
                    variant='outline'>
                    <Trash2 className='h-4 w-4 mr-2' />
                    Delete User
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      setIsEditing(false);
                      setEditForm({
                        email: user.email || '',
                        name: user.name || '',
                        role: user.role || '',
                      });
                    }}
                    size='sm'
                    variant='outline'>
                    <X className='h-4 w-4 mr-2' />
                    Cancel
                  </Button>
                  <Button onClick={handleUpdateUser} size='sm'>
                    <Save className='h-4 w-4 mr-2' />
                    Save Changes
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className='space-y-6'>
          {!isEditing ? (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div className='space-y-4'>
                <div className='flex items-center gap-3'>
                  <User className='h-5 w-5 text-gray-500' />
                  <div>
                    <p className='text-sm text-gray-500'>Full Name</p>
                    <p className='font-medium'>{user.name || 'No Name'}</p>
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <Mail className='h-5 w-5 text-gray-500' />
                  <div>
                    <p className='text-sm text-gray-500'>Email Address</p>
                    <p className='font-medium'>{user.email || 'No Email'}</p>
                  </div>
                </div>
              </div>
              <div className='space-y-4'>
                <div className='flex items-center gap-3'>
                  <GraduationCap className='h-5 w-5 text-gray-500' />
                  <div>
                    <p className='text-sm text-gray-500'>Role</p>
                    <RoleBadge role={user.role} />
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <Calendar className='h-5 w-5 text-gray-500' />
                  <div>
                    <p className='text-sm text-gray-500'>Member Since</p>
                    <p className='font-medium'>
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : 'Unknown'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className='space-y-4'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <Label htmlFor='name'>Full Name</Label>
                  <Input
                    id='name'
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    value={editForm.name}
                  />
                </div>
                <div>
                  <Label htmlFor='email'>Email Address</Label>
                  <Input
                    id='email'
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    type='email'
                    value={editForm.email}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor='role'>Role</Label>
                <select
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  id='role'
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  value={editForm.role}>
                  <option value=''>Select Role</option>
                  <option value='student'>Student</option>
                  <option value='teacher'>Teacher</option>
                </select>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Assigned Teacher Card */}
      {user.role === 'student' && (
        <Card>
          <CardHeader>
            <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
              <CardTitle className='flex items-center gap-2'>
                <GraduationCap className='h-5 w-5' />
                Teacher Assignment
              </CardTitle>
              <div className='flex flex-col sm:flex-row gap-2'>
                {!isAssigningTeacher ? (
                  <>
                    <Button
                      onClick={() => {
                        setIsAssigningTeacher(true);
                        setSelectedTeacherId(assignedTeacher?.id || '');
                      }}
                      size='sm'
                      variant='outline'>
                      <Edit className='h-4 w-4 mr-2' />
                      {assignedTeacher ? 'Change Teacher' : 'Assign Teacher'}
                    </Button>
                    {assignedTeacher && (
                      <Button
                        className='text-red-600 hover:text-red-700 hover:border-red-300'
                        onClick={handleRemoveTeacher}
                        size='sm'
                        variant='outline'>
                        <Trash2 className='h-4 w-4 mr-2' />
                        Remove Teacher
                      </Button>
                    )}
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => {
                        setIsAssigningTeacher(false);
                        setSelectedTeacherId(assignedTeacher?.id || '');
                      }}
                      size='sm'
                      variant='outline'>
                      <X className='h-4 w-4 mr-2' />
                      Cancel
                    </Button>
                    <Button onClick={handleAssignTeacher} size='sm'>
                      <Save className='h-4 w-4 mr-2' />
                      Save Assignment
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {!isAssigningTeacher ? (
              assignedTeacher ? (
                <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-green-50 rounded-lg'>
                  <div className='w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white text-lg font-bold'>
                    {assignedTeacher.name?.charAt(0)?.toUpperCase() || 'T'}
                  </div>
                  <div>
                    <h4 className='font-semibold text-lg'>
                      {assignedTeacher.name}
                    </h4>
                    <p className='text-gray-600'>{assignedTeacher.email}</p>
                    <StatusBadge status='approved' />
                  </div>
                </div>
              ) : (
                <div className='text-center py-8'>
                  <GraduationCap className='h-16 w-16 text-gray-400 mx-auto mb-4' />
                  <p className='text-gray-500 mb-4'>
                    No teacher assigned to this student
                  </p>
                  <Button onClick={() => setIsAssigningTeacher(true)}>
                    Assign Teacher
                  </Button>
                </div>
              )
            ) : (
              <div className='space-y-4'>
                <Label htmlFor='teacher'>Select Teacher</Label>
                <select
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  id='teacher'
                  onChange={(e) => setSelectedTeacherId(e.target.value)}
                  value={selectedTeacherId}>
                  <option value=''>Select a teacher...</option>
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} - {t.email}
                    </option>
                  ))}
                </select>
                {teachers.length === 0 && (
                  <p className='text-amber-600 text-sm'>
                    No teachers available. Please create teacher accounts first.
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Statistics Card */}
      <Card>
        <CardHeader>
          <CardTitle>User Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            <div className='bg-blue-50 p-4 rounded-lg'>
              <p className='text-sm text-gray-600'>Account Status</p>
              <p className='text-xl font-semibold text-blue-600'>Active</p>
            </div>
            <div className='bg-green-50 p-4 rounded-lg'>
              <p className='text-sm text-gray-600'>Last Login</p>
              <p className='text-xl font-semibold text-green-600'>
                {user.lastLogin
                  ? new Date(user.lastLogin).toLocaleDateString()
                  : 'Never'}
              </p>
            </div>
            <div className='bg-purple-50 p-4 rounded-lg'>
              <p className='text-sm text-gray-600'>Profile Completion</p>
              <p className='text-xl font-semibold text-purple-600'>
                {user.name && user.email ? '100%' : '50%'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SingleUser;
