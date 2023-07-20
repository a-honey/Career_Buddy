//카테고리를 input으로 받아서 state에 담아서 변경될때마다 새로운 렌더링
//Category에 현재 카테고리 전달. 보여줄것: username, title, createdTime, modifiedTime, category text

import { useContext, useEffect, useMemo, useState } from "react";
import ListBlock from "./common/ListBlock";
import Category from "./Category";
import { styled } from "styled-components";
import { UserStateContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { hoverColor, mainColor } from "../common/color";
import PostEditer from "./Editer";
import {
  boardByALL,
  boardByCategory,
  boardUserGet,
} from "../../services/board";
import Loading from "../common/Loading";
import NoneData from "../common/NoneData";

const Board = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [category, setCategory] = useState("ALL");
  const [posts, setPosts] = useState([]);
  const [isModal, setIsModal] = useState(false);

  const navigator = useNavigate();
  const userState = useContext(UserStateContext);

  if (!userState.user.id) {
    navigator("/login");
  }

  const categoryList = useMemo(() => {
    const categoryList = [
      "ALL",
      "이직/취업",
      "커리어 꿀팁",
      "자유",
      "내 게시글 보기",
    ];
    return categoryList;
  }, []);

  const koToEn = (ko) => {
    switch (ko) {
      case "이직/취업":
        return "industry";
      case "커리어 꿀팁":
        return "tips";
      case "자유":
        return "free";
      default:
        return ko;
    }
  };
  useEffect(() => {
    const fetchfunction = async () => {
      // 전체 데이터를 불러옴, category state 바뀔때마다 새로 불러옴, mine일 경우 id로불러옴 Userstate필요
      if (category === "ALL") {
        const res = await boardByALL();
        setPosts(res?.data?.result);
        setIsFetching(true);
      } else if (category === "내 게시글 보기") {
        const res = await boardUserGet(userState.user.id);
        setPosts(res?.data?.result);
        setIsFetching(true);
      } else {
        const res = await boardByCategory(koToEn(category));
        setPosts(res.data);
        setIsFetching(true);
      }
    };
    fetchfunction();
  }, [category, categoryList]);

  if (!isFetching) {
    return <Loading />;
  }

  return (
    <ListBlock>
      {isModal ? (
        <PostEditer
          categoryList={categoryList}
          setIsModal={setIsModal}
          setPosts={setPosts}
          userId={userState.user.id}
        />
      ) : (
        <WriteBlock onClick={() => setIsModal(true)}>Write</WriteBlock>
      )}
      <Category
        category={category}
        setCategory={setCategory}
        categoryList={categoryList}
      />
      {posts.length > 0 ? (
        <Block>
          {posts.map((post) => (
            <PostItem
              userId={userState.user.id}
              post={post}
              setPosts={setPosts}
            />
          ))}
        </Block>
      ) : (
        <NoneData />
      )}
    </ListBlock>
  );
};

export default Board;

const PostItem = ({ post, setPosts, userId }) => {
  const [isModal, setIsModal] = useState(false);

  const ISOdate = new Date(post.createdAt);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  const formattedDate = ISOdate.toLocaleDateString("ko-KR", options)
    .replace(/\./g, " -")
    .slice(0, 14);
  return (
    <StyledBlock>
      {userId === post.userId ? (
        <EditerBtn onClick={() => setIsModal(true)}>수정</EditerBtn>
      ) : null}
      {isModal && (
        <PostEditer
          post={post}
          setPosts={setPosts}
          setIsModal={setIsModal}
          documentId={post._id}
        />
      )}
      <h1>{post.title}</h1>
      <div>
        <span>{post.username}</span>
        <span>{formattedDate}</span>
      </div>
      <p>{post.text}</p>
      <CategoryBlock>{post.category}</CategoryBlock>
    </StyledBlock>
  );
};

const Block = styled.div`
  width: 70%;
  min-height: 500px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 20px;
  padding: 40px 20px 0 20px;
`;
const StyledBlock = styled.div`
  border: 1px solid ${hoverColor};
  width: 200px;
  height: 400px;
  position: relative;
  border-radius: 20px;
  padding: 20px 10px;
  h1 {
    font-size: 25px;
    margin-bottom: 20px;
  }
  div {
    display: 100%;
    display: flex;
    justify-content: right;
    :first-child {
      margin-right: 10px;
    }
    span {
      display: inline-block;
      color: rgb(110, 110, 110);
      font-weight: 600;
      font-size: 15px;
    }
  }
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

const EditerBtn = styled.button`
  position: absolute;
  width: 100px;
  height: 20px;
  border-radius: 10px;
  color: #ffffff;
  background-color: ${mainColor};
  top: 10px;
  right: 10px;
`;

const CategoryBlock = styled.div`
  position: absolute;
  padding: 10px;
  border-radius: 10px;
  color: #ffffff;
  background-color: ${hoverColor};
  bottom: 20px;
  right: 10px;
  text-align: center;
`;
