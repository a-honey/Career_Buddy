import { styled } from "styled-components";
import { EmptyBtn, FullRedBtn } from "../../common/Btns";
import { useState } from "react";
import { userDelete } from "../../../services/ect";

const Withdrawal = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPw, setUserPw] = useState("");

  async function handleClick() {
    try {
      await userDelete(userEmail, userPw);
      alert("탈퇴하십니까?");
      // 연동 후 네트워크의 users와 연결되는지 확인하고 수정
    } catch (err) {
      alert(err);
    }
  }

  return (
    <Modal>
      <WithdrawalBlock onSubmit={handleClick}>
        <label className="withdrawl-lebel">Email |</label>
        <input
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <label className="withdrawl-lebel">Password |</label>
        <input value={userPw} onChange={(e) => setUserPw(e.target.value)} />
        <EmptyBtn>취소</EmptyBtn>
        <FullRedBtn>탈퇴</FullRedBtn>
      </WithdrawalBlock>
    </Modal>
  );
};

export default Withdrawal;

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

const WithdrawalBlock = styled.form`
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  background-color: pink;
`;
