import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

function UserCard({ user, setIsEditing, isEditable, isNetwork }) {
  const navigate = useNavigate();
  return (
    <UserCardBlock>
      <div className="img-container">
        <img
          className="mb-3"
          src="http://placekitten.com/200/200"
          alt="랜덤 고양이 사진 (http://placekitten.com API 사용)"
          />
      </div>
      <div className="user-info">
        <h1>{user?.name}</h1>
        <h2>{user?.email}</h2>
        <h3>{user?.description}</h3>
      </div>
        {isEditable && (
                <button
                  onClick={() => setIsEditing(true)}
                >
                  편집
                </button>
        )}

        {isNetwork && (
          <button
            className="mt-3"
            href="#"
            onClick={() => navigate(`/users/${user.id}`)}
          >
            포트폴리오
          </button>
        )}
        </UserCardBlock>
  );
}

export default UserCard;

const UserCardBlock = styled.div`
  background-color: green;
  width: 100%;

  img {
    width: 100%;
    height: 100px;
    display: inline-block;
  }
  .user-info {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`
