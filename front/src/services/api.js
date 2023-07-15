import axios from "axios";

const backendPortNumber = "5001";
const serverUrl =
  "http://" + window.location.hostname + ":" + backendPortNumber;

// userId의 FieldName 데이터 요청하기
const getDatas = async (userId, FieldName) => {
  try {
    return await axios.get(`${serverUrl}/${userId}/${FieldName}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      },
    });
  } catch (err) {
    console.log(`getData로 ${userId}의 ${FieldName}의 데이터들  가져오기 실패`);
  }
};

// FieldName의 documentId 데이터 불러오기
const getData = async (documentId, FieldName) => {
  try {
    return await axios.post(`${serverUrl}/${FieldName}/${documentId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      },
    });
  } catch (err) {
    console.log(`${FieldName}의 ${documentId} 포스트 가져오기 실패`);
  }
};

// FieldName에 newData 추가하기
const addData = async (userId, FieldName, newData) => {
  try {
    return await axios.post(`${serverUrl}/${userId}/${FieldName}`, newData, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      },
    });
  } catch {
    console.log("포스트 업로드 실패");
  }
};

// userId의 FieldName 필드에 data 업데이트하기
const updateData = async (userId, FieldName, updateData) => {
  try {
    return await axios.put(`${serverUrl}/${userId}/${FieldName}`, updateData, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      },
    });
  } catch {
    console.log("포스트 업로드 실패");
  }
};

// userId의 FieldName 필드에 data 삭제하기
const deleteData = async (documentId, FieldName) => {
  try {
    await axios.delete(`${serverUrl}/${FieldName}/${documentId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      },
    });
  } catch {
    console.log("포스트 삭제 실패");
  }
};

// tryCatch를 거쳐가도 될듯

export { getData, addData, updateData, deleteData, getDatas };
