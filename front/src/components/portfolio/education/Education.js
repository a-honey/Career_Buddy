import Block from "../common/FieldDocumentBlock";
import { getData } from '../../../services/api';
import { styled } from "styled-components";
import FieldListBlock from "../common/FieldListBlock";
import EducationContainer from "./EducationItem";
import { useEffect, useState } from "react";

const mockDatas = [
    {
        title: '가짜 제목',
        date: '가짜 날짜',
    },
    {
        title: '가짜 제목1',
        date: '가짜 날짜1',
    },
];
const Education = ({user, isEditing}) => {
    const { datas, setDatas } = useState(null);
    try {
        // userId를 통해 해당 user가 참조하고 있는 Education 필드 받아오기
        // userId/education 요청
            useEffect(() => {
                getData(user?.id, "education").then((res) => setDatas(res.data));
            }, [setDatas, user?.id]);

    return <EducationContainer datas={mockDatas} /> 
    } catch {
        console.log('education 가져오기 실패')
    }
}

export default Education;

const EducationItem = styled.div`
`