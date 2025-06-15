import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createIdea } from '@/services';

export default function useCreateIdea() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createIdea,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-ideas'] });
      queryClient.invalidateQueries({ queryKey: ['all-ideas'] });
    },
  });
}
