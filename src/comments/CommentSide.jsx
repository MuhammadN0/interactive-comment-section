import { useState } from 'react';
import styled from 'styled-components';
import { useEditComment, useEditReply } from './useEditComment';

const StyledCommentSide = styled.div`
  background-color: var(--light-gray);
  padding: 0.4rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 5.5rem;
  width: 2.5rem;
  border-radius: 0.4rem;
  @media(max-width: 800px){
    flex-direction:row;
    height: 1.5rem;
    width: 5rem;
  }
  & p {
    color: var(--moderate-blue);
    font-weight: 700;
    align-self: center;
  }
`;
const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 1.3rem;
  border: none;
  cursor: pointer;
  background-color: transparent;
`;
function CommentSide({
  score,
  commentId,
  replyId,
  isComment,
  isLikedByYou = false,
  isDislikedByYou = false,
}) {
  const [plusIsTriggered, setPlusIsTriggered] = useState(isLikedByYou);
  const [minusIsTriggered, setMinusIsTriggered] = useState(isDislikedByYou);
  const [count, setCount] = useState(score);
  const { editComment, isLoading } = useEditComment();
  const {editReply, isLoading:isEditingReply} = useEditReply()
  function handlePlus() {
    minusIsTriggered ? setMinusIsTriggered(false) : setPlusIsTriggered(true);
    setCount((count) => count + 1);
    if (isComment) {
      if (!plusIsTriggered && !minusIsTriggered) {
        const newData = {
          score: count + 1 ,
          isLikedByYou: true,
          isDislikedByYou: false,
        };
        editComment({ commentId, updatingData: newData });
      } else {
        const newData = {
          score: count + 1,
          isLikedByYou: false,
          isDislikedByYou: false,
        };
        editComment({ commentId, updatingData: newData });
      }
    } else {
      if (!plusIsTriggered && !minusIsTriggered) {
        const newData = {
          score: count + 1 ,
          isLikedByYou: true,
          isDislikedByYou: false,
        };
        editReply({ commentId, updatingData: newData, replyId });
      } else {
        const newData = {
          score: count + 1,
          isLikedByYou: false,
          isDislikedByYou: false,
        };
        editReply({ commentId, updatingData: newData, replyId });
      }
    }
  }

  function handleMinus() {
    plusIsTriggered ? setPlusIsTriggered(false) : setMinusIsTriggered(true);
    setCount((count) => count - 1);
    if (isComment) {
      if (!plusIsTriggered && !minusIsTriggered) {
        const newData = {
          score: count - 1 ,
          isLikedByYou: false,
          isDislikedByYou: true,
        };
        editComment({ commentId, updatingData: newData });
      } else {
        const newData = {
          score: count - 1,
          isLikedByYou: false,
          isDislikedByYou: false,
        };
        editComment({ commentId, updatingData: newData });
      }
    } else {
      if (!plusIsTriggered && !minusIsTriggered) {
        const newData = {
          score: count - 1 ,
          isLikedByYou: false,
          isDislikedByYou: true,
        };
        editReply({ commentId, updatingData: newData, replyId });
      } else {
        const newData = {
          score: count - 1,
          isLikedByYou: false,
          isDislikedByYou: false,
        };
        editReply({ commentId, updatingData: newData, replyId });
      }
    }
  }

  return (
    <StyledCommentSide>
      <Button disabled={plusIsTriggered || isLoading || isEditingReply} onClick={handlePlus}>
        <img src="images/icon-plus.svg" alt="plus" />
      </Button>
      <p>{count}</p>
      <Button disabled={minusIsTriggered || isLoading || isEditingReply} onClick={handleMinus}>
        <img src="images/icon-minus.svg" alt="plus" />
      </Button>
    </StyledCommentSide>
  );
}

export default CommentSide;
