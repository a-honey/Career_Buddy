import { useContext, useState } from "react";
import FieldBlock from "../common/FieldDocumentBlock";
import FieldDocumentBlock from "../common/FieldDocumentBlock";
import { styled } from "styled-components";
import { EmptyBtn } from "../../common/Btns";
import { addData, getData } from "../../../services/api";
import { useParams } from "react-router-dom";
import { EducationContext } from "../../../contexts/EducationContext";
import { UserStateContext } from "../../../App";

const EducationEdit = () => {
    const [isAdding, setIsAdding] = useState(false);
    return(
        <div>
            <EmptyBtn onClick={()=>setIsAdding(true)}>+</EmptyBtn>
            {isAdding && <EducationAddItem setIsAdding={setIsAdding} />}
        </div>
    )
}

export default EducationEdit;

const EducationAddItem = ({ setIsAdding }) => {
    const [institution, setInstitution] = useState('');
    const [degree, setDegree] = useState(''); 
    const [major, setMajor] = useState(''); 
    const [entryDate, setEntryDate] = useState(''); 
    const [gradDate, setGradDate] = useState(''); 
    const [grade, setGrade] = useState(''); 

    const userState = useContext(UserStateContext);

    const {setEducationDocuments} = useContext(EducationContext);

    const handleAddSubmit = (e) => {
        e.preventDefault();
        //setDatas에 데이터 추가
        const newDocument = {
            institution,
            degree,
            major,
            entryDate,
            gradDate,
            grade,
        }
    
        console.log(newDocument);
        addData(userState.user.id, 'education', newDocument);
        setEducationDocuments((datas) => [...datas, newDocument]);
        console.log("교육필드에서 postData함수를 실행");
    }

    return (
        <form onSubmit={handleAddSubmit}>
            <input
            type="text"
            placeholder="교육 기관 이름"
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
            />
            <input
            type="text"
            placeholder="전공"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            />
            <div>옵션줘~</div>
            <input
            type="text"
            placeholder="입학년월"
            value={entryDate}
            onChange={(e) => setEntryDate(e.target.value)}
            />
            <input
            type="text"
            placeholder="졸업년월"
            value={gradDate}
            onChange={(e) => setGradDate(e.target.value)}
            />
            <input
            type="text"
            placeholder="학점"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            />
            <button type="submit" className="me-3">
                확인
            </button>
            <button type="button" onClick={() => setIsAdding(false)}>
                취소
            </button>
        </form>
    )
}