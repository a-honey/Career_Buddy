import { styled } from "styled-components";

const Loading = () => {
  return (
    <LoadingBlock>
      <img
        src="https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20141118_53%2Fjess3366_1416271194923iU2Oy_PNG%2Fsddfssfd.PNG&type=sc960_832"
        alt="로딩페이지"
      />
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
