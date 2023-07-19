import { styled } from "styled-components";

const PostBlock = ({ children }) => {
  return <StyledBlock>{children}</StyledBlock>;
};

export default PostBlock;

const StyledBlock = styled.div`
  background-color: pink;
  width: 200px;
  height: 400px;
`;
