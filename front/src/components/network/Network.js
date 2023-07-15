import React, { useEffect, useState } from "react";

import * as Api from "../../api";
import UserCard from "../portfolio/user/UserCard";
import { styled } from "styled-components";

function Network() {
  // useState 훅을 통해 users 상태를 생성함.
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // "userlist" 엔드포인트로 GET 요청을 하고, users를 response의 data로 세팅함.
    Api.get("userlist").then((res) => setUsers(res.data));
  }, []);

  return (
    <>
      <UserBlock>
        {users.map((user) => (
          <UserCard
            className="networkUser"
            key={user.id}
            user={user}
            isNetwork
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
