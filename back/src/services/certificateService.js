// from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { Certificate } from "../db/certificate";


// 필요없다고 생각해 주석처리함
// import bcrypt from "bcrypt";
// import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

class CertificateService{
    // Create 자격증 생성
    static async addCertificate({title,issuer,certDate}){
        const certificate=await Certificate.findOne({title})
        if (certificate){
            const errorMessage="등록된 자격증입니다. 다른 자격증을 입력하세요."
        return {errorMessage}
        }
        // 새로운 자격증 생성.
        const newCertificate={title,issuer,certDate}
        //db에 저장
        const createdNewCertificate=await Certificate.create({newCertificate})
        createdNewCertificate.errorMessage=null;

        return createdNewCertificate;
    }
    static async delCertificate({title,issuer,certDate}){
        try{
            const delCertificate=await Certificate.findAndDelete({title:title})
        }
        catch(err){
            console.log(err)
            next(err)
        }

        
    }
    static async getCetficates(){
        //  _certificate.Certificate.findAll is not a function
        const certificates=await Certificate.findAll()
        return certificates;
    }

}

export { CertificateService };