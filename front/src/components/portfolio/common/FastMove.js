import { useState } from "react";
import { styled } from "styled-components";
import { hoverColor, mainColor } from "../../common/color";

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
      <Btn className="move" onClick={() => setIsShowList(!isShowList)}>
        Quick
      </Btn>
      {isShowList && (
        <>
          <Btn onClick={() => handleClick(1)}>education</Btn>
          <Btn onClick={() => handleClick(2)}>awards</Btn>
          <Btn onClick={() => handleClick(3)}>certificate</Btn>
        </>
      )}
    </FastMoveBlock>
  );
};

export default FastMove;
const FastMoveBlock = styled.div`
  position: fixed;
  top: 100px;
  right: 120px;
  width: 100px;
  z-index: 1000;
  display: flex;
  align-items: center;
  flex-direction: column;
  .move {
    width: 150px;
    border-radius: 20px;
    margin-bottom: 20px;
    &:hover {
      background-color: ${mainColor};
    }
  }
`;

const Btn = styled.button`
  width: 120px;
  padding: 5px 10px;
  background-color: ${mainColor};
  color: #ffffff;
  font-size: 20px;
  font-weight: 700;
  box-shadow: 0 2px 4px rgba(1, 1.5, 1, 1);
  margin-bottom: 20px;

  &:hover {
    background-color: ${hoverColor};
  }
`;
