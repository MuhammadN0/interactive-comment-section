import styled from "styled-components"
import Comment from "./Comment"
import NewComment from "./NewComment"
import { useComments } from "./useComments"
import { useUser } from "./useUser"
import DivWithSpinner from "../ui/Spinner"

const StyledComments = styled.div`
width: 90%;
margin: auto;
min-height: 100vh;
padding: 3rem 1rem;
display: flex;
flex-direction: column;
align-items: center;
justify-content: flex-start;
position: relative;
@media (min-width: 800px) {
  width: 725px;
}

`
function Comments() {
  const {comments, isLoading} = useComments()
  const {isLoading:isLoadingUser} = useUser()
  if(isLoading || isLoadingUser) return <DivWithSpinner />
  return (
    <StyledComments>
      {comments.map(comment => <Comment key={comment.id} comment={comment} />)}
      <NewComment/>
    </StyledComments>
  )
}

export default Comments
