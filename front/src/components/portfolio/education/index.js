import { getDatas } from "../../../services/api";
import FieldContainer from "./FieldContainer";
import { useContext, useEffect, useState } from "react";
import { UserStateContext } from "../../../App";

const Education = () => {
  const [educations, setEducations] = useState([]);

  const userState = useContext(UserStateContext);

  useEffect(() => {
    getDatas(userState.user.id, "education")
      .then((res) => {
        setEducations(res.data);
      })
      .catch((error) => {
        console.log("educations 가져오기 실패");
      });
  }, [setEducations, userState.user.id]);

  return <FieldContainer datas={educations} setDatas={setEducations} />;
};

export default Education;
