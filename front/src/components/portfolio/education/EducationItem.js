import { useContext } from "react";
import FieldDocumentBlock from "../common/FieldDocumentBlock";
import FieldListBlock from "../common/FieldListBlock";
import { EditContext } from "../../../contexts/EditContext";
import EducationEdit from "./EducationEditAdd";
import { FullRedBtn } from "../../common/Btns";

const EducationContainer = ({ datas }) => {
    const { isEditing} = useContext(EditContext);

    return (
        <FieldListBlock>
            <h1 className="fieldName">교육사항</h1>
                {datas.map((data) => (<EducationItem data={data} />))}
                {isEditing && <EducationEdit />}
        </FieldListBlock>
    )
}

export default EducationContainer;

const EducationItem = ({data}) => {
    return (
        <FieldDocumentBlock>
            <h1>{data.title}</h1>
            <h2>{data.date}</h2>
        </FieldDocumentBlock>
    )
}