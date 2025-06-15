import { useQuery } from '@tanstack/react-query';

import { GetIdeas, GetSupervision, GetTeams } from '@/components';
import { getAllIdeas, getAllUsers } from '@/services';

function getUser() {
  try {
    const data = localStorage.getItem('user');
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export default function useGetData() {
  const currentUser = getUser();
  const role = currentUser?.role;
  const { data: userIdeas = [], isLoading: loadingUserIdeas } = useQuery({
    enabled: !!currentUser && role === 'student',
    queryFn: () => GetIdeas(currentUser),
    queryKey: ['user-ideas', currentUser?.id],
  });

  const { data: allIdeas = [], isLoading: loadingAllIdeas } = useQuery({
    enabled: !!currentUser,
    queryFn: getAllIdeas,
    queryKey: ['all-ideas'],
  });

  const { data: teams = [], isLoading: loadingTeams } = useQuery({
    enabled: !!currentUser && (role === 'student' || role === 'teacher'),
    queryFn: () => GetTeams(currentUser),
    queryKey: ['teams', currentUser?.id],
  });

  const { data: supervision = [], isLoading: loadingSupervision } = useQuery({
    enabled: !!currentUser && (role === 'student' || role === 'teacher'),
    queryFn: () => GetSupervision(currentUser),
    queryKey: ['supervision', currentUser?.id],
  });

  const { data: users = [], isLoading: loadingUsers } = useQuery({
    enabled: !!currentUser && role === 'admin',
    queryFn: getAllUsers,
    queryKey: ['users'],
  });

  const isLoading =
    loadingUserIdeas ||
    loadingAllIdeas ||
    loadingTeams ||
    loadingSupervision ||
    loadingUsers;
  let ideas = [];
  let approvedIdeas = [];
  let allUsers = [];
  let getApprovedIdeas = () => allIdeas.filter((i) => i.status === 'approved');

  if (role === 'student') {
    ideas = userIdeas;
    approvedIdeas = getApprovedIdeas();
  } else if (role === 'teacher') {
    ideas = allIdeas.filter((i) => i.teacher?.id === currentUser.id);
  } else if (role === 'admin') {
    ideas = allIdeas;
    approvedIdeas = getApprovedIdeas();
    allUsers = users;
  }

  return {
    approvedIdeas,
    currentUser,
    ideas,
    loading: isLoading,
    supervision,
    teams,
    users: allUsers,
  };
}
