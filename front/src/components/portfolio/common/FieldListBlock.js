import { styled } from "styled-components";

const FieldListBlock = ({ children }) => {
  return <ListBlock>{children}</ListBlock>;
};

export default FieldListBlock;

const ListBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 20px;
  border-radius: 15px;
  margin: 30px;
  position: relative;
  .fieldName {
    font-size: 30px;
    font-weight: 700;
    text-transform: uppercase;
    position: relative;
    padding: 10px 0;
    &::after {
      content: "";
      background-color: rgb(115, 83, 234);
      height: 5px;
      position: absolute;
      left: 0;
      width: 150px;
      bottom: 0;
    }
  }
`;
