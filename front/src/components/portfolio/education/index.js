import { getDatas, updateData } from "../../../services/api";
import { useContext, useEffect, useState } from "react";
import { UserStateContext } from "../../../App";
import { EditContext } from "../../../contexts/EditContext";
import FieldListBlock from "../common/FieldListBlock";
import DocumentAddBtn from "./DocumentAddBtn";
import FieldDocumentBlock from "../common/FieldDocumentBlock";
import { EmptyBtn, FullBtn } from "../../common/Btns";

//api로 Model의 전체 데이터를 요청
const Education = () => {
  const [educations, setEducations] = useState([]);

  const userState = useContext(UserStateContext);

  useEffect(() => {
    getDatas(userState.user.id, "education")
      .then((res) => {
        setEducations(res.data);
      })
      .catch((error) => {
        console.log("educations 가져오기 실패");
      });
  }, [setEducations, userState.user.id]);

  return <FieldContainer datas={educations} setDatas={setEducations} />;
};

export default Education;

//Model에서 받아온 전체 데이터를 map
const FieldContainer = ({ datas, setDatas }) => {
  const { isEditing } = useContext(EditContext);

  return (
    <FieldListBlock>
      <h1 className="fieldName">Education</h1>
      {datas.map((data) => (
        <DocumentItem key={data._id} data={data} setDatas={setDatas} />
      ))}
      {isEditing && <DocumentAddBtn setDatas={setDatas} />}
    </FieldListBlock>
  );
};

const DocumentItem = ({ data, setDatas }) => {
  //해당 Model이 현재 편집상태인지 확인
  const { isEditing } = useContext(EditContext);
  //해당 document가 현재 편집상태인지 확인
  const [isDocumentEditing, setIsDocumentEditing] = useState(false);

  //해당 Document field의 content를 State로 관리
  const [content, setContent] = useState(data);

  //field의 value onChange 시 content 변경
  function handleChange(e, fieldName) {
    setContent((prevContent) => ({
      ...prevContent,
      [fieldName]: e.target.value,
    }));
  }

  // 수정 버튼 클릭시 해당 filedName으로 업데이트(put)요청 보내기
  async function handlePutSubmit(e) {
    e.preventDefault();

    try {
      await updateData(data?._id, "education", content);

      setDatas((datas) => {
        const olddatas = datas.filter(
          (origindata) => origindata._id !== data?._id
        );
        return [...olddatas, content];
      });

      setIsDocumentEditing(false);
    } catch (err) {
      alert("데이터 PUT 요청 실패");
      alert(data);
    }
  }

  // 초기화 시 데이터 다시 불러오기
  function handleGetDocument(e) {
    e.preventDefault();

    // 저장한 데이터를 다시 보여주기
    setContent(data);
  }

  // 해당 field 저장한 State 출력하기
  if (isDocumentEditing && isEditing) {
    return (
      <FieldDocumentBlock
        setDatas={setDatas}
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
                value={content?.institution}
                onChange={(e) => handleChange(e, "institution")}
              />
              <div>{data?._id}</div>
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
