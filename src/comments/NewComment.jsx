import styled from 'styled-components';
import { useUser } from './useUser';
import { useForm } from 'react-hook-form';
import { useNewComment } from './useNewComment';
import { serverTimestamp } from 'firebase/firestore';
import { useProject } from '../context/ProjectContext';
import { useNewReply } from './useNewReply';
import { useEditComment, useEditReply } from './useEditComment';

const Form = styled.form`
  background-color: #fff;
  width: 100%;
  display: flex;
  gap: 1rem;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  position: relative;
  @media (max-width: 800px){
    padding-bottom: 3rem;
  }
  & img {
    max-width: 2.7rem;
    align-self: flex-start;
    @media (max-width: 800px){
      position: absolute;
      max-width: 1.7rem;
      bottom: 15px;
    }
  }
  & > div {
    flex: 1;
    @media(max-width: 800px){
      display: flex;
      gap: 6px;
      flex-direction: column-reverse;
    }
    & > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 10px;
      & > p {
        font-size: 0.8rem;
      }
      & > button {
        background-color: transparent;
        border: 1px solid var(--moderate-blue);
        border-radius: 3px;
        padding: 3px 6px;
        color: var(--moderate-blue);
        font-weight: 700;
        cursor: pointer;
      }
    }
  }
  & textarea {
    min-height: 6rem;
    border: 1px solid var(--light-gray);
    padding: 0.5rem 1rem;
    width: 100%;
    resize: none;
    border-radius: 1rem;
    &:active,
    &:focus {
      outline: none;
    }
  }
  & > button {
    align-self: flex-start;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.3rem;
    background-color: var(--moderate-blue);
    color: #fff;
    font-weight: 700;
    cursor: pointer;
    transition: 0.3s;
    @media (max-width: 800px){
      position: absolute;
      bottom: 15px;
      right: 32px;
    }
    &:hover {
      background-color: var(--soft-blue);
    }
  }
`;

function NewComment() {
  const { user, isLoading } = useUser();
  const { createNewComment, isLoading: isCreating } = useNewComment();
  const { createReply, isLoading: isCreatingReply } = useNewReply();
  const { editComment, isLoading: isEditingComment } = useEditComment();
  const {editReply, iseLoading: isEditingReply} = useEditReply()
  const {
    isReplying,
    replyingId,
    setIsReplying,
    setReplyingId,
    formRef,
    isEditing,
    editingId,
    setEditingId,
    setIsEditing,
  } = useProject();
  const { register, handleSubmit, reset } = useForm();

  function onSubmit(data) {
    if (isReplying) {
      const newReply = {
        ...data,
        createdAt: serverTimestamp(),
        score: 0,
        user,
        replyingTo: replyingId.user.username,
      };
      createReply(
        { commentId: replyingId.id, reply: newReply },
        {
          onSettled: () => {
            reset();
            setIsReplying(false);
            setReplyingId({});
          },
        }
      );
    } else if (isEditing) {
      if (editingId.isComment) {
        const updatingData = {
          content: data.content,
        };
        editComment(
          { commentId: editingId.id, updatingData },
          {
            onSettled: () => {
              reset();
              setIsEditing(false);
              setEditingId({});
            },
          }
        );
      } else {
        const updatingData = {
          content: data.content,
        };
        editReply(
          { commentId: editingId.commentId, replyId: editingId.id, updatingData },
          {
            onSettled: () => {
              reset();
              setIsEditing(false);
              setEditingId({});
            },
          }
        );
      }
    } else {
      const newComment = {
        ...data,
        createdAt: serverTimestamp(),
        score: 0,
        user,
        likedByYou:false,
        dislikedByYou: false,
      };
      createNewComment(newComment, {
        onSettled: () => reset(),
      });
    }
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <img src={user?.image?.webp} alt={`${user.username}'s avatar`} />
      <div>
        <textarea
          defaultValue={isEditing ? editingId.content : ''}
          id="content"
          placeholder="Add a comment"
          {...register('content', {
            required: 'This field is required',
          })}
        />
        {(isReplying || isEditing) && (
          <div>
            <p>
              {isReplying
                ? `Replying to ${replyingId.user.username}`
                : 'You are currently editing your comment'}
            </p>
            <button
              onClick={(e) => {
                e.preventDefault();
                setReplyingId({});
                setIsReplying(false);
                setEditingId({});
                setIsEditing(false);
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
      <button ref={formRef} disabled={isCreating || isCreatingReply|| isLoading || isEditingReply || isEditingComment}>
        {isEditing ? 'Edit' : 'Send'}
      </button>
    </Form>
  );
}

export default NewComment;
