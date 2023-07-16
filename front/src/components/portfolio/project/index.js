import { getDatas } from "../../../services/api";
import FieldContainer from "./FieldContainer";
import { useContext, useEffect, useState } from "react";
import { UserStateContext } from "../../../App";

const Project = () => {
  const [datas, setDatas] = useState([]);

  const userState = useContext(UserStateContext);

  useEffect(() => {
    getDatas(userState.user.id, "project")
      .then((res) => {
        setDatas(res.data);
      })
      .catch((error) => {
        console.log(`project 가져오기 실패`);
      });
  }, [setDatas, userState.user.id]);

  return <FieldContainer datas={datas} setDatas={setDatas} />;
};

export default Project;
