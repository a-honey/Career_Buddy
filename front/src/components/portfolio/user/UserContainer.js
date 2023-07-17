import React, { useState, useEffect, useContext } from "react";
import UserCard from "./UserCard";
import * as Api from "../../../api";
import PortfolioList from "../PortfolioList";
import { UserStateContext } from "../../../App";
import { useNavigate } from "react-router";
import Loading from "../../common/Loading";

function UserContainer({ portfolioOwnerId, isEditable }) {
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const userState = useContext(UserStateContext);
  const navigate = useNavigate();

  useEffect(() => {
    //현재 로그인 상태가 아니면 포트폴리오 보기 금지
    if (!userState.user) {
      navigate("/network", { replace: true });
      return;
    }
  }, [userState.user, navigate]);

  useEffect(() => {
    // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
    Api.get("users", portfolioOwnerId).then((res) => setUser(res.data));
    setIsFetching(false);
  }, [portfolioOwnerId]);

  if (isFetching) {
    return <Loading />;
  }

  return (
    <div style={{ display: "flex" }}>
      <UserCard user={user} setUser={setUser} isEditable={isEditable} />
      <PortfolioList user={user} />
    </div>
  );
}

export default UserContainer;
