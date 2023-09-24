import { useQuery } from '@tanstack/react-query';
import { getComments } from '../services/fetchApi';

export function useComments() {
  const { data: comments, isLoading } = useQuery({
    queryKey: ['comments'],
    queryFn: getComments,
  });
  return { comments, isLoading };
}
