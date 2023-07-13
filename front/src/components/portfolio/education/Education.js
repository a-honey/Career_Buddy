import Block from "../common/FieldDocumentBlock";
import { getData } from '../../../services/api';
import { styled } from "styled-components";
import FieldListBlock from "../common/FieldListBlock";
import EducationContainer from "./EducationItem";
import { useEffect, useState } from "react";

const mockDatas = [
    {
        institution: "한국대학교",
        degree: "학사",
        major: "무역학과",
        status: "졸업",
        entryDate: "2019-01-01",
        gradDate: "4.3",
        description: "텍스트입니다",
    },
    {
        institution: "하버드대학교",
        degree: "석사",
        major: "MBA",
        status: "졸업",
        entryDate: "2019-01-01",
        gradDate: "2023-01-01",
        grade: "4.0",
        description: "텍스트입니다",
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