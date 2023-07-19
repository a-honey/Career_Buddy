import { useState } from "react";
import { styled } from "styled-components";
import { EmptyBtn, FullBtn } from "../common/Btns";

const PostEditer = ({ post, setPosts, setIsModal }) => {
  const [title, setTitle] = useState(post?.title || null);
  const [text, setText] = useState(post?.text || null);

  async function handleSubmit() {
    //post api
    setPosts((prev) => [...prev]);
  }
  return (
    <Modal>
      <EditorBlock>
        <form onSubmit={handleSubmit}>
          <label className="field-title">제목</label>
          <input value={title} onClick={(e) => setTitle(e.target.value)} />
          <label className="field-title">내용</label>
          <textarea value={text} onClick={(e) => setText(e.target.value)} />
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
  height: 500px;
  background-color: #ffffff;
  border-radius: 20px;
  padding: 30px;
  position: relative;
  form {
    display: flex;
    flex-direction: column;
  }
  input {
    margin: 20px 70px;
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
