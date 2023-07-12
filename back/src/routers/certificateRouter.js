import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { CertificateService } from "../services/certificateService";
import {Certificate} from "../db/models/Certificate"
const certificateRouter = Router();

certificateRouter.get("/:id/certificate",
    async function (req, res, next) {
      try {
            const user_id=req.params.id;
            // 전체 사용자 목록을 얻음
            const certificates = await CertificateService.getCetificate({user_id:user_id});
            // res.status(200).send(certificates);
            res.send('hi')
          } catch (error) {
            next(error);
          }

        }
    )
certificateRouter.put(
  "/:id/certificate/register", 
  async function (req, res, next) {
        const user_id=req.params.id;
        const title=req.body.title
        const issuer=req.body.issuer
        const certDate=req.body.certDate
        await Certificate.create({
          user_id:user_id,title:title,issuer:issuer,certDate:certDate
        })
        if (newCertificate.errorMessage) {
            throw new Error(newUser.errorMessage);
          }
        res.status(201).send(newCertificate)
})
export { certificateRouter };
