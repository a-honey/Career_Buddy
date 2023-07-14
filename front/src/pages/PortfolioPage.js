import { useContext } from "react";
import Portfolio from "../components/portfolio";
import LayoutPage from "./LayoutPage";
import { EditContext } from "../contexts/EditContext";

const PortfolioPage = () => {
  const { setIsEditing } = useContext(EditContext);
  setIsEditing(false);

  return (
    <LayoutPage>
      <Portfolio />
    </LayoutPage>
  );
};

export default PortfolioPage;
