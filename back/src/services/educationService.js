import { Education } from "../db/models/Education";

// Education 클래스에서 정의된 CRUD 메소드들을 활용 및 확장하여, 실제 서비스에서 사용되는 '기능'들을 구체적으로 구현합니다.
class EducationService {

  // [CRUD] CREATE
  // 사용자가 자신의 학력사항을 추가하는 기능을 구현합니다.
  static async addEducation(currentUserId, newEduData) {
    try {
      // 현재 로그인된 사용자의 ID를 새로운 필드인 "userId"의 값으로 만들어 newEduData 객체에 추가해줍니다.
      newEduData["userId"] = currentUserId;

      const addedEducation = await Education.create({ newEduData });
      return addedEducation;
    }
    catch(error) {
      throw new Error(error);
    }
  }

  // [CRUD] READ
  // 사용자가 자신의 모든 학력사항을 보는 기능을 구현합니다.
  static async getEducation(currentUserId) {
    try {
      const targetDocuments = await Education.findEducationByUserId(currentUserId);

      // [보안] 업데이트를 요청한 사용자와 모든 학력정보 document들의 소유자가 일치하는지를 검증합니다.
      targetDocuments.forEach(element => {
        if(currentUserId !== element.userId){
          throw new Error("현재 로그인한 사용자는 해당 정보를 열람할 권한이 없습니다.")
        }
      });
      
      // 검증이 통과되면 모든 document들을 반환합니다.
      return targetDocuments;
    }
    catch(error) {
      throw new Error(error);
    }
  }

  // [CRUD] UPDATE
  // 사용자가 자신의 학력사항을 수정하는 기능을 구현합니다.
  static async modifyEducation(currentUserId, eduId, updatedEduData) {
    try {
      // 해당 eduId로 document 검색을 시도합니다.
      const targetDocument = await EducationModel.findOne({ _id: eduId })
      
      // 만약 document가 없다면 오류를 생성합니다.
      if(!targetDocument){
        throw new Error("수정할 학력정보를 찾을 수 없습니다.")
      }

      // [보안] 업데이트를 요청한 사용자와 학력정보 document의 소유자가 일치하는지를 검증합니다.
      if(currentUserId !== targetDocument.userId){
        throw new Error("현재 로그인한 사용자는 해당 정보를 수정할 권한이 없습니다.")
      }

      // 검증이 통과되면 document를 최신화합니다.
      const modifiedEducation = await Education.update(eduId, updatedEduData);
      return modifiedEducation;
    }
    catch(error) {
      throw new Error(error);
    }
  }

  // [CRUD] DELETE
  // 사용자가 자신의 학력사항을 삭제하는 기능을 구현합니다.
  static async removeEducation(currentUserId, eduId) {
    try {
      // 해당 eduId로 document 검색을 시도합니다.
      const targetDocument = await EducationModel.findOne({ _id: eduId })

      // 만약 document가 없다면 오류를 생성합니다.
      if(!targetDocument){
        throw new Error("삭제할 학력정보를 찾을 수 없습니다.")
      }

      // [보안] 업데이트를 요청한 사용자와 학력정보 document의 소유자가 일치하는지를 검증합니다.
      if(currentUserId !== targetDocument.userId){
        throw new Error("현재 로그인한 사용자는 해당 정보를 수정할 권한이 없습니다.")
      }

      // 검증이 통과되면 document를 삭제합니다.
      const removedEducation = await Education.delete(eduId);
      return;
    }
    catch(error) {
      throw new Error(error);
    }
  }

}

export { EducationService };