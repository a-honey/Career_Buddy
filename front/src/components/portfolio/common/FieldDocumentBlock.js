import { styled } from "styled-components";
import { EmptyBtn, FullBtn } from "../../common/Btns";
import { useContext } from "react";
import { EditContext } from "../../../contexts/EditContext";

const FieldDocumentBlock = ({ children }) => {
    const { isEditing } = useContext(EditContext);
    return(
    <Block>
        <div className="data">{children}</div>
        {isEditing && <div className="btns">
            <FullBtn>저장</FullBtn>
            <EmptyBtn>취소</EmptyBtn>
        </div> }
    </Block>
    )
};

export default FieldDocumentBlock;

const Block = styled.div`
    background-color: blue;
    padding: 20px 40px;
    border: solid 2px black;
    border-radius: 8px;
    margin: 20px;
    display: flex;
    position: relative;
    .data {
        background-color: yellow;
    }
    .btns {
        border-left: 1px solid black;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        right: 20px;
        top: 0;
        bottom: 0;
        width: 200px;
    }
`;