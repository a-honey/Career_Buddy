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
  static async updateOne({ id, fieldToUpdate, newValue }) {
    const filter = { id: id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedCert = await CertificateModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedCert;
  }
  static async delete({id,title}) { 
    const deletedCert=await CertificateModel.findOneAndDelete({id:id,title:title})
    return deletedCert;
  }
  static async findAll() {
    const certificates = await CertificateModel.find({});
    return certificates;
  }
}

export { CertificateModel };
