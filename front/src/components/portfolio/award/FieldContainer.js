import { useContext, useState } from "react";
import FieldDocumentBlock from "../common/FieldDocumentBlock";
import FieldListBlock from "../common/FieldListBlock";
import { EditContext } from "../../../contexts/EditContext";
import DocumentAddBtn from "./DocumentAddBtn";
import { EmptyBtn, FullBtn } from "../../common/Btns";
import { updateData } from "../../../services/api";

const FieldContainer = ({ datas, setDatas }) => {
  const { isEditing } = useContext(EditContext);

  return (
    <FieldListBlock>
      <h1 className="fieldName">award</h1>
      {datas.map((data) => (
        <DocumentItem key={data._id} data={data} setDatas={setDatas} />
      ))}
      {isEditing && <DocumentAddBtn setDatas={setDatas} />}
    </FieldListBlock>
  );
};

export default FieldContainer;

const DocumentItem = ({ data, setDatas }) => {
  const { isEditing } = useContext(EditContext);

  const [isDocumentEditing, setIsDocumentEditing] = useState(false);

  //해당 filed Schemas State에 저장하기
  const [title, setTitle] = useState(data?.title);

  // 수정 버튼 클릭시 데이터 업데이트
  async function handlePutSubmit(e) {
    e.preventDefault();

    //해당 filed Schemas newDocument에 담기
    const newDocument = {
      title,
    };

    try {
      //해당 filedName으로 요청 보내기
      await updateData(data._id, "award", newDocument);
    } catch {
      return;
    }

    setDatas((datas) => {
      const olddatas = datas.filter(
        (origindata) => origindata._id !== data._id
      );
      return [olddatas, newDocument];
    });

    setIsDocumentEditing(false);
  }

  // 초기화 시 데이터 다시 불러오기
  async function handleGetDocument(e) {
    e.preventDefault();

    // 저장한 데이터를 다시 보여주기
    setTitle(data?.title);
  }

  // 해당 field 저장한 State 출력하기, 추후 클래스명 변경 필요
  if (isDocumentEditing && isEditing) {
    return (
      <FieldDocumentBlock
        fieldName={"award"}
        documentId={data?._id}
        isDocumentEditing={isDocumentEditing}
        setIsDocumentEditing={setIsDocumentEditing}
      >
        <form onSubmit={handlePutSubmit}>
          <div className="input-edit-content">
            <div className="education-main">
              <label>수상명</label>
              <input
                type="text"
                placeholder="수상명"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="input-edit-btns">
            <FullBtn type="submit">수정</FullBtn>
            <EmptyBtn onClick={handleGetDocument}>초기화</EmptyBtn>
            <FullBtn
              onClick={() => {
                setIsDocumentEditing(false);
              }}
            >
              취소
            </FullBtn>
          </div>
        </form>
      </FieldDocumentBlock>
    );
  } else {
    return (
      // IsEditing 상태 아닐때 응답받은 Field Document 보여주기
      <FieldDocumentBlock
        setDatas={setDatas}
        documentId={data?._id}
        fieldName={"education"}
        isDocumentEditing={isDocumentEditing}
        setIsDocumentEditing={setIsDocumentEditing}
      >
        <div className="field-main-content">{data?.title}</div>
      </FieldDocumentBlock>
    );
  }
};
