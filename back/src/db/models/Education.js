import { EducationModel } from "../schemas/education";

class Education {

  // 새로운 학력정보를 추가합니다. 

  static async create({ id, institution, degree, major, status, entryDate, gradDate, grade, description, sortOrder }) {
    // EducationSchema에서 정의된 필드에 해당되는 데이터로 새로운 학력정보 document를 만듭니다.
    const createdNewEducation = await EducationModel.create({
        id,
        institution, 
        degree, 
        major, 
        status,
        entryDate, 
        gradDate, 
        grade, 
        description,
        sortOrder
    });
    return createdNewEducation;
  }

  // 사용자의 ID로 학력정보를 찾아줍니다. 
  static async findEducationByUser({ user_id }) {
    // EducationSchema에서 정의된 사용자 ID 필드인 user_id를 사용해서 학력정보 document를 찾습니다.
    const foundNewEducation = await EducationModel.findOne({ user_id });
    return foundNewEducation;
  }

  // 학력정보를 업데이트합니다. 
  static async update({ user_id, fieldToUpdate, newValue }) {
    const filter = { id: user_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedEducation = await EducationModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedEducation;
  }

  // 학력정보를 삭제합니다.
  static async delete(eduId) {
    return EducationModel.findOneAndDelete({ user_id });
  }
}

export { Education };