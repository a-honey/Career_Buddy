/*
import { useContext } from "react"
import { EditContext } from "../../../contexts/EditContext"

const FieldDocumentBtns = ({isDocumentEditing}) => {
    const { isEditing } = useContext(EditContext);

    return (
        <>
        {isEditing && 
            <div className="btns">
            {isDocumentEditing? 
                <>
                <FullBtn onClick={handleUpdateDocument}>완료</FullBtn>
                <EmptyBtn onClick={handleGetDocument}>초기화</EmptyBtn>
                <FullBtn onClick={() => {setIsDocumentEditing(false)}}>취소</FullBtn>
                </>
            : <>
                <FullBtn onClick={() => {setIsDocumentEditing(true)}}>수정</FullBtn>
                <FullRedBtn onClick={handleDeleteDocument}>삭제</FullRedBtn>
            </>
            }
            </div>
        }
        </>
    )
}
*/