import { Router } from "express";
import { EducationService } from "../services/educationService";
import { login_required } from "../middlewares/login_required";

const educationRouter = Router();

// CRUD: CREATE
// 프론트엔드로부터 전달받은 학력사항 입력값을 사용자의 새로운 학력정보로 저장합니다.
educationRouter.post("/:user_id/education", login_required, async (req, res) => {
  try {
    const newEduData = req.body;

    // 라우트 매개변수인 user_id를 새로운 JSON 항목인 "userId: user_id"로 만들어 newEduData 객체에 추가해줍니다.
    newEduData["userId"] = req.params.user_id;

    const createdNewEducation = await EducationService.addEducation(newEduData);

    res.status(200).json(createdNewEducation);
    return;
  }
  catch (error) {
    next(error);
  }
});


// CRUD: READ
// 프론트엔드로부터 전달받은 userId를 사용해서 해당 사용자의 학력정보를 모두 가져옵니다.
educationRouter.get("/:user_id/education", login_required, async (req, res) => {
  try {
    const userId = req.params.user_id;

    const foundUserEducations = await EducationService.getUserEducations(userId);

    res.status(200).json(foundUserEducations);
    return;
  }
  catch (error) {
    next(error);
  }
});


// CRUD: READ
// 프론트엔드로부터 전달받은 eduId를 사용해서 단일 학력정보 항목을 찾아 가져옵니다.
educationRouter.get("/education/:edu_id", login_required, async (req, res) => {
  try {
    const eduId = req.params.edu_id;

    const foundEducation = await EducationService.getEducation(eduId);
  
    res.status(200).json(foundUserEducations);
    return;
  }
  catch (error) {
    next(error);
  }
});


// CRUD: UPDATE
// 프론트엔드로부터 전달받은 최신 학력사항 입력값으로 기존 학력정보를 업데이트합니다.
educationRouter.put("/education/:edu_id", login_required, async (req, res) => {
  try {
    const updatedEduData = req.body;
    const eduId = req.params.edu_id;

    const updatedEducation = await EducationService.updateEducation(eduId, updatedEduData);

    res.status(200).json(updatedEducation);
    return;
  }
  catch (error) {
    next(error);
  }
});


// CRUD: DELETE
// 프론트엔드로부터 전달받은 eduId를 사용해서 학력정보를 찾아 삭제합니다.
educationRouter.delete("/education/:edu_id", async (req, res) => {
  try {
    const eduId = req.params.edu_id;  

    await EducationService.removeEducation('eduId');
    
    res.status(200);
  }
  catch (error) {
    next(error);
  }
});

export { educationRouter };
