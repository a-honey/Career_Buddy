import { styled } from "styled-components";
import Footer from "../components/common/Footer";
import Header from "../components/common/Header";

const LayoutPage = ({children}) => {
    return (
        <LayoutPageBlock>
        <header >
            <Header />
        </header>
        <main style={{paddingTop: "50px", paddingBottom: "250px"}}>
            {children}
        </main>
        <footer style={{position: "relative"}}>
            <Footer />
        </footer>
        </LayoutPageBlock>
    )
};

export default LayoutPage;

const LayoutPageBlock = styled.div`

`