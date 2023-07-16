import { useContext, useState } from "react";
import { EmptyBtn, FullBtn } from "../../common/Btns";
import { addData } from "../../../services/api";
import { UserStateContext } from "../../../App";

const DocumentAddBtn = ({ setDatas }) => {
  // isEditing 상태가 되면 각 education 필드에 add 버튼 생성
  const [isAdding, setIsAdding] = useState(false);
  return (
    <div>
      <EmptyBtn className="addingBtn" onClick={() => setIsAdding(true)}>
        +
      </EmptyBtn>
      {isAdding && (
        <DocumentAddItem setDatas={setDatas} setIsAdding={setIsAdding} />
      )}
    </div>
  );
};

export default DocumentAddBtn;

const DocumentAddItem = ({ setIsAdding, setDatas }) => {
  //add 버튼 클릭 시 데이터 입력 폼 생성
  const [title, setTitle] = useState("수상명 미입력");

  const userState = useContext(UserStateContext);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    //setDatas에 데이터 추가
    const newDocument = {
      title,
    };

    try {
      await addData(userState.user.id, "award", newDocument);
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
        <FullBtn type="submit">추가</FullBtn>
        <EmptyBtn type="button" onClick={() => setIsAdding(false)}>
          취소
        </EmptyBtn>
      </div>
    </form>
  );
};
