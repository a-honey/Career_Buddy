import React, { useState, useEffect, useContext } from "react";
import UserCard from "./UserCard";
import * as Api from "../../../api";
import PortfolioList from "../PortfolioList";
import { UserStateContext } from "../../../App";
import { useNavigate } from "react-router";

function UserContainer({ portfolioOwnerId, isEditable }) {
  // useState 훅을 통해 isEditing 상태를 생성함.
  // useState 훅을 통해 user 상태를 생성함.
  const [user, setUser] = useState(null);
  const userState = useContext(UserStateContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userState.user) {
      navigate("/network", { replace: true });
      return;
    }
  }, [userState.user, navigate]);
  useEffect(() => {
    // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
    Api.get("users", portfolioOwnerId).then((res) => setUser(res.data));
  }, [portfolioOwnerId]);

  return (
    <div style={{ display: "flex" }}>
      <UserCard user={user} setUser={setUser} isEditable={isEditable} />
      <PortfolioList user={user} />
    </div>
  );
}

export default UserContainer;
