import axios from 'axios';

const URL = 'https://68497ceb45f4c0f5ee71a6fb.mockapi.io/users';

const loginApi = async (data, navigate, toast) => {
  try {
    const response = await axios.get(URL, data);
    const user = response.data.find(
      (user) => user.email === data.email && user.password === data.password
    );
    if (!user) {
      toast.error('Invalid email or password. Please try again.');
      return;
    }
    if (response.status === 200) {
      toast.success('Login successful!');
      const userData = {
        email: user.email,
        id: user.id,
        isLoggedIn: true,
        name: user.name,
        role: user.role,
      };
      localStorage.setItem('user', JSON.stringify(userData));
      if (user.role === 'student') {
        navigate('/student/dashboard');
      } else if (user.role === 'teacher') {
        navigate('/teacher/dashboard');
      } else if (user.role === 'admin') navigate('/admin/dashboard');
    }
  } catch {
    toast.error('Login failed. Please try again.');
  }
};

const registerApi = async (data, navigate, toast) => {
  try {
    const existingUsers = await axios.get(URL);
    const userExists = existingUsers.data.some(
      (user) => user.email === data.email
    );
    if (userExists) {
      toast.error(
        'User already exists with this email. Please use a different email.'
      );
      return;
    }
    data.role = 'student';
    const userData = {
      createdAt: new Date().toISOString(),
      email: data.email,
      name: data.name,
      password: data.password,
      role: data.role,
    };
    const response = await axios.post(URL, userData);
    if (response.status === 201) {
      toast.success('Registration successful!');
      navigate('/login');
    }
  } catch (error) {
    console.error('Registration error:', error);
    toast.error('Registration failed. Please try again.');
  }
};

const logout = (navigate, toast) => {
  localStorage.removeItem('user');
  toast.success('Logged out successfully!');
  navigate('/login');
};

export { loginApi, logout, registerApi };
