import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import {Certification} from "../db/models/CertificateModel"
import { routeSanitizer } from "../middlewares/routeSanitizer"; 
const certificateRouter = Router();
const mongoose = require('mongoose');

// Create
certificateRouter.post("/:userId/certificate",login_required, routeSanitizer,async (req, res)=> {
  //이때의 id는 유저의 id입니다. (_id 아님)
  // _id는 자동으로 생성됩니다.
  try {
      const currentUserId=req.currentUserId;
      const certData=req.body;
      if(!certData || typeof certData !== 'object'){
        throw new Error("입력된 자격증 정보가 없거나 올바르지 않습니다.")
      }
  
      if(!currentUserId || currentUserId == null){
        throw new Error("현재 로그인한 사용자를 알 수 없습니다.")
      }
  
      if(currentUserId !== req.params.userId){
        throw new Error("현재 로그인한 사용자가 보낸 요청이 아닙니다.")
      } 
      
      const newCertificate=await Certification.create({
        userId:currentUserId,
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
}
);

//Read
certificateRouter.get("/:userId/certificates",
    async function (req, res) {
      try{
        const userId=req.params.userId;
        //이때의 id는 유저의 id입니다. 잘 불러와질지...
        const certificateList=await Certification.findById({userId})

        // id를 기반으로 사용자의 자격증 목록을 불러오고자 함
        res.status(200).json(certificateList)
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }
)
//Update
certificateRouter.put("/certificate/:certDocId",login_required, routeSanitizer,async(req,res)=>{
  const certDocId=req.params.certDocId;
  const updateData=req.body;
  // const currentUserId=req.currentUserId;
  // if(!updateData || typeof updateData !== 'object'){
  //   throw new Error("입력된 자격증 정보가 없거나 올바르지 않습니다.")
  // }

  // if(!currentUserId || currentUserId == null){
  //   throw new Error("현재 로그인한 사용자를 알 수 없습니다.")
  // }

  // if(currentUserId !== req.params.userId){
  //   throw new Error("현재 로그인한 사용자가 보낸 요청이 아닙니다.")
  // }    
  const updateCertificate=await Certification.updateOne(
    {certDocId:certDocId},updateData)
    if(!updateCertificate){
      return res.status(500).json({ error: error.message });
    }
    res.status(200).send({success:true})
})


//Delete
certificateRouter.delete("/certificates/:certDocId",login_required, routeSanitizer,
async (req,res)=>{
  const certDocId=req.params.certDocId
  // const currentUserId=req.currentUserId;
  // const certData=req.body;
  // if(!certData || typeof certData !== 'object'){
  //   throw new Error("입력된 자격증 정보가 없거나 올바르지 않습니다.")
  // }

  // if(!currentUserId || currentUserId == null){
  //   throw new Error("현재 로그인한 사용자를 알 수 없습니다.")
  // }

  // if(currentUserId !== req.params.userId){
  //   throw new Error("현재 로그인한 사용자가 보낸 요청이 아닙니다.")
  // } 
  try {   
    const delCertificate=await Certification.deleteOne({certDocId})
    res.status(200).send({success:true})
  }catch(error){
    res.status(500).json({ error: error.message });
  }

})



export { certificateRouter}
