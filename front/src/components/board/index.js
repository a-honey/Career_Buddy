//카테고리를 input으로 받아서 state에 담아서 변경될때마다 새로운 렌더링
//Category에 현재 카테고리 전달. 보여줄것: username, title, createdTime, modifiedTime, category text

import { useContext, useEffect, useState } from "react";
import ListBlock from "./common/ListBlock";
import Category from "./Category";
import { styled } from "styled-components";
import { UserStateContext } from "../../App";
import { useNavigate } from "react-router-dom";
import * as Api from "../../api";
import { hoverColor, mainColor } from "../common/color";
import PostEditer from "./Editer";

const Board = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [category, setCategory] = useState();
  const [posts, setPosts] = useState([]);
  const [isModal, setIsModal] = useState(false);

  const navigator = useNavigate();
  const userState = useContext(UserStateContext);

  if (!userState.user.id) {
    navigator("/login");
  }

  const categoryList = [
    "ALL",
    "이직/취업",
    "커리어 꿀팁",
    "자유",
    "내 게시글 보기",
  ];

  useEffect(() => {
    // 전체 데이터를 불러옴, category state 바뀔때마다 새로 불러옴, mine일 경우 id로불러옴 Userstate필요
    if (category === "ALL") {
      isFetching(true);
      const res = Api.get("users", userState.user.id, "/posts");
      setPosts(res.data);
    }
  }, [setPosts, isFetching, userState.user.id, category]);

  return (
    <ListBlock>
      {isModal ? (
        <PostEditer setIsModal={setIsModal} />
      ) : (
        <WriteBlock onClick={() => setIsModal(true)}>Write</WriteBlock>
      )}
      <Category
        category={category}
        setCategory={setCategory}
        categoryList={categoryList}
      />
      {posts.map((post) => (
        <PostItem post={post} />
      ))}
    </ListBlock>
  );
};

export default Board;

const PostItem = ({ post }) => {
  return (
    <StyledBlock>
      <h1>{post.title}</h1>
      <div>
        {post.username}
        {post.createdTime}
      </div>
      <p>{post.text}</p>
      <div>{post.category}</div>
    </StyledBlock>
  );
};

const StyledBlock = styled.div`
  background-color: pink;
  width: 200px;
  height: 400px;
`;

const WriteBlock = styled.button`
  border: 3px solid ${hoverColor};
  border-radius: 15px;
  position: fixed;
  top: 70px;
  right: 20px;
  padding: 10px 20px;
  &:hover {
    background-color: ${hoverColor};
    color: white;
  }
`;
