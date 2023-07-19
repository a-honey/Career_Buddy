import { styled } from "styled-components";
import { mainColor } from "../../common/color";

const AddBlock = ({ children }) => {
  return <Block>{children}</Block>;
};

export default AddBlock;

const Block = styled.div`
  border: solid 1px ${mainColor};
  border-radius: 8px;
  margin: 10px 20px;
  display: flex;
  position: relative;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0.5, 0.5, 0.8, 0.5);
`;
