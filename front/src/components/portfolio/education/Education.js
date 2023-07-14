import { getDatas } from '../../../services/api';
import EducationContainer from "./EducationItem";
import { useContext, useEffect} from "react";
import { EducationContext } from '../../../contexts/EducationContext';

const mockDatas = [
    {
        _id: '가짜 아이디1번',
        institution: "한국대학교",
        degree: "학사",
        major: "무역학과",
        status: "졸업",
        entryDate: "2019-01-01",
        gradDate: "2023-12-01",
        grade: "4.3",
        description: "텍스트입니다",
    },
    {
        _id: '가짜 아이디2번',
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
const Education = ({user}) => {
    const {setEducationDocuments} = useContext(EducationContext);
    try {
        // userId를 통해 해당 user가 참조하고 있는 Education 필드 받아오기
        // userId/education 요청
            useEffect(() => {
                getDatas(user?.id, "education").then((res) => setEducationDocuments(res.data));
            }, [setEducationDocuments, user?.id]);

    return <EducationContainer /> 
    } catch {
        console.log('education 가져오기 실패, mockData실행');
        setEducationDocuments(mockDatas);

    }
};

export default Education;