import { getDatas } from "../../../services/api";
import EducationContainer from "./EducationItem";
import { useContext, useEffect } from "react";
import { EducationContext } from "../../../contexts/EducationContext";
import { UserStateContext } from "../../../App";

const mockDatas = [
  {
    _id: "가짜 아이디1번",
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
    _id: "가짜 아이디2번",
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
const Education = () => {
  const { setEducationDocuments } = useContext(EducationContext);
  const userState = useContext(UserStateContext);

  useEffect(() => {
    getDatas(userState.user.id, "education")
      .then((res) => {
        setEducationDocuments(res.data);
      })
      .catch((error) => {
        console.log("education 가져오기 실패, mockData 실행");
        setEducationDocuments(mockDatas);
      });
  }, [setEducationDocuments, userState.user.id]);

  return <EducationContainer />;
};

export default Education;
