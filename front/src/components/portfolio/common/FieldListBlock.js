import { styled } from "styled-components";
import { mainColor } from "../../common/color";
import { FullBtn, FullRedBtn } from "../../common/Btns";
import { useContext, useState } from "react";
import { UserStateContext } from "../../../App";
import { addData, deleteData, updateData } from "../../../services/api";

const FieldListBlock = ({
  isEditing,
  datas,
  fieldName,
  setDatas,
  userId,
  ShowItem,
  DocumentAddBtn,
}) => {
  return (
    <ListBlock>
      <h1 className="fieldName">{fieldName}</h1>
      {datas.map((data) => (
        <FieldDocumentBlock
          key={data._id}
          data={data}
          setDatas={setDatas}
          isEditing={isEditing}
          fieldName={fieldName}
          ShowItem={ShowItem}
        />
      ))}
      {isEditing && <DocumentAddBtn setDatas={setDatas} editId={userId} />}
    </ListBlock>
  );
};

const FieldDocumentBlock = ({
  setDatas,
  isEditing,
  fieldName,
  documentId,
  ShowItem,
  data,
}) => {
  const userState = useContext(UserStateContext);
  const [isDocumentEditing, setIsDocumentEditing] = useState(false);

  async function PostDocument(fieldName, content, setIsAdding) {
    try {
      await addData(userState.user.id, fieldName, content);
      setDatas((datas) => [...datas, content]);
      setIsAdding(false);
    } catch (err) {
      alert(err);
    }
  }
  // isEditing이 true 이다 => Userstate가 본인이다.
  async function UpdateDocument(dataId, fieldName, content) {
    try {
      await updateData(documentId, fieldName, content);

      setDatas((datas) => {
        const olddatas = datas.filter(
          (origindata) => origindata._id !== documentId
        );
        return [...olddatas, content];
      });

      setIsDocumentEditing(false);
    } catch (err) {
      alert(`EDUCATION 데이터 PUT 요청 실패: ${err}`);
    }
  }

  const DeleteDocument = async (e) => {
    e.preventDefault();

    try {
      await deleteData(documentId, fieldName);
      setDatas((datas) => {
        const deleteddatas = datas.filter(
          (origin) => origin._id !== documentId
        );
        return deleteddatas;
      });
    } catch (err) {
      alert("데이터 삭제 실패");
    }
  };
  //isDocu
  return (
    <Block key={documentId}>
      <ShowItem
        data={data}
        fieldName={fieldName}
        isDocumentEditing={isDocumentEditing}
        setIsDocumentEditing={setIsDocumentEditing}
        UpdateDocument={UpdateDocument}
        PostDocument={PostDocument}
      />
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
              <FullRedBtn onClick={DeleteDocument}>삭제</FullRedBtn>
            </>
          )}
        </div>
      )}
    </Block>
  );
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
