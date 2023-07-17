import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { mainColor } from "../../common/color";

const FastMove = ({ scrollElement }) => {
  const [isShowList, setIsShowList] = useState(false);
  const position = scrollElement.current;
  const top = document.querySelector("#portfolio");
  const handleClick = (placeNum) => {
    if (placeNum === 0) {
      top.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      position[placeNum].scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <FastMoveBlock>
      <ShowBtn onClick={() => setIsShowList(!isShowList)}>Move</ShowBtn>
      {isShowList && (
        <BtnBlock>
          <Btn onClick={() => handleClick(1)}>education</Btn>
          <Btn onClick={() => handleClick(2)}>awards</Btn>
          <Btn onClick={() => handleClick(3)}>education</Btn>
        </BtnBlock>
      )}
    </FastMoveBlock>
  );
};

export default FastMove;
const FastMoveBlock = styled.div`
  position: fixed;
  top: 100px;
  right: 70px;
  width: 100px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
`;

const ShowBtn = styled.button`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: ${mainColor};
  color: #ffffff;
  font-size: 20px;
  font-weight: 700;
`;

const BtnBlock = styled.button`
  color: #ffffff;
  display: flex;
  flex-direction: column;
  margin: 10px auto;
  justify-content: space-between;
  align-items: center;
  height: 150px;
`;
const Btn = styled.button`
  background-color: ${mainColor};
  text-align: center;
  border-radius: 10px;
  color: #ffffff;
  font-weight: 700;
  padding: 5px 10px;
`;
