import Block from "../common/FieldBlock";
import { getData } from '../../../services/api';
import { styled } from "styled-components";

const Education = ({user}) => {
    try {
    const datas = getData(user?.id, 'education');
    return(
        <Block>
            {datas.map((data) => <EducationItem data={data} />)}
        </Block>
    )
    } catch (e) {
        return <div>학력담을거임</div>
    } 
    
}

export default Education;

const EducationItem = styled.div`
`