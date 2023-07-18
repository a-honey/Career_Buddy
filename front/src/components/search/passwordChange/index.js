import { styled } from "styled-components";
import { EmptyBtn, FullRedBtn } from "../../common/Btns";
import { useContext, useEffect, useState } from "react";
import { userPasswordChange } from "../../../services/ect";
import { DispatchContext, UserStateContext } from "../../../App";
import { useNavigate } from "react-router-dom";

const PasswordChange = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPw, setNewPw] = useState("");
  const [newPwConfirm, setNewPwConfirm] = useState("");
  const [userId, setUserId] = useState(null);

  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);

  async function handleClick() {
    try {
      if (newPw !== newPwConfirm) {
        alert("비밀번호가 다릅니다.");
        return;
      } else if (!email || !newPw) {
        alert("다시 한번 확인해주세요.");
        return;
      }
      const sendData = {
        email: email,
        inputPassword: newPw,
        newPassword: newPwConfirm,
      };

      alert("비밀번호 변경하십니까?");

      await userPasswordChange(userId, sendData);

      alert("변경되었습니다. 다시 로그인해주세요. ");
      sessionStorage.removeItem("userToken");
      dispatch({ type: "LOGOUT" });
    } catch (err) {
      alert(err);
    }
  }

  useEffect(() => {
    if (!userState.user) {
      navigate("/login", { replace: true });
      return;
    } else {
      setUserId(userState.user.id);
    }
  }, [navigate, setUserId, userState.user]);

  return (
    <WithdrawalBlock onSubmit={handleClick}>
      <label className="withdrawl-lebel">Email |</label>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <label className="withdrawl-lebel">Password |</label>
      <input value={newPw} onChange={(e) => setNewPw(e.target.value)} />
      <label className="withdrawl-lebel">Password Confirm |</label>
      <input
        value={newPwConfirm}
        onChange={(e) => setNewPwConfirm(e.target.value)}
      />
      <FullRedBtn>비밀번호 변경</FullRedBtn>
      <EmptyBtn>취소</EmptyBtn>
    </WithdrawalBlock>
  );
};

export default PasswordChange;

const WithdrawalBlock = styled.form`
  width: 500px;
  height: 400px;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  background-color: pink;
  margin: 60px auto;
  margin-top: 100px;
`;
