import { styled } from "styled-components";

const Loading = () => {
  return (
    <LoadingBlock>
      <div>로딩중압니다!</div>
    </LoadingBlock>
  );
};

export default Loading;

const LoadingBlock = styled.div`
  padding: 30px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
