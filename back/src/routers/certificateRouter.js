import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { CertificateService } from "../services/certificateService";
import {CertificateModel} from "../db/models/Certificate"
const certificateRouter = Router();

certificateRouter.get("/:id/certificate",
    async function (req, res) {
        const id=req.params.id;
        const certificate=await CertificateModel.find({id})
        // id를 기반으로 사용자의 자격증 목록을 불러오고자 함
        res.json(certificate)
        }
)

    
certificateRouter.put("/:id/certificate/register",async (req, res)=> {
    const id=req.params.id
    try {    
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
      res.send(savedCertificate);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
    // 전달 완료!
  });



certificateRouter.delete("/:id/certificate/delete",async function(req,res){
  res.send('deletepage')
})


export { certificateRouter };
