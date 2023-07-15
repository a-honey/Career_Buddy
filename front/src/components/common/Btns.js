import { styled } from "styled-components";

const FullBtn = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  background-color: rgb(115, 83, 234);
  border: 2px solid rgb(115, 83, 234);
  color: #ffffff;
`;

const FullRedBtn = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  background-color: red;
  border: 2px solid red;
  color: #ffffff;
`;

const EmptyBtn = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  border: 2px solid rgb(115, 83, 234);
`;

export { FullBtn, EmptyBtn, FullRedBtn };
