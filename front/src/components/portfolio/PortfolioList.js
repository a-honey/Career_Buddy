import Education from "./education/Education";
import Award from "./award/Award";
import Certificate from "./certificate/Certificate";
import { styled } from "styled-components";

const PortfolioList = ({ user, isEditing }) => {
  return (
    <PortfolioListBlock>
      <Education user={user} isEditing={isEditing} />
      <Award user={user} isEditing={isEditing} />
      <Certificate user={user} isEditing={isEditing} />
    </PortfolioListBlock>
  );
};

export default PortfolioList;

const PortfolioListBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
