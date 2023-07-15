import { getDatas } from "../../../services/api";
import FieldContainer from "./FieldContainer";
import { useContext, useEffect, useState } from "react";
import { UserStateContext } from "../../../App";

const Award = () => {
  const [awards, setAwards] = useState([]);

  const userState = useContext(UserStateContext);

  useEffect(() => {
    getDatas(userState.user.id, "awards")
      .then((res) => {
        setAwards(res.data);
      })
      .catch((error) => {
        console.log("awards 가져오기 실패");
      });
  }, [setAwards, userState.user.id]);

  return <FieldContainer datas={awards} setDatas={setAwards} />;
};

export default Award;
