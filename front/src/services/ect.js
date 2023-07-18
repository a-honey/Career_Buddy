import axios from "axios";

const backendPortNumber = "5001";
const serverUrl =
  "http://" + window.location.hostname + ":" + backendPortNumber + "/";

async function userDelete(userEmail, userPw) {
  console.log(`${serverUrl}/user/deletion`);
  const res = await axios.delete(`${serverUrl}/user/deletion`, {
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

export { userDelete };
