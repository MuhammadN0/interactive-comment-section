import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { useRemoveComment, useRemoveReply } from '../comments/useRemoveComment';
import { useProject } from '../context/ProjectContext';
import { useCloseModal } from '../hooks/useCloseModal';

export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99999999999;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledModal = styled.div`
  background-color: var(--white);
  border-radius: 0.7rem;
  padding: 2rem;
  width: 400px;
  color: var(--dark-blue);
  @media (max-width: 800px) {
    width: 300px;
  }
  & > h3 {
    font-weight: 500;
    margin-bottom: 1rem;
  }
  & > p {
    color: var(--gray-blue);
    margin-bottom: 0.8rem;
  }
  & > div {
    display: flex;
    justify-content: space-evenly;
    & > button {
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 0.3rem;
      color: var(--white);
      background-color: var(--gray-blue);
      letter-spacing: 0;
      font-weight: 700;
      @media (max-width: 800px) {
        width: 300px;
      }
      &.del {
        background-color: var(--soft-red);
      }
    }
  }
`;
function Modal() {
  const { removeComment} = useRemoveComment();
  const { removeReply} = useRemoveReply();
  const { modalOnClick, setIsOpenModal, setModalOnClick } = useProject();
  const { commentId, replyId } = modalOnClick;
  const ref = useCloseModal(function(){
    setIsOpenModal(false)
    setModalOnClick({})
  })
  return createPortal(
    <Overlay id="overlay">
      <StyledModal ref={ref}>
        <h3>Delete Comment</h3>
        <p>
          Are you sure you want to delete your comment? This will remove the
          comment and can{"'"}t be undone.
        </p>
        <div>
          <button
            onClick={() => {
              setIsOpenModal(false);
              setModalOnClick({});
            }}
          >
            NO, CANCEL
          </button>
          <button
            className="del"
            onClick={() => {
              if (!replyId) {
                removeComment(commentId);
                setIsOpenModal(false);
                setModalOnClick({});
              } else {
                removeReply({ commentId, replyId });
                setIsOpenModal(false);
                setModalOnClick({});
              }
            }}
          >
            YES, DELETE
          </button>
        </div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

export default Modal;
