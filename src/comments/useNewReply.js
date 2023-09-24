import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReplyOnComment } from "../services/fetchApi";

export function useNewReply(){
  const queryClient = useQueryClient()
  const {mutate: createReply, isLoading} = useMutation({
    mutationFn: ({commentId, reply}) => createReplyOnComment({commentId, reply}),
    onSuccess: () =>{
      queryClient.invalidateQueries({
        queryKey:['comments']
      })
    }
  })
  return {createReply, isLoading}
}