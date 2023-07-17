import { getDatas } from "../../../services/api";
import { useEffect, useState } from "react";
import FieldListBlock from "../common/FieldListBlock";
import { EmptyBtn, FullBtn } from "../../common/Btns";

//api로 Model의 전체 데이터를 요청
const Education = ({ user, isEditing }) => {
  const userId = user?.id;
  const fieldName = "education";
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    getDatas(userId, "education")
      .then((res) => {
        setDatas(res.data);
      })
      .catch((err) => {
        alert(`EDUCATION 데이터 가져오기 실패: ${err}`);
      });
  }, [setDatas, userId]);

  return (
    <FieldListBlock
      datas={datas}
      isEditing={isEditing}
      ShowItem={ShowItem}
      setDatas={setDatas}
      userId={userId}
      fieldName={fieldName}
    />
  );
};

export default Education;

//Model에서 받아온 전체 데이터를 map

const ShowItem = ({
  data,
  fieldName,
  isDocumentEditing,
  setIsDocumentEditing,
  UpdateDocument,
  PostDocument,
}) => {
  //해당 Document field의 content를 State로 관리
  const [content, setContent] = useState(data);
  const [isAdding, setIsAdding] = useState(false);

  //field의 value onChange 시 content 변경
  function handleChange(e, fieldName) {
    setContent((prevContent) => ({
      ...prevContent,
      [fieldName]: e.target.value,
    }));
  }

  // 수정 버튼 클릭시 해당 filedName으로 업데이트(put)요청 보내기
  async function handleSubmit(e) {
    e.preventDefault();

    if (isAdding) {
      const requiredFields = ["institution", "status", "entryDate"];

      for (const fieldName of requiredFields) {
        if (content[fieldName].trim() === "") {
          alert(`${fieldName} 입력란이 비어있습니다.`);
          return;
        }
      }

      PostDocument(fieldName, content, setIsAdding);
    } else {
      UpdateDocument(data._id, fieldName, content);
    }
  }

  // 초기화 시 데이터 다시 불러오기
  function handleGetDocument(e) {
    e.preventDefault();

    // 저장한 데이터를 다시 보여주기
    setContent(data);
  }

  // 해당 field 저장한 State 출력하기

  //isEditing이고, isDocumentEditing일 때(단, isDocumentEditing은 isEditing일 때만 보여지기 때문에, isEditing을 신경쓸 필요 없음 => isDocuemntEditing이 true이면? isEditing이다.) FieldDocumentBlock의 showItem으로 넘어가야함
  //isDocumentEditing이면 form을 보여줌 아니면 맨하단 셋팅된 data를 보여줌
  if (isDocumentEditing) {
    return (
      <form onSubmit={handleSubmit}>
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
        {isAdding ? (
          <div className="input-edit-btns">
            <FullBtn type="submit">추가</FullBtn>
            <EmptyBtn type="button" onClick={() => setIsAdding(false)}>
              취소
            </EmptyBtn>
          </div>
        ) : (
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
        )}
      </form>
    );
  } else {
    return (
      // IsEditing 상태 아닐때, FieldDocumentBlock의 ShowItem으로 넘어갈 값
      // IsEditing 상태 일 때, 아래 ShowItem과 DocumentAddBtn이 보여짐
      <>
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
        <div>
          {isAdding && (
            <EmptyBtn
              className="addingBtn"
              onClick={() => setIsAdding((isAdding) => !isAdding)}
            >
              +
            </EmptyBtn>
          )}
        </div>
      </>
    );
  }
};
