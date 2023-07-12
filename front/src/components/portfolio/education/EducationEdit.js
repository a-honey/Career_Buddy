import { useState } from "react";
import Block from "../Block";

const EducationEdit = ({ user }) => {
    const [isAdding, setIsAdding] = useState(false);
    
    return(
        <Block>
            <h1>학력</h1>
            <div>학교 이름{user?.id}</div>
            <div>학교 이름</div>
            <div>전공</div>
            <div>재학중</div>
            <button onClick={()=>setIsAdding(true)}>+</button>
            {isAdding && <EducationEditItem setIsAdding={setIsAdding} />}
        </Block>
    )
}

export default EducationEdit;

const EducationEditItem = ({ }) =>  {

    
}
const EducationAddItem = ({ user, setIsAdding }) => {
    const [institution, setInstitution] = useState('');
    const [degree, setDegree] = useState('user.degree'); 
    const [major, setMajor] = useState('user.major'); 
    const [entryDate, setEntryDate] = useState('user.entryDate'); 
    const [gradDate, setGradDate] = useState('user.gradDate'); 
    const [grade, setGrade] = useState('user.grade'); 

    const handleAddSubmit = (e) => {
        e.preventDefault();
        
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
