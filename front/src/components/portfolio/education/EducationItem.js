import { useContext, useState } from "react";
import FieldDocumentBlock from "../common/FieldDocumentBlock";
import FieldListBlock from "../common/FieldListBlock";
import { EditContext } from "../../../contexts/EditContext";
import EducationEdit from "./EducationEditAdd";
import { EmptyBtn, FullBtn } from "../../common/Btns";
import { updateData, getData } from "../../../services/api";
import { EducationContext } from "../../../contexts/EducationContext";

const EducationContainer = () => {
  const { isEditing } = useContext(EditContext);
  const { educationDocuments } = useContext(EducationContext);
  return (
    <FieldListBlock>
      <h1 className="fieldName">교육사항</h1>
      {educationDocuments.map((data) => (
        <EducationItem key={data._id} data={data} />
      ))}
      {isEditing && <EducationEdit />}
    </FieldListBlock>
  );
};

export default EducationContainer;

const EducationItem = ({ data }) => {
  const [isDocumentEditing, setIsDocumentEditing] = useState(false);
  const { educationDocuments, setEducationDocuments } =
    useContext(EducationContext);
  const { isEditing } = useContext(EditContext);

  const [institution, setInstitution] = useState(data?.institution);
  const [degree, setDegree] = useState(data?.degree);
  const [major, setMajor] = useState(data?.major);
  const [status, setStatus] = useState(data?.status);
  const [entryDate, setEntryDate] = useState(data?.entryDate);
  const [gradDate, setGradDate] = useState(data?.gradDate);
  const [grade, setGrade] = useState(data?.grade);

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    //setDatas에 데이터 추가
    const newDocument = {
      institution,
      degree,
      major,
      status,
      entryDate,
      gradDate,
      grade,
    };

    console.log(newDocument);
    //필드name/ 도큐먼트id로 수정을 요청
    console.log(`education의 ${data._id} 수정 요청 함수 실행`);
    //db의 education에서 _id 업데이트
    await updateData(data._id, "education", newDocument);
    //education의 datas에서 _id의 바뀐값을 가져오기
    setEducationDocuments((datas) => {
      const updatedDatas = datas.filter((item) => item._id !== data._id);
      return [...updatedDatas, newDocument];
    });
    setIsDocumentEditing(false);
  };

  const handleGetDocument = async (e) => {
    e.preventDefault();
    console.log(`education의 ${data?._id} 다시 가져오기 함수 실행`);
    getData(data._id, "education");
  };

  if (isDocumentEditing && isEditing) {
    return (
      <FieldDocumentBlock
        fieldName={"education"}
        documentId={data?._id}
        isDocumentEditing={isDocumentEditing}
        setIsDocumentEditing={setIsDocumentEditing}
      >
        <form onSubmit={handleUpdateSubmit} className="input-edit">
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
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="재학">재학</option>
                <option value="휴학">휴학</option>
                <option value="졸업">졸업</option>
                <option value="졸업예정">졸업예정</option>
              </select>
              <label>학위</label>
              <select
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
              >
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
      <FieldDocumentBlock
        setDatas={setEducationDocuments}
        documentId={data?._id}
        fieldName={"education"}
        datas={educationDocuments}
        isDocumentEditing={isDocumentEditing}
        setIsDocumentEditing={setIsDocumentEditing}
      >
        <div className="field-main-content">
          <span className="field-title">교육기관 | </span>
          {data?.institution} {data?.major}{" "}
          <span className="field-sub-content">
            | {data?.degree} {data?.status}
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="field-content">
            <span className="field-title">학점 | </span>
            {data?.grade}
          </div>
          <div className="field-date">
            <span className="field-title">기간 | </span>
            {data?.entryDate} - {data?.gradDate}
          </div>
        </div>
      </FieldDocumentBlock>
    );
  }
};
