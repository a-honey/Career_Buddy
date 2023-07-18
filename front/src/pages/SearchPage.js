import PasswordChange from "../components/search/passwordChange";
import LayoutPage from "./LayoutPage";

const SearchPage = () => {
  return (
    <LayoutPage>
      <Component />
    </LayoutPage>
  );
};

export default SearchPage;

const Component = () => {
  // params에 따라 return할 컴포넌트를 구분

  return <PasswordChange />;
};
