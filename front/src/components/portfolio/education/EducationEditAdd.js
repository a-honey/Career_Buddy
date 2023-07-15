import { useContext, useState } from "react";
import { EmptyBtn, FullBtn } from "../../common/Btns";
import { addData } from "../../../services/api";
import { EducationContext } from "../../../contexts/EducationContext";
import { UserStateContext } from "../../../App";

const EducationEdit = () => {
  const [isAdding, setIsAdding] = useState(false);
  return (
    <div>
      <EmptyBtn className="addingBtn" onClick={() => setIsAdding(true)}>
        +
      </EmptyBtn>
      {isAdding && <EducationAddItem setIsAdding={setIsAdding} />}
    </div>
  );
};

export default EducationEdit;

const EducationAddItem = ({ setIsAdding }) => {
  const [institution, setInstitution] = useState("");
  const [degree, setDegree] = useState("");
  const [major, setMajor] = useState("");
  const [status, setStatus] = useState("");
  const [entryDate, setEntryDate] = useState("");
  const [gradDate, setGradDate] = useState("");
  const [grade, setGrade] = useState("");

  const userState = useContext(UserStateContext);

  const { educationDocuments, setEducationDocuments } =
    useContext(EducationContext);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    //setDatas에 데이터 추가
    if (
      institution === "" ||
      degree === "" ||
      status === "" ||
      major === "" ||
      entryDate === "" ||
      gradDate === ""
    ) {
      return alert("공백 금지");
    }
    const newDocument = {
      //mockData의 삭제를 위한 _ID
      _id: `mockdata${educationDocuments.length * Math.random()}`,
      institution,
      degree,
      status,
      major,
      entryDate,
      gradDate,
      grade,
    };
    console.log(newDocument);
    await addData(userState.user.id, "education", newDocument);
    setEducationDocuments((datas) => [...datas, newDocument]);
    console.log("교육필드에서 postData함수를 실행");
  };

  return (
    <form onSubmit={handleAddSubmit} className="input-edit">
      <div className="input-edit-content">
        <div className="education-main">
          <label>교육기관</label>
          <input
            type="text"
            placeholder="교육기관"
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
          />
          <label>전공</label>
          <input
            type="text"
            placeholder="전공"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
          />
          <label>상태</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="재학">재학</option>
            <option value="휴학">휴학</option>
            <option value="졸업">졸업</option>
            <option value="졸업예정">졸업예정</option>
          </select>
          <label>학위</label>
          <select value={degree} onChange={(e) => setDegree(e.target.value)}>
            <option value="학사">학사</option>
            <option value="석사">석사</option>
            <option value="박사">박사</option>
          </select>
        </div>
        <div className="education-sub">
          <label>입학년월</label>
          <input
            type="date"
            placeholder="입학년월"
            value={entryDate}
            onChange={(e) => setEntryDate(e.target.value)}
          />
          <label>졸업년월</label>
          <input
            type="date"
            placeholder="졸업년월"
            value={gradDate}
            onChange={(e) => setGradDate(e.target.value)}
          />
          <label>학점</label>
          <input
            type="text"
            placeholder="학점"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
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
