import { styled } from "styled-components";
import { EmptyBtn, FullBtn, FullRedBtn } from "../../common/Btns";
import { useContext, useState } from "react";
import { EditContext } from "../../../contexts/EditContext";

const FieldDocumentBlock = ({ children, fieldName, documentId, isDocumentEditing, setIsDocumentEditing}) => {
    const { isEditing} = useContext(EditContext);

    const handleDeleteDocument = (e) => {
        e.preventDefault();
        console.log(`education}의 ${documentId} 삭제 함수 실행`);
    };

    return(
    <Block>
        <div className="data">{children}</div>
        {isEditing && <div className="btns">
            {isDocumentEditing ||
                <>
                <FullBtn onClick={() => {setIsDocumentEditing(true)}}>수정</FullBtn>
                <FullRedBtn onClick={handleDeleteDocument}>삭제</FullRedBtn>
            </>}
        </div> }
    </Block>
    )
};

export default FieldDocumentBlock;

const Block = styled.div`
    background-color: blue;
    border: solid 2px black;
    border-radius: 8px;
    margin: 10px 20px;
    display: flex;
    position: relative;
    .data {
        background-color: yellow;
    }
    .btns {
        border-left: 1px solid black;
        display: flex;
        align-items: center;
        position: absolute;
        right: 20px;
        top: 0;
        bottom: 0;
        button {
            height: 50px;
            margin-right: 20px;
        };
    }
`;