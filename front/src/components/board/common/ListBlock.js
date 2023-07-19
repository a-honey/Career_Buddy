import { styled } from "styled-components";

const ListBlock = ({ children }) => {
  return <StyledListBlock>{children}</StyledListBlock>;
};

export default ListBlock;

const StyledListBlock = styled.div`
  background-color: yellow;
  width: 1000px;
  height: 1000px;
`;
