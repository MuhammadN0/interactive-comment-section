import { useQuery } from '@tanstack/react-query';
import { fetchCurrentUser } from '../services/fetchApi';

export function useUser() {
  const { data: user, isLoading } = useQuery({
    queryFn: fetchCurrentUser,
    queryKey: ['user'],
  });
  return { user, isLoading };
}
