import {colors} from "@atlaskit/theme";
import styled from "@emotion/styled";
import { borderRadius, grid } from "../../constants";

export const Container = styled.div`
  position: relative;
  border-radius: ${borderRadius}px;
  background-color: white;
  border: 1px solid #b6b6b6;
  box-shadow: ${({isDragging}) => isDragging ? `2px 2px 1px ${colors.N70}` : "none"};
  padding: ${grid}px;
  min-height: 40px;
  margin-bottom: ${grid}px;
  user-select: none;
  
  /* anchor overrides */
  color: ${colors.N900};

  &:hover,
  &:active {
    color: ${colors.N900};
    text-decoration: none;
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }

  /* flexbox */
  display: flex;
`;

export const Content = styled.div`
  /* flex child */
  flex-grow: 1;
  /*
    Needed to wrap text in ie11
    https://stackoverflow.com/questions/35111090/why-ie11-doesnt-wrap-the-text-in-flexbox
  */
  flex-basis: 100%;
  /* flex parent */
  display: flex;
  flex-direction: column;
`;

export const Footer = styled.div`
  display: flex;
  margin-top: ${grid}px;
  align-items: center;
`;
