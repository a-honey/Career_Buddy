import axios from 'axios';

// userId의 name 필드 데이터 요청하기
const getData = (id, name) => {
    try {
        console.log('getData 실행됨');
        return axios.post(`/${id}/${name}`);
    } catch (err) {
        console.log("포스트 가져오기 실패");
    }
}

// userId의 name 필드에 data 추가하기
const addData = (id, name, data) => {
    try {
        return axios.post(`/${id}/${name}`, data);
    } catch {
        console.log("포스트 업로드 실패")
    }
}

// userId의 name 필드에 data 업데이트하기 
const updateData = (id, name, data) => {
    return axios.put(`/${id}/${name}`, data);
}

// userId의 name 필드에 data 삭제하기
const deleteData = (id, name, dataId) => {
    axios.delete(`/${id}/${name}/${dataId}`);
}

// tryCatch로 쉽게가기(미완, 미실행)
const tryCatch = async (callback) => {
    try {
        callback();
    } catch (err) {
        console.log("뭔가 실패함");
    }
}

export {getData, addData, updateData, deleteData, tryCatch};