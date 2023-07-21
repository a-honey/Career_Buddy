import { useState } from "react";
import { EmptyBtn, FullBtn } from "../../common/Btns";
import { addData } from "../../../services/api";
import AddBlock from "../common/AddBlock";

const DocumentAddBtn = ({ setDatas, editId }) => {
  // isEditing 상태가 되면 각 education 필드에 add 버튼 생성
  const [isAdding, setIsAdding] = useState(false);
  return (
    <div>
      <EmptyBtn
        className="addingBtn"
        onClick={() => setIsAdding((isAdding) => !isAdding)}
        style={{
          marginTop: "30px",
          width: "100%",
        }}
      >
        +
      </EmptyBtn>
      {isAdding && (
        <DocumentAddItem
          setDatas={setDatas}
          setIsAdding={setIsAdding}
          editId={editId}
        />
      )}
    </div>
  );
};

export default DocumentAddBtn;

//add 버튼 클릭 시 데이터 입력 폼 생성
const DocumentAddItem = ({ setIsAdding, setDatas, editId }) => {
  // newData를 state에 담아서 관리(index.js 중복 사용을 위해 명칭통일함)
  const [content, setContent] = useState({
    title: "",
    organization: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  function handleChange(e, fieldName) {
    setContent((prevContent) => ({
      ...prevContent,
      [fieldName]: e.target.value,
    }));
  }

  async function handleAddSubmit(e) {
    e.preventDefault();
    //setDatas에 데이터 추가

    const requiredFields = ["title", "startDate", "endDate"];

    for (const fieldName of requiredFields) {
      if (content[fieldName].trim() === "") {
        alert(`${fieldName} 입력란이 비어있습니다.`);
        return;
      }
    }

    try {
      await addData(editId, "project", content);
      setDatas((datas) => [...datas, content]);
      setIsAdding(false);
    } catch (err) {
      alert(err);
    }
  }

  return (
    <AddBlock>
      <form onSubmit={handleAddSubmit} className="input-edit">
        <div className="input-edit-content">
          <div className="education-main">
            <label>프로젝트명</label>
            <input
              type="text"
              placeholder="프로젝트명"
              value={content?.title}
              onChange={(e) => handleChange(e, "title")}
            />
            <label>소속 단체</label>
            <input
              type="text"
              placeholder="단체 프로젝트일 경우 입력해주세요"
              value={content?.organization}
              onChange={(e) => handleChange(e, "organization")}
            />
          </div>
          <div className="education-sub">
            <label>시작일</label>
            <input
              type="date"
              placeholder="시작일"
              value={content?.startDate}
              onChange={(e) => handleChange(e, "startDate")}
            />
            <label>종료일</label>
            <input
              type="date"
              placeholder="종료일"
              value={content?.endDate}
              onChange={(e) => handleChange(e, "endDate")}
            />
            <label>비고</label>
            <input
              type="text"
              placeholder="비고"
              value={content?.description}
              onChange={(e) => handleChange(e, "description")}
            />
          </div>
        </div>
        <div className="input-edit-btns">
          <FullBtn type="submit">추가</FullBtn>
          <EmptyBtn type="button" onClick={() => setIsAdding(false)}>
            취소
          </EmptyBtn>
        </div>
      </form>
    </AddBlock>
  );
};
