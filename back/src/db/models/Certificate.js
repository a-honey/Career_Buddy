import { CertificateModel } from "../schemas/certification";

class Certificate {
  // 새로운 자격증 추가
  // certDocId 사용하지 않음
  static async create({title,issuer,certDate,expDate,certId,description}) {
    const createdNewCert = await CertificateModel.create({
      title,
      issuer,
      certDate,expDate,certId,description
    });
    return createdNewCert;
  }

  static async updateOne({certDocId},{newValue}) {
    const filter = { _id: certDocId};
    // _id에 certDocId를 받아옴
    const update = { $set: newValue } ;
    const option = { returnOriginal: false };
    // 업데이트 되기 이전의 문서는 반환하지 않음
  
    const updatedCert = await CertificateModel.findOneAndUpdate(
      filter,
      update,
      option,{new:true}
    );
    return updatedCert;
  }

  static async deleteOne({certDocId}) { 
    const filter = { _id: certDocId};
    const deletedCert=await CertificateModel.findOneAndDelete(filter)
    return deletedCert;
  }
  static async findAll() {
    const certificates = await CertificateModel.find({});
    return certificates;
  }
}

export { CertificateModel };
