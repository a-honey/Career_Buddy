import { CertificateModel } from "../schemas/certification";

class Certificate {
  // 새로운 자격증 추가
  static async create({title,issuer,certDate,expDate,certId,description}) {
    const createdNewCert = await CertificateModel.create({
      title,
      issuer,
      certDate,expDate,certId,description
    });
    return createdNewCert;
  }

  static async findOneById({ id }) {
    const Cert = await CertificateModel.findOne({ id:id });
    return Cert;
  }
  static async findOneByTitle({ title }) {
    const Cert = await CertificateModel.findOne({ title });
    return Cert;
  }
  static async updateOne({ cert_id},{newValue}) {
    const filter = { _id: cert_id };
    // _id에 cert_id값을 받아옴
    const update = { $set: newValue } ;
    const option = { returnOriginal: false };
    // 업데이트 되기 이전의 문서는 반환하지 않음
  
    const updatedCert = await CertificateModel.findOneAndUpdate(
      filter,
      update,
      option,
      {"new":true}
    );
    return updatedCert;
  }

  static async deleteMany({id,title}) { 
    const filter={id:id,title:title}
    const deletedCert=await CertificateModel.deleteMany(filter)
    return deletedCert;
  }
  static async findAll() {
    const certificates = await CertificateModel.find({});
    return certificates;
  }
}

export { CertificateModel };
