import styled from "@emotion/styled";

export const ParentContainer = styled.div` 
  /* height: ${({ height }) => height}; */
  /* overflow-x: hidden;
  overflow-y: auto; */
`;

export const Container = styled.div`
  background-color: #7fb3e159;
  //width: 100%;/
  max-width: 100vw;
  overflow: auto;
  
  max-height: 100vh;
  min-height: 80vh;
  //overflow: scroll;
  //margin: 5px;
  /* min-height: 100vh; */
  /* like display:flex but will allow bleeding over the window width */
  /* min-width: 100vw; */
  display: inline-flex;
`;
