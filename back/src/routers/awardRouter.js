import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import {Award} from "../db/models/Award"
import {routeSanitizer} from "../middlewares/routeSanitizer"
// import {CertificateModel} from "../schemas/certification"
const awardRouter = Router();
const mongoose = require('mongoose');

// Create
awardRouter.post("users/:user-id/awards",login_required,routeSanitizer,async (req, res)=> {
  //이때의 id는 유저의 id입니다. (_id 아님)
  // _id는 자동으로 생성됩니다.
  try {
      const userId=req.params.user-id;
      const newAward=await Award.create({
        userId:userId,
        title:req.body.title,
        issuer:req.body.issuer,
        awardDate:req.body.awardDate,
        description:req.body.description
      })
      const savedAward = await newAward.save();
      res.send({success:true});
    }
    catch (error) {
    res.status(500).json({ error: error.message });
  }
  // 전달 완료!
}
);

//Read
awardRouter.get("users/:user-id/awards",
    async function (req, res) {
      try{
        const userId=req.params.user-id;
        //이때의 user-id는 유저의 id입니다.
        const awardList=await Award.findById({userId})
        
        // id를 기반으로 사용자의 자격증 목록을 불러오고자 함
        res.status(200).json(awardList)
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }
)

// 에러는 아니지만 값이 변하지 않고 updatedAt 시간만 바뀌는 Update 부분
awardRouter.put("/awards/:doc-id",login_required,routeSanitizer,async(req,res)=>{
  const awardDocId=req.params.doc-id;
  const updateData=req.body;
  const currentUserId=req.currentUserId;
  if(!updateData || typeof updateData !== 'object'){
    throw new Error("입력된 수상 정보가 없거나 올바르지 않습니다.")
  }

  if(!currentUserId || currentUserId == null){
    throw new Error("현재 로그인한 사용자를 알 수 없습니다.")
  }
  const updateAward=await Award.updateOne(
    {awardDocId:awardDocId},updateData)
    if(!updateAward){
      return res.status(500).json({ error: error.message });
    }
    res.status(200).send({success:true});
})


//Delete
awardRouter.delete("/awards/:doc-id",login_required,routeSanitizer,
async (req,res)=>{
  const awardDocId=req.params.doc-id
  try {   
    const delAwards=await Award.deleteOne({awardDocId})
    res.status(200).send({success:true});
  }catch(error){
    res.status(500).json({ error: error.message });
  }

})



export { awardRouter}
