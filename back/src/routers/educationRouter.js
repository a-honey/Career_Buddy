import { Router } from "express";
import { body, param, ValidateResult } from "express-validator";

import { Education } from "../db/models/Education";
import { EducationService } from "../services/educationService";
import { login_required } from "../middlewares/login_required";

const educationRouter = Router();

// [참고] 
// 프레젠터 레벨에서는 schema와 data type등 ODM 관점의 input validation을 수행합니다.
// 서비스 레벨에서는 프로덕트 정책과 관련된 비즈니스 로직 validation을 수행합니다. userService.js를 참조하세요.

// req.body와 req.param의 모든 요소들을 sanitize 하는 미들웨어를 express-validator를 사용해 만들어 라우터에 적용합니다.
const sanitizeRoute= () => {
  body('**').escape();
  param('**').escape();
}


// CRUD: CREATE
// 프론트엔드로부터 전달받은 학력사항 입력값을 사용자의 새로운 학력정보로 저장합니다.
educationRouter.post("/:user_id/education", sanitizeRoute, login_required, async (req, res, next) => {
  try {
    const newEduData = req.body;
    const currentUserId = req.currentUserid;

    if(!newEduData || typeof newEduData !== 'object'){
      throw new Error("입력된 학력 정보가 없거나 올바르지 않습니다.")
    }

    if(!currentUserId){
      throw new Error("현재 로그인한 사용자를 알 수 없습니다.")
    }
    
    const createdNewEducation = EducationService.addEducation(currentUserId, newEduData);
    
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
educationRouter.get("/:user_id/education", sanitizeRoute, login_required, async (req, res, next) => {
  try {
    // 사용자 본인이 아닌 타인의 학력정보도 열람할 수 있는 상황이므로 req.currentUserId를 사용하지 않습니다.
    const userId = req.params.user_id;
    
    // 사용자 본인이 아니더라도 타인의 학력정보를 열람할 수 있는 상황이므로 getEducation 서비스를 사용하지 않습니다.
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
educationRouter.get("/education/:edu_id", sanitizeRoute, login_required, async (req, res, next) => {
  try {
    const eduId = req.params.edu_id;

    // 사용자 본인이 아니더라도 타인의 학력정보를 열람할 수 있는 상황이므로 getEducation 서비스를 사용하지 않습니다.
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
educationRouter.put("/education/:edu_id", sanitizeRoute, login_required, async (req, res, next) => {
  try {
    const currentUserId = req.currentUserId;
    const eduId = req.params.edu_id;
    const updatedEduData = req.body;

    if(!updatedEduData || typeof updatedEduData !== 'object'){
      throw new Error("입력된 학력 정보가 없거나 올바르지 않습니다.")
    }

    if(!eduId){
      throw new Error("사용자의 학력 정보를 특정할 수 없습니다.")
    }

    if(!currentUserId){
      throw new Error("현재 로그인한 사용자를 알 수 없습니다.")
    }

    const updatedEducation = await Education.update(currentUserId, eduId, updatedEduData);

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
educationRouter.delete("/education/:edu_id", sanitizeRoute, login_required, async (req, res, next) => {
  try {
    const currentUserId = req.currentUserId;
    const eduId = req.params.edu_id;

    const deletedEducation = await Education.delete(currentUserId, eduId);

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
