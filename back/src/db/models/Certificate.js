import { CertificateModel } from "../schemas/certification";

class Certificate {
  // 새로운 자격증 추가
  static async create({title,issuer,certDate}) {
    const createdNewCert = await CertificateModel.create({
      title,
      issuer,
      certDate
    });
    return createdNewCert;
  }

  static async findOneById({ user_id }) {
    const Cert = await CertificateModel.findOne({ id:user_id });
    return Cert;
  }
  static async findOneByTitle({ title }) {
    const Cert = await CertificateModel.findOne({ title });
    return Cert;
  }
  static async update({ user_id, fieldToUpdate, newValue }) {
    const filter = { title: user_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedCert = await CertificateModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedCert;
  }
  static async delete({title}) {
        const deletedCert=await CertificateModel.findOneAndDelete({title:title})
        return deletedCert;
  }
  static async findAll() {
    const certificates = await CertificateModel.find({});
    return certificates;
  }
}

export { CertificateModel };
