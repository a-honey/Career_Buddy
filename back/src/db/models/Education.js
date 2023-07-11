import { EducationModel } from "../schemas/education";

class Education {

  // 새로운 학력정보를 추가합니다.
  static async create({ user_id, institution, degree, major, entryDate, gradDate, grade, description }) {
    // EducationSchema에서 정의된 필드에 해당되는 데이터로 새로운 MongoDB document를 만듭니다.
    const createdNewEducation = await EducationModel.create({
        user_id,
        institution, 
        degree, 
        major, 
        entryDate, 
        gradDate, 
        grade, 
        description
    });
    return createdNewEducation;
  }

  // 사용자의 ID로 학력정보를 찾아줍니다. 
  static async findEducationByUser({ user_id }) {
    const foundNewEducation = await EducationModel.findOne({ user_id });
    return foundNewEducation;
  }

}

export { Education };