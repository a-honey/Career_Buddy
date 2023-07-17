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
    institution: "",
    degree: "학사",
    major: "",
    status: "졸업",
    entryDate: "",
    gradDate: "",
    grade: "",
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
      setDatas((datas) => [content, ...datas]);
      setIsAdding(false);
    } catch (err) {
      alert(err);
    }
  }

  return (
    <form onSubmit={handleAddSubmit} className="input-edit">
      <div className="input-edit-content">
        <div className="education-main">
          <label>교육기관</label>
          <input
            type="text"
            placeholder="교육기관"
            value={content?.institution}
            onChange={(e) => handleChange(e, "institution")}
          />
          <label>전공</label>
          <input
            type="text"
            placeholder="전공"
            value={content?.major}
            onChange={(e) => handleChange(e, "major")}
          />
          <label>학위</label>
          <select
            value={content.degree || "학사"}
            onChange={(e) => handleChange(e, "degree")}
          >
            <option value="학사">학사</option>
            <option value="석사">석사</option>
            <option value="박사">박사</option>
          </select>
          <label>상태</label>
          <select
            value={content.status || "졸업"}
            onChange={(e) => handleChange(e, "status")}
          >
            <option value="재학">재학</option>
            <option value="휴학">휴학</option>
            <option value="졸업">졸업</option>
            <option value="졸업예정">졸업예정</option>
          </select>
        </div>
        <div className="education-sub">
          <label>입학년월</label>
          <input
            type="date"
            placeholder="입학년월"
            value={content?.entryDate}
            onChange={(e) => handleChange(e, "entryDate")}
          />
          <label>졸업년월</label>
          <input
            type="date"
            placeholder="졸업년월"
            value={content?.gradDate}
            onChange={(e) => handleChange(e, "gradDate")}
          />
          <label>학점</label>
          <input
            type="text"
            placeholder="학점"
            value={content?.grade}
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
