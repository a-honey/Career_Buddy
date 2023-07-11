import { styled } from "styled-components";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";

const LayoutPage = ({children}) => {
    return (
        <LayoutPageBlock>
        <header>
            <Header />
        </header>
        <main style={{marginTop: "50px"}}>
            {children}
        </main>
        <footer>
            <Footer />
        </footer>
        </LayoutPageBlock>
    )
};

export default LayoutPage;

const LayoutPageBlock = styled.div`
    background-color: gray;
    padding: 0 200px;
    margin: 0 auto;
`