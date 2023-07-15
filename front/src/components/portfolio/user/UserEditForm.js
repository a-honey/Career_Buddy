import React, { useContext, useState } from "react";
import * as Api from "../../../api";
import { EmptyBtn, FullBtn } from "../../common/Btns";
import { EditContext } from "../../../contexts/EditContext";

function UserEditForm({ user, setUser }) {
  //useState로 name 상태를 생성함.
  const [name, setName] = useState(user.name);
  //useState로 email 상태를 생성함.
  const [email] = useState(user.email);
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState(user.description);

  const { turnEditing } = useContext(EditContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // "users/유저id" 엔드포인트로 PUT 요청함.
    const res = await Api.put(`users/${user.id}`, {
      name,
      email,
      description,
    });
    // 유저 정보는 response의 data임.
    const updatedUser = res.data;
    // 해당 유저 정보로 user을 세팅함.
    setUser(updatedUser);

    // isEditing을 false로 세팅함.
    turnEditing();
  };

  return (
    <form
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      onSubmit={handleSubmit}
    >
      <label> 사용자 email</label>
      <div>{email}</div>
      <label>이름</label>
      <input
        type="text"
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>소개글</label>
      <textarea
        type="text"
        placeholder="정보, 인사말"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <FullBtn type="submit" className="me-3">
        확인
      </FullBtn>
      <EmptyBtn
        variant="secondary"
        onClick={() => {
          turnEditing();
        }}
      >
        취소
      </EmptyBtn>
    </form>
  );
}

export default UserEditForm;
