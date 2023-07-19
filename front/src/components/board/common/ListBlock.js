import { styled } from "styled-components";

const ListBlock = ({ children }) => {
  return <StyledListBlock>{children}</StyledListBlock>;
};

export default ListBlock;

const StyledListBlock = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  width: 100%;
  height: 1000px;
  position: relative;
`;
