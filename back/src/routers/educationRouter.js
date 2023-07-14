import { Router } from "express";
import { body } from "express-validator";

import { Education } from "../db/models/Education";
import { EducationService } from "../services/educationService";
import { login_required } from "../middlewares/login_required";

const educationRouter = Router();

// express-validator를 사용해서 req.body로 전달되는 입력값을 sanitize 합니다.
const sanitizeBody = body('**').escape();


// CRUD: CREATE
// 프론트엔드로부터 전달받은 학력사항 입력값을 사용자의 새로운 학력정보로 저장합니다.
educationRouter.post("/:user_id/education", sanitizeBody, login_required, async (req, res, next) => {
  try {
    const newEduData = req.body;

    // 라우트 매개변수인 user_id를 새로운 JSON 항목인 "userId: user_id"로 만들어 newEduData 객체에 추가해줍니다.
    newEduData["userId"] = req.currentUserId;

    const createdNewEducation = await Education.create({ newEduData });
    
    if(createdNewEducation.error){
      throw new Error(createdNewEducation.error);
    }
    
    res.status(200).json(createdNewEducation);
    return;
  }
  catch(error) {
    next(error);
  }
});


// CRUD: READ
// 프론트엔드로부터 전달받은 userId를 사용해서 해당 사용자의 학력정보를 모두 가져옵니다.
educationRouter.get("/:user_id/education", sanitizeBody, login_required, async (req, res, next) => {
  try {
    const userId = req.params.user_id;

    const foundUserEducations = await Education.findEducationByUserId({ userId });

    if (foundUserEducations.error) {
      throw new Error(foundUserEducations.error);
    }
    
    res.status(200).json(foundUserEducations);
    return;
  }
  catch(error) {
    next(error);
  }
});


// CRUD: READ
// 프론트엔드로부터 전달받은 eduId를 사용해서 단일 학력정보 항목을 찾아 가져옵니다.
educationRouter.get("/education/:edu_id", sanitizeBody, login_required, async (req, res, next) => {
  try {
    const eduId = req.params.edu_id;

    const foundEducation = await Education.findEducationByEduId({ eduId });
  
    if (foundEducation.error) {
      throw new Error(foundEducation.error);
    }

    res.status(200).json(foundEducation);
    return;
  }
  catch(error) {
    next(error);
  }
});


// CRUD: UPDATE
// 프론트엔드로부터 전달받은 최신 학력사항 입력값으로 기존 학력정보를 업데이트합니다.
educationRouter.put("/education/:edu_id", sanitizeBody, login_required, async (req, res, next) => {
  try {
    const updatedEduData = req.body;
    const eduId = req.params.edu_id;

    const updatedEducation = await Education.update({ eduId }, { updatedEduData });

    // eduId에 해당하는 document를 찾을 수 없는 경우에는, 에러를 반환하지 않고 정상처리 해버리는 현상이 있습니다.    
    // eduId에 해당하는 학력정보가 없는 경우 처리 해주어야 함  

    if (updatedEducation.error) {
      throw new Error(updatedEducation.error);
    }

    res.status(200).json(updatedEducation);
    return;
  }
  catch(error) {
    next(error);
  }
});


// CRUD: DELETE
// 프론트엔드로부터 전달받은 eduId를 사용해서 학력정보를 찾아 삭제합니다.
educationRouter.delete("/education/:edu_id", sanitizeBody, login_required, async (req, res, next) => {
  try {
    const eduId = req.params.edu_id;  

    const deletedEducation = await Education.delete({ eduId });

    // eduId에 해당하는 학력정보가 없는 경우 처리 해주어야 함

    if (deletedEducation.error) {
      throw new Error(deletedEducation.error);
    }

    res.status(200);
  }
  catch(error) {
    next(error);
  }
});

export { educationRouter };
