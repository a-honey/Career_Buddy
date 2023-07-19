//카테고리를 input으로 받아서 state에 담아서 변경될때마다 새로운 렌더링
//Category에 현재 카테고리 전달. 보여줄것: username, title, createdTime, modifiedTime, category text

import { useEffect } from "react";
import ListBlock from "./common/ListBlock";
import Category from "./common/Category";
import PostBlock from "./common/PostBlock";

const Board = () => {
  useEffect(() => {
    // 전체 데이터를 불러옴, category state 바뀔때마다 새로 불러옴, mine일 경우 id로불러옴 Userstate필요
  });
  return (
    <ListBlock>
      <Category />
      <BoardItem />
    </ListBlock>
  );
};

export default Board;

const BoardItem = ({ posts }) => {
  return (
    <PostBlock>
      {posts.map((post) => (
        <PostBlock post={post} />
      ))}
    </PostBlock>
  );
};
