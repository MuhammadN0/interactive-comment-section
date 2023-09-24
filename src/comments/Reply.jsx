import styled from 'styled-components';
import {
  Button,
  ButtonGroup,
  Info,
  Mention,
  P,
  Row,
  StyledCommentHeader,
  You,
} from './Comment';
import CommentSide from './CommentSide';
import { useUser } from './useUser';
import { differenceInDays } from 'date-fns';
import { useProject } from '../context/ProjectContext';

const StyledReply = styled.div`
  background-color: #fff;
  padding: 1.5rem 1rem;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  display: flex;
  gap: 1rem;
  width: 88%;
  align-self: flex-end;
  position: relative;
  @media (max-width: 800px) {
    flex-direction: column-reverse;
    position: relative;
  }
  &::before {
    content: '';
    width: 4px;
    height: calc(100% + 1rem);
    background-color: var(--light-gray);
    position: absolute;
    left: -20px;
    top: -16px;
  }
`;

function Reply({ reply, commentId }) {
  const { user, isLoading } = useUser();
  const {
    setReplyingId,
    setIsReplying,
    formRef,
    setIsEditing,
    setEditingId,
    setIsOpenModal,
    setModalOnClick,
    isReplying,
    isEditing,
  } = useProject();
  const { id: replyId, isLikedByYou, isDislikedByYou } = reply;
  const timestampMilliseconds = isNaN(
    reply?.createdAt?.seconds * 1000 + reply?.createdAt?.nanoseconds / 1e6
  )
    ? Date.now()
    : reply?.createdAt?.seconds * 1000 + reply?.createdAt?.nanoseconds / 1e6;
  const date = new Date(timestampMilliseconds);
  const dateDiff = differenceInDays(new Date(), date);
  if (isLoading) return <p>IS LOADING</p>;
  return (
    <StyledReply key={reply.id}>
      <CommentSide
        commentId={commentId}
        replyId={replyId}
        isComment={false}
        score={reply.score}
        isLikedByYou={isLikedByYou}
        isDislikedByYou={isDislikedByYou}
      />
      <Row>
        <StyledCommentHeader>
          <Info>
            <img
              src={reply.user.image.webp}
              alt={`avatar of ${reply.user.username}`}
            />
            <span>{reply.user.username}</span>
            {reply.user.username === user.username && <You>You</You>}
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
          {reply.user.username === user.username ? (
            <ButtonGroup>
              <Button
                className="edit"
                onClick={() => {
                  if (isReplying) {
                    setIsReplying(false);
                    setReplyingId({});
                  }
                  setEditingId({ ...reply, commentId, isComment: false });
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
                  setModalOnClick({ commentId, replyId });
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
                setReplyingId({ ...reply, id: commentId });
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
        <P>
          <Mention>@{reply.replyingTo}</Mention>
          {reply.content}
        </P>
      </Row>
    </StyledReply>
  );
}

export default Reply;
