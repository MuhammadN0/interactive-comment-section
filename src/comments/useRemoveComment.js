import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment, deleteReply } from "../services/fetchApi";

export function useRemoveComment() {
  const queryClient = useQueryClient()
  const {mutate: removeComment, isLoading} = useMutation({
    mutationFn: (id) =>  deleteComment(id),
    onSuccess: () =>{
      queryClient.invalidateQueries({
        queryKey: ['comments']
      })
    }
  })
  return {removeComment, isLoading}
}

export function useRemoveReply() {
  const queryClient = useQueryClient()
  const {mutate: removeReply, isLoading} = useMutation({
    mutationFn: ({commentId, replyId}) =>  deleteReply({commentId, replyId}),
    onSuccess: () =>{
      queryClient.invalidateQueries({
        queryKey: ['comments']
      })
    }
  })
  return {removeReply, isLoading}
}
