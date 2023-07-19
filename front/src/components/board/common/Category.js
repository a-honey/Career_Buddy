import { styled } from "styled-components";

//현재 카테고리를 전달받아서 active에만 스타일을 추가함
const Category = ({ category, setCategory }) => {
  const categoryList = ["ALL"];
  const renderCategory = () => {
    const categories = [];

    for (let i = 1; i <= categoryList.length; i++) {
      categories.push(
        <button
          key={i}
          className={categoryList[i].indexOf() === category ? "active" : ""}
          onClick={() => {
            setCategory(categoryList[i]);
          }}
        >
          {categoryList[i]}
        </button>
      );
    }
    return categories;
  };
  return <CategoryBlock>{renderCategory()}</CategoryBlock>;
};

export default Category;

const CategoryBlock = styled.div`
  display: flex;
`;
