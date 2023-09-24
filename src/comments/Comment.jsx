import styled from 'styled-components';
import CommentSide from './CommentSide';
import { useUser } from './useUser';
import Reply from './Reply';
import { differenceInDays } from 'date-fns';
import { useProject } from '../context/ProjectContext';

const StyledComment = styled.div`
  background-color: #fff;
  padding: 1.5rem 1rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  display: flex;
  gap: 1rem;
  width: 100%;
  @media (max-width: 800px) {
    flex-direction: column-reverse;
    position: relative;
  }
`;
export const StyledCommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const Info = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.7rem;
  font-weight: 700;
  & img {
    max-width: 1.7rem;
  }
  & span:last-of-type {
    color: var(--gray-blue);
    font-weight: 400;
  }
`;
export const Button = styled.button`
  border: none;
  background-color: transparent;
  font-weight: 700;
  color: var(--moderate-blue);
  font-size: 0.8rem;
  display: flex;
  gap: 0.3rem;
  align-items: center;
  cursor: pointer;
  @media (max-width: 800px) {
    position: absolute;
    right: 21px;
    bottom: 28px;
  }
  &.delete {
    color: var(--pale-red);
  }
`;
export const ButtonGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  @media (max-width: 800px) {
    position: absolute;
    right: 21px;
    bottom: 28px;
  }
  & > button {
    @media (max-width: 800px) {
      position: static;
    }
  }
`;
export const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
`;
export const P = styled.p`
  color: var(--gray-blue);
  font-size: var(--paragraph-font-size);
`;

export const Mention = styled.span`
  font-weight: 700;
  color: var(--moderate-blue);
  cursor: pointer;
  margin-right: 12px;
`;
export const You = styled.span`
  color: #fff;
  font-weight: 400;
  background-color: var(--moderate-blue);
  padding: 2.5px 5px;
  font-size: 10px;
  border-radius: 3px;
`;

function Comment({ comment }) {
  const { user } = useUser();
  const {
    setReplyingId,
    setIsReplying,
    formRef,
    setIsEditing,
    setEditingId,
    setIsOpenModal,
    setModalOnClick,
    isEditing,
  } = useProject();
  const { id: commentId, isLikedByYou, isDislikedByYou } = comment;
  const timestampMilliseconds = isNaN(
    comment?.createdAt?.seconds * 1000 + comment?.createdAt?.nanoseconds / 1e6
  )
    ? Date.now()
    : comment?.createdAt?.seconds * 1000 +
      comment?.createdAt?.nanoseconds / 1e6;
  const date = new Date(timestampMilliseconds);
  const dateDiff = differenceInDays(new Date(), date);

  return (
    <>
      <StyledComment>
        <CommentSide
          commentId={commentId}
          isComment={true}
          score={comment.score}
          isLikedByYou={isLikedByYou}
          isDislikedByYou={isDislikedByYou}
        />
        <Row>
          <StyledCommentHeader>
            <Info>
              <img
                src={comment.user.image.webp}
                alt={`avatar of ${comment.user.username}`}
              />
              <span>{comment.user.username}</span>
              {comment.user.username === user.username && <You>You</You>}
              <span>
                {dateDiff < 1
                  ? 'Today'
                  : dateDiff < 7
                  ? `${dateDiff} ${dateDiff === 1 ? 'day' : 'days'} ago`
                  : dateDiff < 30
                  ? `${Math.floor(dateDiff / 7)} ${
                      Math.floor(dateDiff / 7) === 1 ? 'week' : 'weeks'
                    } Ago`
                  : dateDiff < 365
                  ? `${Math.floor(dateDiff / 30)}  ${
                      Math.floor(dateDiff / 30) === 1 ? 'month' : 'months'
                    } ago`
                  : `${Math.floor(dateDiff / 365)}  ${
                      Math.floor(dateDiff / 365) === 1 ? 'year' : 'years'
                    } years ago`}
              </span>
            </Info>
            {comment.user.username === user.username ? (
              <ButtonGroup>
                <Button
                  className="edit"
                  onClick={() => {
                    if (setIsReplying) {
                      setIsReplying(false);
                      setReplyingId({});
                    }
                    setEditingId({ ...comment, isComment: true });
                    setIsEditing(true);
                    formRef.current.focus();
                  }}
                >
                  <span>
                    <img src="./images/icon-edit.svg" alt="edit-icon" />
                  </span>
                  Edit
                </Button>
                <Button
                  className="delete"
                  onClick={() => {
                    setIsOpenModal(true);
                    setModalOnClick({ commentId });
                  }}
                >
                  <span>
                    <img src="./images/icon-delete.svg" alt="delete-icon" />
                  </span>
                  Delete
                </Button>
              </ButtonGroup>
            ) : (
              <Button
                onClick={() => {
                  if (isEditing) {
                    setIsEditing(false);
                    setEditingId({});
                  }
                  setReplyingId(comment);
                  setIsReplying(true);
                  formRef.current.focus();
                }}
              >
                <span>
                  <img src="./images/icon-reply.svg" alt="reply-icon" />
                </span>
                Reply
              </Button>
            )}
          </StyledCommentHeader>
          <P>{comment.content}</P>
        </Row>
      </StyledComment>

      {comment.replies?.map((reply) => (
        <Reply commentId={comment.id} key={reply.id} reply={reply} />
      ))}
    </>
  );
}

export default Comment;
