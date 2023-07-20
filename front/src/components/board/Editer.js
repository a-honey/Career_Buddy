import { useState } from "react";
import { styled } from "styled-components";
import { EmptyBtn, FullBtn } from "../common/Btns";
import { boardByDocument, boardUserPost } from "../../services/board";

const PostEditer = ({
  post,
  setPosts,
  setIsModal,
  userId,
  documentId,
  categoryList,
}) => {
  const [title, setTitle] = useState(post ? post.title : "");
  const [text, setText] = useState(post ? post.text : "");
  const [category, setCategory] = useState(post ? post.category : "");

  async function handleSubmit() {
    const newdata = { title, text, category };
    if (userId) {
      try {
        await boardUserPost(userId, newdata);
        setPosts((prev) => [...prev, newdata]);
        setIsModal(false);
      } catch (err) {
        alert(err.message);
      }
    }
    if (documentId) {
      try {
        await boardByDocument(documentId, newdata);
        setPosts((posts) => {
          return posts.map((prev) => {
            if (prev._id === post._id) {
              return newdata;
            }
            return prev;
          });
        });
        setIsModal(false);
      } catch (err) {
        alert(err.message);
      }
    }
  }
  return (
    <Modal>
      <EditorBlock>
        <form onSubmit={handleSubmit}>
          <label className="editer-label">제목</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <label className="editer-label">카테고리</label>
          <select
            value={category || "자유"}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categoryList.map((name) => (
              <option value={name}>{name}</option>
            ))}
          </select>
          <label className="editer-label">내용</label>
          <textarea value={text} onChange={(e) => setText(e.target.value)} />
          <div className="board-post-btn">
            <EmptyBtn type="button" onClick={() => setIsModal(false)}>
              취소
            </EmptyBtn>
            <FullBtn>저장</FullBtn>
          </div>
        </form>
      </EditorBlock>
    </Modal>
  );
};
export default PostEditer;

const Modal = styled.div`
  position: fixed;
  z-index: 2000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EditorBlock = styled.div`
  width: 700px;
  height: 600px;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 30px;
  position: relative;
  form {
    display: flex;
    flex-direction: column;
  }
  input,
  select {
    margin: 20px 70px;
  }
  .editer-label {
    margin: 0px 60px;
    padding: 0px;
  }

  textarea {
    margin: 20px 70px;
    height: 200px;
  }
  .board-post-btn {
    width: 170px;
    position: absolute;
    bottom: 50px;
    right: 100px;
    display: flex;
    justify-content: space-between;
  }
`;
