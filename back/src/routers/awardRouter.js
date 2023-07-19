import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import {Award} from "../db/models/Award"
import {routeSanitizer} from "../middlewares/routeSanitizer"
// import {CertificateModel} from "../schemas/certification"
const awardRouter = Router();
const mongoose = require('mongoose');

// Create
awardRouter.post("/users/:userid/awards",login_required,routeSanitizer,async (req, res)=> {
  //이때의 id는 유저의 id입니다. (_id 아님)
  // _id는 자동으로 생성됩니다.
  try {
      const userid=req.params.userid;
      const newAward=await Award.create({
        userId:userid,
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
awardRouter.get("/users/:userid/awards",
    async function (req, res) {
      try{
        const userId=req.params.userid;
        //이때의 id는 유저의 id입니다. 잘 불러와질지...
        const awardList=await Award.findById({userId})
        
        // id를 기반으로 사용자의 자격증 목록을 불러오고자 함
        res.status(200).json(awardList)
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      }
)

// 에러는 아니지만 값이 변하지 않고 updatedAt 시간만 바뀌는 Update 부분
awardRouter.put("/awards/:documentid",login_required,routeSanitizer,async(req,res)=>{
  const awardDocId=req.params.documentid;
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
awardRouter.delete("/awards/:documentid",login_required,routeSanitizer,
async (req,res)=>{
  const awardDocId=req.params.documentid
  try {   
    const delAwards=await Award.deleteOne({awardDocId})
    res.status(200).send({success:true});
  }catch(error){
    res.status(500).json({ error: error.message });
  }

})

const fileUpload = require('express-fileupload');
// const Grid = require('gridfs-stream');

// let gfs;
// const connection = mongoose.connection;

// connection.once('open', () => {
// gfs = Grid(connection.db, mongoose.mongo);
// gfs.collection('uploads');
// console.log('GridFS collection connected');
// });

// default options
awardRouter.use(fileUpload());
awardRouter.post('/awards/:documentid/file', async function(req, res) {
  const uploadedFile = req.files.file;
  const awardDocId=req.params.documentid

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('업로드할 파일이 없습니다.');
  }
  const existingFile=await Award.findByDocId({awardDocId})
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


  const addFile=await Award.addFile({awardDocId:awardDocId},existingFile.file)
  console.log("existingFile",existingFile,"\n")
  // console.log("addFile",addFile,"\n")

  if (!addFile) {
    return res.status(404).send('Award not found.');
  }
  return res.send({success:true})
}
);
// awardRouter.get('/awards/:documentid/preview',(req, res) => {
//   const fileId = req.params.documentid;
//   console.log(fileId)
//   gfs.files.findOne({ _id: fileId }, (err, file) => {
//     console.log(file)
//     if (!file || file.length === 0) {
//       return res.status(404).send('파일이 존재하지 않습니다.');
//     }

//     const readstream = gfs.createReadStream({ _id: fileId });
//     readstream.pipe(res);
//   });
// });






export { awardRouter };
