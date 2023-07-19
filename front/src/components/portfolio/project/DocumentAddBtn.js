import { useState } from "react";
import { EmptyBtn, FullBtn } from "../../common/Btns";
import { addData } from "../../../services/api";

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
          marginLeft: "45px",
          width: "90%",
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

    const requiredFields = ["institution", "status", "entryDate"];

    for (const fieldName of requiredFields) {
      if (content[fieldName].trim() === "") {
        alert(`${fieldName} 입력란이 비어있습니다.`);
        return;
      }
    }

    try {
      await addData(editId, "education", content);
      setDatas((datas) => [...datas, content]);
      setIsAdding(false);
    } catch (err) {
      alert(err);
    }
  }

  return (
    <form onSubmit={handleAddSubmit} className="input-edit">
      <div className="input-edit-content">
        <div className="education-main">
          <label>프로젝트명</label>
          <input
            type="text"
            placeholder="프로젝트명"
            value={content?.title}
            onChange={(e) => handleChange(e, "institution")}
          />
          <label>소속 단체</label>
          <input
            type="text"
            placeholder="단체 프로젝트일 경우 입력해주세요"
            value={content?.organization}
            onChange={(e) => handleChange(e, "institution")}
          />
        </div>
        <div className="education-sub">
          <label>시작일</label>
          <input
            type="date"
            placeholder="시작일"
            value={content?.startDate}
            onChange={(e) => handleChange(e, "entryDate")}
          />
          <label>종료일</label>
          <input
            type="date"
            placeholder="종료일"
            value={content?.endDate}
            onChange={(e) => handleChange(e, "gradDate")}
          />
          <label>비고</label>
          <input
            type="text"
            placeholder="비고"
            value={content?.description}
            onChange={(e) => handleChange(e, "grade")}
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
  );
};
