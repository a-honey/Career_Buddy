import { styled } from "styled-components";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";

const LayoutPage = ({children}) => {
    return (
        <LayoutPageBlock>
        <header >
            <Header />
        </header>
        <main style={{paddingTop: "50px"}}>
            {children}
        </main>
        <footer style={{paddingBottom: "100px"}} >
            <Footer />
        </footer>
        </LayoutPageBlock>
    )
};

export default LayoutPage;

const LayoutPageBlock = styled.div`
    position: relative;
    background-color: gray;
    padding: 0 200px;
    margin: 0 auto;
`