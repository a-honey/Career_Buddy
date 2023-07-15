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
  const { isEditing, setIsEditing } = useContext(EditContext);
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
          <FullBtn
            onClick={() => {
              setIsEditing(true);
            }}
          >
            편집
          </FullBtn>
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
      {user?.github && (
        <a href={user?.github} target="_blank" rel="noopener noreferrer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-github"
            viewBox="0 0 16 16"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
          </svg>
        </a>
      )}
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
