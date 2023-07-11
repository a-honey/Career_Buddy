import Education from "./education/Education";
import Award from "./award/Award";
import Certificate from "./certificate/Certificate";
import { styled } from "styled-components";

const PortfolioList = ({ user }) => {
    return (
        <PortfolioListBlock>
            <Education user={user} />
            <Award user={user} />
            <Certificate user={user} />
        </PortfolioListBlock>
    )
}

export default PortfolioList;

const PortfolioListBlock = styled.div`
    background-color: pink;
    display: flex;
    flex-direction: column;
    width: 100%;
`