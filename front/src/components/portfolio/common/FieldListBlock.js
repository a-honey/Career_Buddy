import { styled } from "styled-components";
import { mainColor } from "../../common/color";
import { EmptyBtn, FullBtn, FullRedBtn } from "../../common/Btns";
import { useContext, useState } from "react";
import { EditContext } from "../../../contexts/EditContext";
import { deleteDocument } from "../../../services/documentApi";

export const FieldListBlock = ({
  Children,
  fieldName,
  isEditing,
  setIsAdding,
}) => {
  return (
    <ListBlock>
      <h1 className="fieldName">{fieldName}</h1>
      <div>{Children}</div>
      {isEditing && (
        <EmptyBtn
          className="addingBtn"
          onClick={() => setIsAdding((isAdding) => !isAdding)}
        >
          +
        </EmptyBtn>
      )}
    </ListBlock>
  );
};

const FieldDocumentBlock = ({ setDatas, fieldName, Children, data }) => {
  const { isEditing } = useContext(EditContext);
  const [isDocumentEditing, setIsDocumentEditing] = useState(false);

  function handleClick(e) {
    e.preventDefault();

    deleteDocument(data.id, fieldName, setDatas);
  }
  return (
    <Block>
      {Children}
      {isEditing && (
        <div className="btns">
          {isDocumentEditing || (
            <>
              <FullBtn
                onClick={() => {
                  setIsDocumentEditing(true);
                }}
              >
                수정
              </FullBtn>
              <FullRedBtn onClick={handleClick}>삭제</FullRedBtn>
            </>
          )}
        </div>
      )}
    </Block>
  );
};

export default FieldDocumentBlock;

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
      background-color: ${mainColor};
      height: 5px;
      position: absolute;
      left: 0;
      width: 150px;
      bottom: 0;
    }
  }
`;

const Block = styled.div`
  border: solid 2px black;
  border-radius: 8px;
  margin: 10px 20px;
  display: flex;
  position: relative;
  padding: 5px 10px;
  .btns {
    display: flex;
    align-items: center;
    position: absolute;
    right: 20px;
    top: 0;
    bottom: 0;
    button {
      height: 50px;
      margin-right: 20px;
    }
  }
`;
