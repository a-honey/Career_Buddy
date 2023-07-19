import { styled } from "styled-components";

const PostEditer = () => {
  return (
    <Modal>
      <EditorBlock>
        <form>
          <label>제목</label>
          <label>내용</label>
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
`;
