import FieldDocumentBlock from "../common/FieldDocumentBlock";
import FieldListBlock from "../common/FieldListBlock";

const EducationContainer = ({ datas }) => {
    return (
        <FieldListBlock>
            <h1 className="fieldName">교육사항</h1>
                {datas.map((data) => <EducationItem data={data} />)}
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