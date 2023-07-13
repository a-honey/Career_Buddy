import Block from "../common/FieldDocumentBlock";

const CertificateItem = () => {
    return(
        <div className="certificateItem">
            <h2>자격증1</h2>
            <h3>자격증설명</h3>
        </div>
    )
}
const Certificate = () => {
    return(
        <Block>
            <h1>자격증</h1>
            <CertificateItem />
        </Block>
    )
}

export default Certificate;