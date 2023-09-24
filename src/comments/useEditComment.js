import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateComment, updateReply } from "../services/fetchApi";

export function useEditComment() {
  const queryClient = useQueryClient()
  const {mutate:editComment,isLoading} = useMutation({
    mutationFn: ({commentId, updatingData}) => updateComment({commentId, updatingData}),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['comments']
      })
    }
  })
  return {editComment, isLoading}
}

export function useEditReply() {
  const queryClient = useQueryClient()
  const {mutate:editReply,isLoading} = useMutation({
    mutationFn: ({commentId,replyId, updatingData}) => updateReply({commentId,replyId, updatingData}),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['comments']
      })
    }
  })
  return {editReply, isLoading}
}