import Education from "./education";
import Award from "./award";
import Project from "./project";
import { styled } from "styled-components";

const PortfolioList = ({ user, isEditing }) => {
  return (
    <PortfolioListBlock>
      <Education user={user} isEditing={isEditing} />
      <Award user={user} isEditing={isEditing} />
      <Project user={user} isEditing={isEditing} />
    </PortfolioListBlock>
  );
};

export default PortfolioList;

const PortfolioListBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
