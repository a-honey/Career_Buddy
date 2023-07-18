import { styled } from "styled-components";

const Pagination = ({ totalPages, currentPage, handlePage }) => {
  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          className={currentPage === i ? "active" : ""}
          onClick={() => handlePage(i)}
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
          onClick={() => handlePage(currentPage - 1)}
        >
          &lt;
        </li>

        {/* 페이지 번호 */}
        {renderPageNumbers()}

        <li
          className={currentPage === totalPages ? "disabled" : ""}
          onClick={() => handlePage(currentPage + 1)}
        >
          &gt;
        </li>
      </ul>
    </PaginationBlock>
  );
};

export default Pagination;

const PaginationBlock = styled.div`
  ul {
  }
`;
