import Education from "./education/Education";
import Award from "./award/Award";
import Certificate from "./certificate/Certificate";
import { styled } from "styled-components";
import { EducationContextProvider } from "../../contexts/EducationContext";

const PortfolioList = ({ user, isEditing }) => {
  return (
    <PortfolioListBlock>
      <EducationContextProvider>
        <Education user={user} isEditing={isEditing} />
      </EducationContextProvider>
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
