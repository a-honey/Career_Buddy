import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import {Certification} from "../db/models/Certificate"
import {routeSanitizer} from "../middlewares/routeSanitizer"

const certificateRouter = Router();
const mongoose = require('mongoose');

// Create
certificateRouter.post("/users/:userid/certificates",login_required,routeSanitizer,async (req, res)=> {
  //이때의 id는 유저의 id입니다. (_id 아님)
  // _id는 자동으로 생성됩니다.
  try {
      const userId=req.params.userid
      const newCertificate=await Certification.create({
        userId:userId,
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
certificateRouter.get("/users/:userid/certificates",
    async function (req, res) {
      try{
         const userId=req.params.userid
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
certificateRouter.put("/certificates/:documentid",login_required,routeSanitizer,async(req,res)=>{
  const certDocId=req.params.documentid;
  const updateData=req.body;

  const updateCertificate=await Certification.updateOne(
    {certDocId:certDocId},updateData)
    if(!updateCertificate){
      return res.status(500).json({ error: error.message });
    }
    res.status(200).send({success:true});
})


//Delete
certificateRouter.delete("/certificates/:documentid",login_required,routeSanitizer, routeSanitizer,
async (req,res)=>{
  const certDocId=req.params.documentid
  try {   
    const delCertificate=await Certification.deleteOne({certDocId})
    res.status(200).send({success:true});
  }catch(error){
    res.status(500).json({ error: error.message });
  }

})

const fileUpload = require('express-fileupload');
// default options
certificateRouter.use(fileUpload({
  limits: { fileSize: 10 * 1024 * 1024 }, // 최대 파일 크기 제한을 설정합니다.
  abortOnLimit: true, // 파일 크기 제한에 도달하면 요청 중단 여부를 설정합니다
}));
certificateRouter.post('/certificates/:documentid/file', async function(req, res) {
  const uploadedFile = req.files.file;
  const certDocId=req.params.documentid

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('업로드할 파일이 없습니다.');
  }
  const existingFile=await Certification.findByDocId({certDocId})
  console.log("uploadedFile",uploadedFile,"\n")
  if(!existingFile){
    return res.status(404).send('존재하지 않는 데이터에 추가할 수 없습니다.');
  }

  existingFile.file={
    name:uploadedFile.name,
    data:uploadedFile.data
  }
  const fileData=existingFile.file.data
  const fileName=existingFile.file.name


  const addFile=await Certification.addFile({certDocId:certDocId},existingFile.file)
  console.log("existingFile",existingFile,"\n")
  // console.log("addFile",addFile,"\n")

  if (!addFile) {
    return res.status(404).send('Certifiate not found.');
  }
  return res.send({success:true})
}
);
export { certificateRouter}
