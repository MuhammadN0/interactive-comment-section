import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postComment } from "../services/fetchApi";

export function useNewComment () {
  const queryClient = useQueryClient()
  const {mutate: createNewComment, isLoading} = useMutation({
    mutationFn: (comment) => postComment(comment),
    onSuccess: ()=>{
      queryClient.invalidateQueries({
        queryKey: ['comments']
      })
    },
  })
  return {createNewComment, isLoading}
}