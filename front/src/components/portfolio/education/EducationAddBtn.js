import { useContext, useState } from "react";
import { EmptyBtn, FullBtn } from "../../common/Btns";
import { addData } from "../../../services/api";
import { UserStateContext } from "../../../App";

const EducationAddBtn = ({ setDatas }) => {
  // isEditing 상태가 되면 각 education 필드에 add 버튼 생성
  const [isAdding, setIsAdding] = useState(false);
  return (
    <div>
      <EmptyBtn className="addingBtn" onClick={() => setIsAdding(true)}>
        +
      </EmptyBtn>
      {isAdding && (
        <EducationAddItem setDatas={setDatas} setIsAdding={setIsAdding} />
      )}
    </div>
  );
};

export default EducationAddBtn;

const EducationAddItem = ({ setIsAdding, setDatas }) => {
  //add 버튼 클릭 시 데이터 입력 폼 생성
  //교육기관
  const [institution, setInstitution] = useState("교육기관미입력");
  //학위
  const [degree, setDegree] = useState("학사");
  //전공
  const [major, setMajor] = useState("전공미입력");
  //상태
  const [status, setStatus] = useState("졸업");
  //입학년월
  const [entryDate, setEntryDate] = useState("2001-01-01");
  //졸업년월
  const [gradDate, setGradDate] = useState("2001-01-01");
  //학점
  const [grade, setGrade] = useState("3.0");

  const userState = useContext(UserStateContext);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    //setDatas에 데이터 추가
    const newDocument = {
      institution,
      degree,
      status,
      major,
      entryDate,
      gradDate,
      grade,
    };

    try {
      await addData(userState.user.id, "education", newDocument);
    } catch (err) {
      return;
    }

    setDatas((datas) => [...datas, newDocument]);
    setIsAdding(false);
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
          <label>학위</label>
          <select value={degree} onChange={(e) => setDegree(e.target.value)}>
            <option value="학사">학사</option>
            <option value="석사">석사</option>
            <option value="박사">박사</option>
          </select>
          <label>상태</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
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
