import { addData, deleteData, updateData } from "./api";

export async function postDocument(
  fieldName,
  content,
  userId,
  setIsAdding,
  setDatas
) {
  try {
    await addData(userId, fieldName, content);
    setDatas((datas) => [...datas, content]);
    setIsAdding(false);
  } catch (err) {
    alert(err);
  }
}
// isEditing이 true 이다 => Userstate가 본인이다.
export async function updateDocument(
  documentId,
  fieldName,
  content,
  setDatas,
  setIsDocumentEditing
) {
  try {
    await updateData(documentId, fieldName, content);

    setDatas((datas) => {
      const olddatas = datas.filter(
        (origindata) => origindata._id !== documentId
      );
      return [...olddatas, content];
    });

    setIsDocumentEditing(false);
  } catch (err) {
    alert(`EDUCATION 데이터 PUT 요청 실패: ${err}`);
  }
}

export const deleteDocument = async (documentId, fieldName, setDatas) => {
  try {
    await deleteData(documentId, fieldName);
    setDatas((datas) => {
      const deleteddatas = datas.filter((origin) => origin._id !== documentId);
      return deleteddatas;
    });
  } catch (err) {
    alert("데이터 삭제 실패");
  }
};
