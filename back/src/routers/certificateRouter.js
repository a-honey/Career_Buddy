import is from "@sindresorhus/is";
import { Router } from "express";
// import { login_required } from "../middlewares/login_required";
import { CertificateService } from "../services/certificateService";


const certificateRouter = Router();

certificateRouter.get("/certificates/user",
    async function (req, res, next) {
        try {
            // 전체 사용자 목록을 얻음
            //  _certificate.Certificate.findAll is not a function
            const certificates = await CertificateService.getCetficates();
            res.status(200).send(certificates);
          } catch (error) {
            next(error);
          }

        }
    )
certificateRouter.post("/certificate/user/register", async function (req, res, next) {
    try {
        if (is.emptyObject(req.body)) {
          throw new Error(
            "headers의 Content-Type을 application/json으로 설정해주세요"
          );
        }
        const title=req.body.title
        const issuer=req.body.issuer
        const certDate=req.body.certDate

        const newCertificate=await CertificateService.addCertificate({
            title,
            issuer,
            certDate,
        })
        if (newCertificate.errorMessage) {
            throw new Error(newUser.errorMessage);
          }
        res.status(201).json(newCertificate)
    }catch(err){
        next(err)
    }
})
export { certificateRouter };
