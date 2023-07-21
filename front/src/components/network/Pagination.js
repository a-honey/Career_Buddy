import { styled } from "styled-components";
import { hoverColor, mainColor } from "../common/color";

const Pagination = ({ totalPages, currentPage, handlePage }) => {
  currentPage = Number(currentPage);
  function handleLeftClick() {
    handlePage(currentPage - 1);
  }

  function handleRightClick() {
    handlePage(currentPage + 1);
  }

  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={currentPage === i ? "active" : ""}
          onClick={() => {
            handlePage(i);
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
          className={currentPage === 1 ? "disabled" : ""}
          onClick={currentPage === 1 ? null : handleLeftClick}
        >
          &lt;
        </li>

        {/* 페이지 번호 */}
        {renderPageNumbers()}

        <li
          className={currentPage === totalPages ? "disabled" : ""}
          onClick={currentPage === totalPages ? null : handleRightClick}
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
      cursor: pointer;
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
