import Block from "../common/FieldDocumentBlock";
import { getData } from '../../../services/api';
import { styled } from "styled-components";
import FieldListBlock from "../common/FieldListBlock";
import EducationContainer from "./EducationItem";

const Education = ({user, isEditing}) => {
    try {
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
        ]
        return <EducationContainer datas={mockDatas} isEditing={isEditing}/>
    } 
    
}

export default Education;

const EducationItem = styled.div`
`