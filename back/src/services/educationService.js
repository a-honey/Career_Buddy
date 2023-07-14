import { Education } from "../db/models/Education";

// Education 클래스에서 정의된 CRUD 메소드들을 활용 및 확장하여, 실제 서비스에서 사용되는 '기능'들을 구체적으로 구현합니다.
class EducationService {

  // 사용자가 학력정보를 추가하는 기능을 구현합니다.
  static async addEducation({ newEduData }) {
    try {
      // 입력받은 newEduData가 올바른지를 검증합니다.

      // [의문] 검증을 어떻게 해야하는가? 그 기준은?
      // 1. 데이터가 비어있는가? 데이터가 json 타입인게 확실한가?
      // 2. 데이터가 스키마에 부합하는가? (이건 mongoose에서 validation을 별도로 하지 않나?)
      // 3. input sanitization

      // Education 클래스의 create() 메소드를 사용해서 document를 생성합니다.
      const createdNewEducation = await Education.create({ newEduData });

      // mongoose 모델이 작동하다가 오류가 발생했을 경우 이를 처리합니다.
      if(Education.error){
          throw new Error(Education.error);
      }

      return createdNewEducation;
    }
    catch(error) {
      return error;
    }
  }

  // 사용자의 학력정보 전체를 불러오는 기능을 구현합니다.
  static async getUserEducations({ userId }) {
    try {
      // [의문] userId 입력값 검증이 필요한가? 필요하다면 서비스에서 필요한가 라우터에서 필요한가?

      // Education 클래스의 findEducationByUserId() 메소드를 사용해서 document를 생성합니다.
      const foundUserEducations = await Education.findEducationByUserId({ userId });
      
      // 입력받은 userId에 해당되는 학력정보 document가 있는가? 없는경우 어떻게 핸들링할 것인가?

      // mongoose 모델이 작동하다가 오류가 발생했을 경우 이를 처리합니다.
      if (Education.error) {
        throw new Error(Education.error);
      }
      
      return foundUserEducations;
    }
    catch(error) {
        return error; 
    }
  }

  // 특정 학력정보를 불러오는 기능을 구현합니다.
  static async getEducation({ eduId }) {
    try {
      // [의문] eduId 입력값 검증이 필요한가? 필요하다면 서비스에서 필요한가 라우터에서 필요한가?

      // Education 클래스의 findEducationByUserId() 메소드를 사용해서 document를 생성합니다.
      const foundEducation = await Education.findEducationByEduId({ eduId });

      // 입력받은 eduId에 해당되는 학력정보 document가 있는가? 없는경우 어떻게 핸들링할 것인가?

      // mongoose 모델이 작동하다가 오류가 발생했을 경우 이를 처리합니다.
      if (Education.error) {
        throw new Error(Education.error);
      }

      return foundEducation;
    }
    catch(error) {
        return error; 
    }
  }

  // 특정 학력정보를 업데이트하는 기능을 구현합니다.
  static async updateEducation({ eduId }) {
    try {
      // [의문] eduId 입력값 검증이 필요한가? 필요하다면 서비스에서 필요한가 라우터에서 필요한가?
      
      // Education 모델의 update() 메소드를 사용해서 document를 생성합니다.
      const updatedEducation = await Education.update({ eduId }, { updatedEduData });

      // eduId에 해당하는 document를 찾을 수 없는 경우에는, 에러를 반환하지 않고 정상처리 해버리는 현상이 있습니다.
      // 예외처리 추가가 필요합니다.
      
      // mongoose 모델이 작동하다가 오류가 발생했을 경우 이를 처리합니다.
      if (Education.error) {
        throw new Error(Education.error);
      }

      return updatedEducation;
    }
    catch(error) {
        return error; 
    }
  }

  // 특정 학력정보를 삭제하는 기능을 구현합니다.
  static async removeEducation({ eduId }) {
    const deletedEducation = await Education.delete({ eduId });

    // mongoose 모델이 작동하다가 오류가 발생했을 경우 이를 처리합니다.
    if (Education.error) {
      throw new Error(Education.error);
    }

    return;
  }
}

export { educationService };