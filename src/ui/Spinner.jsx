import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const Spinner = styled.div`
  margin: auto;
  width: 6.4rem;
  aspect-ratio: 1;
  border-radius: 50%;
  position: absolute;
  background: radial-gradient(farthest-side, var(--moderate-blue) 94%, #0000)
      top/10px 10px no-repeat,
    conic-gradient(#0000 30%, var(--moderate-blue));
  -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 10px), #000 0);
  animation: ${rotate} 1.5s infinite linear;
`;
const StyledDiv = styled.div`
width: 100%;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
`
function DivWithSpinner () {
  return <StyledDiv>
    <Spinner />
  </StyledDiv>
}
export default DivWithSpinner;
