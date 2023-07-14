import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { FullBtn } from "../../common/Btns";
import { useContext } from "react";
import { EditContext } from "../../../contexts/EditContext";
import UserEditForm from "./UserEditForm";
import { UserStateContext } from "../../../App";

function UserCard({ user, setUser, isEditable, isNetwork }) {
  const userState = useContext(UserStateContext);
  const navigate = useNavigate();
  const { isEditing, turnEditing } = useContext(EditContext);
  return (
    <UserCardBlock>
      <div className="img-container">
        <img
          className="mb-3"
          src="http://placekitten.com/200/200"
          alt="랜덤 고양이 사진 (http://placekitten.com API 사용)"
        />
      </div>
      {isEditing ? (
        <UserEditForm user={user} setUser={setUser} />
      ) : (
        <UserItem user={user} isNetwork={isNetwork} />
      )}
      {isEditable &&
        !isEditing && ( // 로그인 user가 포트폴리오 user라면 편집 버튼 생성
          <FullBtn onClick={() => turnEditing(true)}>편집</FullBtn>
        )}

      {isNetwork && (
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
      )}
    </UserCardBlock>
  );
}

export default UserCard;

const UserItem = ({ user, isNetwork }) => {
  return (
    <UserInfoBlock>
      <div>{user?.name}</div>
      {!isNetwork && <div>{user?.email}</div>}
      <div>{user?.description}</div>
    </UserInfoBlock>
  );
};

const UserCardBlock = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 0;
  .img-container {
    width: 350px;
    height: 350px;
    border-radius: 50%;
    overflow: hidden;
  }
  img {
    width: 100%;
    height: 100%;
    display: inline-block;
  }
`;

const UserInfoBlock = styled.div`
  display: flex;
  flex-direction: column;
`;
