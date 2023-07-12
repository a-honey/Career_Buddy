import { CertificateModel } from "../schemas/certification";


class Certificate {
  // 새로운 자격증 추가
  static async create({ title,issuer,certDate }) {
    const createdNewCert = await CertificateModel.create({ title,issuer,certDate });
    // Certificate.create = new Cert
    return createdNewCert;
  }

  static async findOneById({ cert_id }) {
    const Cert = await CertificateModel.findOne({ id: cert_id });
    return Cert;
  }
  static async findOneByTitle({ title }) {
    const Cert = await CertificateModel.findOne({ title: title });
    return Cert;
  }
  static async update({ title, fieldToUpdate, newValue }) {
    const filter = { title: title };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedCert = await CertificateModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedCert;
  }
  static async delete({Cert_id}) {
        const deletedCert=await CertificateModel.findOneAndDelete({id:Cert_id})
        return deletedCert;
  }
  static async findAll() {
    const certificates = await CertificateModel.find({});
    return certificates;
  }
}

export { Certificate };
