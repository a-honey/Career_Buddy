import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserStateContext, DispatchContext } from "../../App";
import { styled } from "styled-components";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);

  // 전역상태에서 user가 null이 아니라면 로그인 성공 상태임.
  const isLogin = !!userState.user;

  // 로그아웃 클릭 시 실행되는 함수
  const logout = () => {
    // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
    sessionStorage.removeItem("userToken");
    // dispatch 함수를 이용해 로그아웃함.
    dispatch({ type: "LOGOUT" });
    // 기본 페이지로 돌아감.
    navigate("/");
  };

  return (
    <HeaderBlock>
      <Logo className="logo" key="logo">WEP <span>WIZARDS</span></Logo>
      <ul>
        <li key="myPage" onClick={() => navigate("/")}>나의 페이지</li>
        <li key="network" onClick={() => navigate("/network")}>네트워크</li>
        {isLogin && (
          <li key="logout" onClick={logout}>로그아웃</li>
        )}
      </ul>
    </HeaderBlock>
  );
}

export default Header;

const HeaderBlock = styled.div`
  z-index: 1000;
  position: fixed;
  background-color: yellow;
  width: 100%;
  height: 50px;
  padding: 0 50px;
  display: flex;
  z-index: 100;
  justify-content: space-between;
  ul {
    display: flex;
    width: 300px;
    justify-content: space-between;
    line-height: 50px;
    li {
      position: relative;
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        height: 2px;
        width: 100%;
        background-color: black;
      }
    }
  }
`

const Logo = styled.li`
  font-size: 30px;
  font-weight: 700;
`