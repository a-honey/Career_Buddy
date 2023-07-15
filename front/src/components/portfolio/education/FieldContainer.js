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
      <h1 className="fieldName">교육사항</h1>
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
  const [institution, setInstitution] = useState(data?.institution);
  const [degree, setDegree] = useState(data?.degree);
  const [major, setMajor] = useState(data?.major);
  const [status, setStatus] = useState(data?.status);
  const [entryDate, setEntryDate] = useState(data?.entryDate);
  const [gradDate, setGradDate] = useState(data?.gradDate);
  const [grade, setGrade] = useState(data?.grade);

  // 수정 버튼 클릭시 데이터 업데이트
  async function handlePutSubmit(e) {
    e.preventDefault();

    //해당 filed Schemas newDocument에 담기
    const newDocument = {
      institution,
      degree,
      major,
      status,
      entryDate,
      gradDate,
      grade,
    };

    try {
      //해당 filedName으로 요청 보내기
      await updateData(data._id, "education", newDocument);
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
    setInstitution(data?.institution);
    setDegree(data?.degree);
    setMajor(data?.major);
    setStatus(data?.status);
    setEntryDate(data?.entryDate);
    setGradDate(data?.gradDate);
    setGrade(data?.grade);
  }

  // 해당 field 저장한 State 출력하기
  if (isDocumentEditing && isEditing) {
    return (
      <FieldDocumentBlock
        fieldName={"education"}
        documentId={data?._id}
        isDocumentEditing={isDocumentEditing}
        setIsDocumentEditing={setIsDocumentEditing}
      >
        <form onSubmit={handlePutSubmit}>
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
              <select
                value={degree}
                onChange={(e) => setDegree(e.target.value)}
              >
                <option value="학사">학사</option>
                <option value="석사">석사</option>
                <option value="박사">박사</option>
              </select>
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
      // IsEditing 상태 아닐때 응답받은 Field Document 보여주기
      <FieldDocumentBlock
        setDatas={setDatas}
        documentId={data?._id}
        fieldName={"education"}
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
