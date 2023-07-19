import axios from "axios";

const backendPortNumber = "5001";
const serverUrl =
  "http://" + window.location.hostname + ":" + backendPortNumber + "/";

async function userDelete(userEmail, userPw) {
  console.log(`${serverUrl}user/deletion`);
  const res = await axios.delete(`${serverUrl}user/deletion`, {
    data: {
      inputEmail: userEmail,
      inputPassword: userPw,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
  });
  return res.data;
}

async function userPasswordChange(user_id, sendData) {
  console.log(`${serverUrl}user/${user_id}/password`);
  const res = await axios.delete(`${serverUrl}user/${user_id}/password`, {
    data: {
      inputEmail: sendData.inputEmail,
      inputPassword: sendData.inputPassword,
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
  });
  return res.data;
}

async function userPagenation(page) {
  try {
    console.log(`${serverUrl}userlist?page=${page}`);
    const response = await axios.get(`${serverUrl}userlist?page=${page}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "알 수 없는 에러가 발생했습니다."
    );
  }
}

async function userPasswordReset(inputdata) {
  const bodyData = JSON.stringify(inputdata);
  try {
    console.log(`${serverUrl}user/resetpassword`);
    await axios.put(`${serverUrl}user/resetpassword`, bodyData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      },
    });
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "알 수 없는 에러가 발생했습니다."
    );
  }
}
export { userDelete, userPasswordChange, userPagenation, userPasswordReset };
