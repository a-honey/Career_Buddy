import React, { useContext, useEffect, useState } from "react";

import * as Api from "../../api";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserStateContext } from "../../App";

function Network() {
  // useState 훅을 통해 users 상태를 생성함.
  const [users, setUsers] = useState([]);

  const userState = useContext(UserStateContext);

  useEffect(() => {
    // "userlist" 엔드포인트로 GET 요청을 하고, users를 response의 data로 세팅함.
    Api.get("userlist").then((res) => setUsers(res.data));
  }, []);

  return (
    <>
      <UserBlock>
        {users.map((user) => (
          <NetworkUserCard
            className="networkUser"
            key={user.id}
            user={user}
            userState={userState}
          />
        ))}
      </UserBlock>
    </>
  );
}

export default Network;

const UserBlock = styled.div`
  display: grid;
  grid-template-rows: repeat(4, 0.2fr);
  grid-template-columns: repeat(4, 0.2fr);
  grid-gap: 10px;
`;

//NetWork 페이지의 UserCard 추후 분리 예정
const NetworkUserCard = ({ user, userState }) => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="img-container" style={{ width: "200px" }}>
        <img
          className="mb-3"
          src="http://placekitten.com/200/200"
          alt="랜덤 고양이 사진 (http://placekitten.com API 사용)"
        />
      </div>
      <h1>{user?.name}</h1>
      <button
        className="mt-3"
        href="#"
        //비회원 자세한 포트폴리오 보기 금지
        onClick={() => {
          if (!userState.user) {
            alert("회원가입을 해주세요.");
          }
          if (userState.user.id === user.id) {
            navigate("/");
          } else {
            navigate(`/users/${user.id}`);
          }
        }}
      >
        포트폴리오
      </button>
    </div>
  );
};
