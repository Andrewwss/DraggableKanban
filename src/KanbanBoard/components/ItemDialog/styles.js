import styled from "@emotion/styled";
import { borderRadius, grid } from "../../constants";
import { colors } from "@atlaskit/theme";

export const Container = styled.div`
  margin: ${grid}px;
  display: flex;
  flex-direction: column;
  min-height: 140px;
  min-width: 190px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: ${borderRadius}px;
  border-top-right-radius: ${borderRadius}px;
  background-color: ${({ isDragging }) =>
  isDragging ? colors.G50 : colors.N30};
  transition: background-color 0.2s ease;
  &:hover {
    background-color: ${colors.G50};
  }
`;
