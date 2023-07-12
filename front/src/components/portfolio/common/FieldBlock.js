import { styled } from "styled-components";

const FieldBlock = ({ children }) => {
    <Block>
        <div>{children}</div>
        <div className="btns">
            <CompleteBtn>완료</CompleteBtn>
            <CancelBtn>취소</CancelBtn>
        </div>
    </Block>
};

export default FieldBlock;

const Block = styled.div`
    border: solid 2px black;
    border-radius: 8px;
    margin: 20px;
    display: flex;
    .btns {
        display: flex;
    }
`;

const CompleteBtn = styled.button`
    border-radius: 5px;
    background-color: rgb(115, 83, 234);
    color: #ffffff;
`

const CancelBtn = styled.button`
    border-radius: 5px;
    border: 2px solid rgb(115, 83, 234);
`