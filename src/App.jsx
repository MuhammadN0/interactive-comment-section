import { createGlobalStyle } from 'styled-components';
import Comments from './comments/Comments';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useProject } from './context/ProjectContext';
import Modal from './modal/modal';
const GlobalStyles = createGlobalStyle`
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
:root{
  //Primary Colors
  --moderate-blue: hsl(238, 40%, 52%);
  --soft-blue: #5b5fc7;
  --soft-red: hsl(358, 79%, 66%);;
  --light-gray-blue: hsl(239, 57%, 85%);
  --pale-red: hsl(357, 100%, 86%);
  //Neutral Colors
  --dark-blue:hsl(212, 24%, 26%);
  --gray-blue:hsl(211, 10%, 45%);
  --light-gray:hsl(223, 19%, 93%);
  --very-light-gray:hsl(228, 33%, 97%);
  --white: hsl(0, 0%, 100%);
  //Font
  --paragraph-font-size: 16px;
}
body{
  font-family: 'Rubik', sans-serif;
  background-color: var(--very-light-gray);
}
button {
  cursor: pointer;
}
button:disabled{
  cursor: not-allowed;
  opacity: 0.7;
}
`;

function App() {
  const { isOpenModal } = useProject();
  return (
    <>
      {isOpenModal && <Modal />}
      <ReactQueryDevtools />
      <GlobalStyles />
      <Comments />
    </>
  );
}

export default App;
