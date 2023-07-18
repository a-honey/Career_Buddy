import React, { useContext, useEffect, useState } from "react";

import * as Api from "../../api";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserStateContext } from "../../App";
import NetworkUserCard from "./NetworkUserCard";

function Network() {
  // useState 훅을 통해 users 상태를 생성함.
  const [users, setUsers] = useState([]);

  const userState = useContext(UserStateContext);

  useEffect(() => {
    // "userlist" 엔드포인트로 GET 요청을 하고, users를 response의 data로 세팅함.
    Api.get("userlist").then((res) => setUsers(res.data));
  }, []);

  return (
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
  );
}

export default Network;

const UserBlock = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 0.2fr);
  grid-template-rows: 2;
  grid-gap: 20px;
  grid-column-gap: 20px;
  margin: 20px auto;
`;
