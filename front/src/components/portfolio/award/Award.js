import Block from "../common/FieldDocumentBlock";

const AwardItem = () => {
  return (
    <div className="certificateItem">
      <h2>수상이력</h2>
      <h3>수상설명</h3>
    </div>
  );
};
const Award = () => {
  return (
    <Block>
      <h1>수상이력</h1>
      <AwardItem />
    </Block>
  );
};

export default Award;
