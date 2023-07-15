import { getDatas } from "../../../services/api";
import FieldContainer from "./FieldContainer";
import { useContext, useEffect, useState } from "react";
import { UserStateContext } from "../../../App";

const Certificate = () => {
  const fieldName = "certificate";

  const [datas, setDatas] = useState([]);

  const userState = useContext(UserStateContext);

  useEffect(() => {
    getDatas(userState.user.id, fieldName)
      .then((res) => {
        setDatas(res.data);
      })
      .catch((error) => {
        console.log(`${fieldName} 가져오기 실패`);
      });
  }, [setDatas, userState.user.id]);

  return <div datas={datas} setDatas={setDatas} />;
};

export default Certificate;
