import Block from "../common/FieldDocumentBlock";
import { getData } from '../../../services/api';
import { styled } from "styled-components";
import FieldListBlock from "../common/FieldListBlock";
import EducationContainer from "./EducationItem";
import { useState } from "react";

const Education = ({user, isEditing}) => {
    try {
        // userId를 통해 해당 user가 참조하고 있는 Education 필드 받아오기
        // userId/education 요청
    const datas = getData(user?.id, 'education');
    return(
        <Block>
            {datas.map((data) => <EducationItem data={data} />)}
        </Block>
    )
    } catch (e) {
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

        return <EducationContainer datas={mockDatas} />  // setDatas
    } 
    
}

export default Education;

const EducationItem = styled.div`
`