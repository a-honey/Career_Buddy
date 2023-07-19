import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { routeSanitizer } from "../middlewares/routeSanitizer";
import { userAuthService } from "../services/userService";
import { UserModel } from "../db";

const path = require('path');
const fs = require('fs');
const multer = require('multer');
const randomstring = require("randomstring");

// multer를 설정합니다.
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // path 모듈을 활용해 절대 경로를 기반으로 추가적인 상대 경로를 조합해주어야 합니다.
    // 현재 working directory는 /back/src/routers/ 입니다.
    // working directory의 절대 경로에다가 ../uploads/ 라는 상대 경로를 추가해줍니다.
    cb(null, path.join(__dirname, '../uploads'))
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + randomstring.generate() + ".jpg")
  }
})

// [보안] 업로드된 파일의 MIME type을 감지해서 JPEG 형식의 이미지 파일만 받아들입니다. 테스트 완료.
let upload = multer({ 
  storage: storage,
  fileFilter: function (req, file, cb) {
    const filetypes = /jpg|jpeg/;
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype) {
      return cb(null, true);
    } else {
      cb('JPG 파일만 업로드 가능합니다.');
    }
  },
 });

const userAuthRouter = Router();

userAuthRouter.post("/user/register", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const social = req.body.social;
    const imgUrl = req.body.imgUrl;

    // 위 데이터를 유저 db에 추가하기
    const newUser = await userAuthService.addUser({
      name,
      email,
      password,
      social,
      imgUrl,
    });

    if (newUser.errorMessage) {
      throw new Error(newUser.errorMessage);
    }

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.post("/user/login", async function (req, res, next) {
  try {
    // req (request) 에서 데이터 가져오기
    const email = req.body.email;
    const password = req.body.password;

    // 위 데이터를 이용하여 유저 db에서 유저 찾기
    const user = await userAuthService.getUser({ email, password });

    if (user.errorMessage) {
      throw new Error(user.errorMessage);
    }

    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.get("/userlist", async function (req, res, next) {
  try {
    // server-side offset pagination을 위한 page와 limit의 초기값을 지정해주고, 쿼리 입력값을 반영해줍니다.
    const { page = 1, limit = 10 } = req.query;
    
    // 전체 사용자 목록을 얻음   
    const paginatedUsers = await userAuthService.getUsers(page, limit);

    if (paginatedUsers.errorMessage) {
      throw new Error(paginatedUsers.errorMessage);
    }

    res.status(200).send(paginatedUsers);

  } catch (error) {
    next(error);
  }
});

userAuthRouter.get(
  "/user/current",
  login_required,
  async function (req, res, next) {
    try {
      // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
      const user_id = req.currentUserId;
      const currentUserInfo = await userAuthService.getUserInfo({
        user_id,
      });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

      res.status(200).send(currentUserInfo);
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.put(
  "/users/:id",
  login_required,
  async function (req, res, next) {
    try {
      // URI로부터 사용자 id를 추출함.
      const user_id = req.params.id;
      // body data 로부터 업데이트할 사용자 정보를 추출함.
      const name = req.body.name ?? null;
      const email = req.body.email ?? null;
      const password = req.body.password ?? null;
      const description = req.body.description ?? null;
      const social = req.body.social ?? null;
      const imgUrl = req.body.imgUrl ?? null;

      const toUpdate = { name, email, password, description, social, imgUrl };

      // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedUser = await userAuthService.setUser({ user_id, toUpdate });

      if (updatedUser.errorMessage) {
        throw new Error(updatedUser.errorMessage);
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.get(
  "/users/:id",
  login_required,
  async function (req, res, next) {
    try {
      const user_id = req.params.id;
      const currentUserInfo = await userAuthService.getUserInfo({ user_id });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

      res.status(200).send(currentUserInfo);
    } catch (error) {
      next(error);
    }
  }
);

// jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
userAuthRouter.get("/afterlogin", login_required, function (req, res, next) {
  res
    .status(200)
    .send(
      `안녕하세요 ${req.currentUserId}님, jwt 웹 토큰 기능 정상 작동 중입니다.`
    );
});


// 임시로 지정한 URL
userAuthRouter.put("/user/:user_id/password",
login_required,
async function (req, res, next) {
  try{
    // 현재 로그인한 id. 833396cc~
    const currentUserId=req.currentUserId;
    const user_id=req.params.user_id
    const email=req.body.email;
    const inputPassword= req.body.inputPassword;
    const newPassword=req.body.newPassword;
    const updatedPassword=await userAuthService.setPassword(
      {user_id,email,inputPassword,newPassword}
    )
    // 현재 로그인한 사용자의 id와 url로 전달받은 user_id가 다를 경우 -확인 완료
    if (currentUserId!==user_id){
      throw new Error("현재 로그인한 사용자가 아닙니다.")
    }
    if (updatedPassword.errorMessage){
      throw new Error(updatedPassword.errorMessage)
    }
    res.status(200).json(updatedPassword)
  } catch (error) {
    next(error);
  }

})


// 회원 탈퇴를 수행합니다.
userAuthRouter.delete("/user/deletion", routeSanitizer, login_required, async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error("headers의 Content-Type을 application/json으로 설정해주세요");
    }

    const currentUserId = req.currentUserId ?? null;
    const inputEmail = req.body.inputEmail ?? null;
    const inputPassword = req.body.inputPassword ?? null;

    const deletedUser = await userAuthService.deleteUser({ currentUserId, inputEmail, inputPassword });

    if (deletedUser.error) {
      throw new Error(deletedUser.error);
    }

    res.status(200).send("사용자 계정 삭제가 완료되었습니다.");
  }
  catch(error){
    next(error);
  }
});


// 비밀번호 초기화를 수행합니다.
userAuthRouter.put("/user/resetpassword", routeSanitizer, async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error("headers의 Content-Type을 application/json으로 설정해주세요");
    }

    const inputEmail = req.body.inputEmail ?? null;
    const inputProof = req.body.inputProof ?? null;

    const renewedPassword = await userAuthService.resetPassword({ inputEmail, inputProof });

    if (renewedPassword.error) {
      throw new Error(renewedPassword.error);
    }

    res.status(200).send("사용자의 비밀번호 초기화가 완료되었습니다.");
  }
  catch(error){
    next(error);
  }
});


// 현재 로그인한 사용자가 입력한 프로필 사진을 데이터베이스 업로드하고, 해당 사진을 base64 문자열과 MIME type으로 프론트엔드에 보내줍니다.
userAuthRouter.post("/user/:user_id/fileupload", upload.single('file'), login_required, async function (req, res, next) {
  try {
    const currentUserId = req.currentUserId;

    if(!currentUserId){
      throw new Error("현재 로그인한 사용자를 알 수 없습니다.");
    }

    // path 모듈을 활용해 절대 경로를 기반으로 추가적인 상대 경로를 조합해주어야 합니다.
    // 현재 working directory는 /back/src/routers/ 입니다.
    // working directory의 절대 경로에다가 ../uploads/ 라는 상대 경로를 추가해줍니다.
    // multer의 storage와 같은 경로를 사용해야 합니다.

    const fileObject = {
      file: {
        data: fs.readFileSync(path.join(__dirname, '../uploads/') + req.file.filename),
        contentType: 'image/jpg',
      }
    }
  
    console.log(fileObject)
    
    const uploadedFile = await UserModel.findOneAndUpdate({ id: currentUserId }, { $set: fileObject }, { returnOriginal: false });

    if (uploadedFile.error) {
      throw new Error(uploadedFile.error);
    }

    const base64Img = await UserModel.findOne({  });

    res.status(200).json(base64Img);
  }
  catch(error){
    next(error);
  }
});




export { userAuthRouter };
