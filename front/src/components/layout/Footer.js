import { styled } from "styled-components";

const Footer = () => {
    return (
        <FooterBlock>
            <div>footer입니다.</div>
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
    height: 100px;
`