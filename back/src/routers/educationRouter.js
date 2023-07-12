import { Router } from "express";
import { Education } from "../db/models/Education";
import { educationService } from "../services/educationService";

const educationRouter = Router();

educationRouter.put("/:id/education", async(req, res)=>{  

    const eduData = req.body;
    const id = req.params.id;
    
    await Education.create({
        id: id,
        institution: eduData.institution, 
        degree: eduData.degree,
        major: eduData.major,
        status: eduData.status,
        entryDate: eduData.entryDate,
        gradDate: eduData.gradDate,
        grade: eduData.grade,
        description: eduData.description,
        sortOrder: eduData.sortOrder,
    });

    res.send("데이터베이스에 정상적으로 추가되었습니다.")
});

export { educationRouter };
