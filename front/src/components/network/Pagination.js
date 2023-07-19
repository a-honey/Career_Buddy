import { styled } from "styled-components";
import { hoverColor, mainColor } from "../common/color";
import { useState } from "react";

const Pagination = ({ totalPages, currentPage, handlePage }) => {
  // 상황1. 반복문을 돌면서 totalPages만큼 li태그를 만들어라. 그와중에 현재 페이지라면 active 아니면 others
  // 렌더링이 두번됨. 왜? currentPage가 왜 사라짐? 렌더링하러가나? 왜???
  // 상황2. 처음 Pagination이 렌더링될때의 currentPage의 값을 activePage에 보관, 이후 currenPage와 단절
  // 이동하면 그냥 Grid와 별개로 태그를 다시 렌더링(current 같은게 아니라 손민수로 배열을 새로 구성)함.
  //클릭하면 일어나는 일? pagenation은 그냥 Grid와 별개로 태그를 다시 렌더링(배열을 새로 구성해서)함. grid는 다시 받아서 렌더링을 함 currentPage가 바뀌었으니까. 뭔차이??
  const [activePage, setActivePage] = useState(currentPage);

  function handleLeftClick() {
    handlePage(currentPage - 1);
    setActivePage(currentPage - 1);
  }

  function handleRightClick() {
    handlePage(currentPage - 1);
    setActivePage(currentPage - 1);
  }

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={activePage === i ? "active" : ""}
          onClick={() => {
            handlePage(i);
            setActivePage(i);
          }}
        >
          {i}
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <PaginationBlock className="pagination">
      <ul className="pagination-list">
        <li
          className={activePage === 1 ? "disabled" : ""}
          onClick={activePage === 1 ? handleLeftClick : undefined}
        >
          &lt;
        </li>

        {/* 페이지 번호 */}
        {renderPageNumbers()}

        <li
          className={activePage === totalPages ? "disabled" : ""}
          onClick={activePage === 1 ? handleRightClick : undefined}
        >
          &gt;
        </li>
      </ul>
    </PaginationBlock>
  );
};

export default Pagination;

const PaginationBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  ul {
    display: flex;
    width: 50%;
    justify-content: space-between;
    align-items: center;
    li {
      width: 40px;
      height: 40px;
      text-align: center;
      line-height: 35px;
      border: 2px solid ${mainColor};
      border-radius: 50%;
      box-shadow: 0 2px 4px rgba(0.2, 0.5, 0.2, 0.5);
    }
    li.active {
      border: 2px solid ${mainColor};
      background-color: ${mainColor};
      color: #ffffff;
    }
    li:hover {
      border: 2px solid ${hoverColor};
      background-color: ${hoverColor};
      color: #ffffff;
    }
    li.disabled {
      border: 2px solid gray;
      cursor: not-allowed;
      color: black;
      background-color: white;
    }
  }
`;
