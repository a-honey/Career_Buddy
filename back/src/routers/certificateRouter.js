import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { CertificateService } from "../services/certificateService";
import {CertificateModel} from "../db/models/Certificate"
const certificateRouter = Router();
const mongoose = require('mongoose');
// Create
certificateRouter.put("/:id/certificate/register",async (req, res)=> {
  const id=req.params.id
  try {
    // const titleDuplicate = await CertificateModel.findOne({ title:req.body.title });
    // if (titleDuplicate){
    //   const errorMessage =
    //   "이미 등록된 자격증입니다.";
    // return { errorMessage };
    // }
      const newCertificate=await CertificateModel.create({
        id:id,
        title:req.body.title,
        issuer:req.body.issuer,
        certDate:req.body.certDate,
        expDate:req.body.expDate,
        certId:req.body.certId,
        description:req.body.description
      })
      const savedCertificate = await newCertificate.save();
      res.send({success:true});
    }
    catch (error) {
    res.status(500).json({ error: error.message });
  }
  // 전달 완료!
});

//Read
certificateRouter.get("/:id/certificate",
    async function (req, res) {
      try{
        const id=req.params.id;
        const certificateList=await CertificateModel.find({id})
        // id를 기반으로 사용자의 자격증 목록을 불러오고자 함
        res.status(200).send(certificateList)
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }

)
//Update
certificateRouter.put("/certificate/edit/:certDocId",async(req,res)=>{
  const certDocId=req.params.certDocId;
  const updateData=req.body;
  console.log(updateData)
  console.log(typeof certDocId,certDocId)
  const updateCertificate=await CertificateModel.findOneAndUpdate(
    {certDocId:certDocId},updateData)

    if(!updateCertificate){
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(updateCertificate)
    console.log(updateCertificate)
})
    
//Delete
certificateRouter.delete("/:id/certificate/delete",
async (req,res)=>{
  const id=req.params.id
  const title=req.body.title
  try {   
    // certificate스키마에는 certId가 존재하지만 자격증의 발급번호를 다루기 위한 필드라 사용자의 id와 자격증 이름을 기준으로 삭제함.
    const delCertificate=await CertificateModel.deleteMany({id,title})
    res.status(200).send(delCertificate)
  }catch(error){
    res.status(500).json({ error: error.message });
  }

})



export { certificateRouter };
