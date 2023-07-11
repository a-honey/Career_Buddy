import { styled } from "styled-components";

const Footer = () => {
    return (
        <FooterBlock>
            <h1>TEAM03:: WEBWIZARDS</h1>
            <div>
            <ul className="front">
                <li key="front">FRONT</li>
                <li key="ah">정아현</li>
                <li key="jae">이재민</li>
            </ul>
            <ul className="back">
                <li key="back">BACK</li>
                <li key="dong">황동운</li>
                <li key="jun">김준섭</li>
                <li key="young">지영은</li>
            </ul>
            </div>
        </FooterBlock>
    )
};

export default Footer;

const FooterBlock = styled.div`
    background-color: yellow;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 250px;
    border-top: 1px solid #bababa;
    div {
        display: flex;
        ul {
            display: flex;
            flex-direction: column;
        }
    }
`