import { useState } from "react";
import FieldBlock from "../common/FieldDocumentBlock";
import FieldDocumentBlock from "../common/FieldDocumentBlock";
import { styled } from "styled-components";
import { EmptyBtn } from "../../common/Btns";

const EducationEdit = ({ data }) => {
    const [isAdding, setIsAdding] = useState(false);
    return(
        <div>
            <EmptyBtn style={{width: "100px"}} onClick={()=>setIsAdding(true)}>+</EmptyBtn>
            {isAdding && <EducationAddItem setIsAdding={setIsAdding} />}
        </div>
    )
}

export default EducationEdit;

const EducationAddItem = ({ user, setIsAdding }) => {
    const [institution, setInstitution] = useState('');
    const [degree, setDegree] = useState('user.degree'); 
    const [major, setMajor] = useState('user.major'); 
    const [entryDate, setEntryDate] = useState('user.entryDate'); 
    const [gradDate, setGradDate] = useState('user.gradDate'); 
    const [grade, setGrade] = useState('user.grade'); 

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
            <button variant="secondary" onClick={() => setIsAdding(false)}>
                취소
            </button>
        </form>
    )
}