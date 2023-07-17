import Education from "./education";
import Award from "./award";
import Project from "./project";
import Certificate from "./certificate";
import { styled } from "styled-components";

const PortfolioList = ({ user, isEditing }) => {
  return (
    <PortfolioListBlock>
      <Education user={user} />
    </PortfolioListBlock>
  );
};

export default PortfolioList;

const PortfolioListBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
