import { Calendar, Edit, Mail, MapPin, Save, User, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from '@/components';
import { getUserById, updateUser } from '@/services';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('user'));
      if (!currentUser) {
        toast.error('No user data found. Please log in again.');
        return;
      }

      const userData = await getUserById(currentUser.id);
      setUser(userData);
      setFormData(userData);
    } catch (error) {
      toast.error('Failed to load user data');
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updatedUser = await updateUser(user.id, formData);
      setUser(updatedUser);
      setIsEditing(false);

      const currentUser = JSON.parse(localStorage.getItem('user'));
      localStorage.setItem(
        'user',
        JSON.stringify({
          ...currentUser,
          email: updatedUser.email,
          name: updatedUser.name,
        })
      );

      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
      console.error('Error updating user:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mx-auto mb-4'></div>
          <p className='text-gray-600'>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <User className='h-16 w-16 text-gray-400 mx-auto mb-4' />
          <p className='text-gray-600'>Unable to load profile data</p>
        </div>
      </div>
    );
  }

  return (
    <div className='max-w-4xl mx-auto p-4 sm:p-6 space-y-6'>
      <div className='bg-cyan-700 text-white rounded-lg p-6 shadow-sm'>
        <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4'>
          <div>
            <h1 className='text-3xl font-bold mb-2'>My Profile</h1>
            <p className='text-cyan-100'>Manage your account information</p>
          </div>

          <div className='flex flex-col sm:flex-row flex-wrap gap-2'>
            <Button
              className='bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm'
              onClick={isEditing ? handleCancel : () => setIsEditing(true)}>
              {isEditing ? (
                <X className='h-4 w-4 mr-2' />
              ) : (
                <Edit className='h-4 w-4 mr-2' />
              )}
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </Button>
            {isEditing && (
              <Button
                className='bg-green-600 text-white hover:bg-green-700'
                disabled={saving}
                onClick={handleSave}>
                <Save className='h-4 w-4 mr-2' />
                {saving ? 'Saving...' : 'Save'}
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <Card className='lg:col-span-1'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <User className='h-5 w-5' />
              Profile Picture
            </CardTitle>
          </CardHeader>
          <CardContent className='text-center'>
            <div className='relative inline-block'>
              <div className='w-32 h-32 rounded-full bg-cyan-600 flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4 shadow-lg'>
                {user.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              {user.avatar && (
                <img
                  alt='Profile'
                  className='w-32 h-32 rounded-full object-cover mx-auto mb-4'
                  src={user.avatar}
                />
              )}
            </div>
            <h3 className='text-xl font-semibold'>{user.name}</h3>
            <p className='text-gray-600 capitalize'>{user.role}</p>
          </CardContent>
        </Card>

        <Card className='lg:col-span-2'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Mail className='h-5 w-5' />
              Contact Information
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <Label htmlFor='name'>Full Name</Label>
                {isEditing ? (
                  <Input
                    id='name'
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder='Enter your full name'
                    value={formData.name || ''}
                  />
                ) : (
                  <p className='mt-1 p-2 bg-gray-50 rounded-md'>
                    {user.name || 'Not provided'}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor='email'>Email Address</Label>
                {isEditing ? (
                  <Input
                    id='email'
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder='Enter your email'
                    type='email'
                    value={formData.email || ''}
                  />
                ) : (
                  <p className='mt-1 p-2 bg-gray-50 rounded-md'>
                    {user.email || 'Not provided'}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor='phone'>Phone Number</Label>
                <p className='mt-1 p-2 bg-gray-50 rounded-md'>
                  {user.phone || 'Not provided'}
                </p>
              </div>
              <div>
                <Label htmlFor='role'>Role</Label>
                <p className='mt-1 p-2 bg-gray-50 rounded-md capitalize'>
                  {user.role || 'Not provided'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <MapPin className='h-5 w-5' />
            Additional Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <Label htmlFor='address'>Address</Label>
              <p className='mt-1 p-2 bg-gray-50 rounded-md'>
                {user.address || 'Not provided'}
              </p>
            </div>
            <div>
              <Label htmlFor='department'>Department</Label>
              <p className='mt-1 p-2 bg-gray-50 rounded-md'>
                {user.department || 'Not provided'}
              </p>
            </div>
            <div>
              <Label htmlFor='studentId'>Student/Employee ID</Label>
              <p className='mt-1 p-2 bg-gray-50 rounded-md'>
                {user.studentId || 'Not provided'}
              </p>
            </div>
            <div>
              <Label htmlFor='joinDate'>Join Date</Label>
              <p className='mt-1 p-2 bg-gray-50 rounded-md flex items-center gap-2'>
                <Calendar className='h-4 w-4' />
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString()
                  : 'Not available'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='text-center p-4 bg-green-50 rounded-lg'>
              <div className='text-2xl font-bold text-green-600'>Active</div>
              <div className='text-sm text-gray-600'>Account Status</div>
            </div>
            <div className='text-center p-4 bg-purple-50 rounded-lg'>
              <div className='text-2xl font-bold text-purple-600 capitalize'>
                {user.role}
              </div>
              <div className='text-sm text-gray-600'>Account Type</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ProfilePage;
