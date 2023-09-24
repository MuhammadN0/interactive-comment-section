import { createContext, useContext, useRef, useState } from 'react';

const ProjectContext = createContext();

export function ProjectContextProvider({ children }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState({});
  const [isReplying, setIsReplying] = useState(false);
  const [replyingId, setReplyingId] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [modalOnClick, setModalOnClick] = useState({})
  const formRef = useRef()
  return (
    <ProjectContext.Provider
      value={{
        isEditing,
        setEditingId,
        setIsEditing,
        editingId,
        isReplying,
        setIsReplying,
        replyingId,
        setReplyingId,
        formRef,
        isOpenModal,
        setIsOpenModal,
        modalOnClick,
        setModalOnClick
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);
  if (context === undefined)
    throw new Error('Context was used outside its limits');
  return context;
}
