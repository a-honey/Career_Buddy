import { User, UserModel } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

class userAuthService {
  static async addUser({ name, email, password, github }) {
    // 이메일 중복 확인
    const user = await User.findByEmail({ email });
    if (user) {
      const errorMessage =
        "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.";
      return { errorMessage };
    }

    // 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(password, 10);

    // id 는 유니크 값 부여
    const id = uuidv4();
    const newUser = { id, name, email, github, password: hashedPassword };

    // db에 저장
    const createdNewUser = await User.create({ newUser });
    createdNewUser.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewUser;
  }

  static async getUser({ email, password }) {
    // 이메일 db에 존재 여부 확인
    const user = await User.findByEmail({ email });
    if (!user) {
      const errorMessage =
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );
    if (!isPasswordCorrect) {
      const errorMessage =
        "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 로그인 성공 -> JWT 웹 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
    const token = jwt.sign({ user_id: user.id }, secretKey);

    // 반환할 loginuser 객체를 위한 변수 설정
    const id = user.id;
    const name = user.name;
    const description = user.description;
    const github = user.github;

    const loginUser = {
      token,
      id,
      email,
      name,
      description,
      github,
      errorMessage: null,
    };

    return loginUser;
  }

  // Server-side offset pagination이 반영된 서비스입니다.
  static async getUsers(page, limit) {
    try{
      // 전체 사용자 계정 수를 파악합니다.
      // User가 아닌 UserModel의 mongoose 내장 메서드들을 사용합니다.
      const totalCount = await UserModel.find({}).count();

      // 지정된 조건으로 사용자 계정 정보를 일정 단위로 끊어서 가져옵니다.
      // User가 아닌 UserModel의 mongoose 내장 메서드들을 사용합니다.
      const users = await UserModel.find({})
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

      const paginatedUsers = {
        users,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page
      }

      return paginatedUsers;
    }
    catch(error){
      throw new Error(error);
    }
  }

  static async setUser({ user_id, toUpdate }) {
    // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
    let user = await User.findById({ user_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const errorMessage = "가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 업데이트 대상에 name이 있다면, 즉 name 값이 null 이 아니라면 업데이트 진행
    if (toUpdate.name) {
      const fieldToUpdate = "name";
      const newValue = toUpdate.name;
      user = await User.update({ user_id, fieldToUpdate, newValue });
    }

    if (toUpdate.email) {
      const fieldToUpdate = "email";
      const newValue = toUpdate.email;
      user = await User.update({ user_id, fieldToUpdate, newValue });
    }

    if (toUpdate.password) {
      const fieldToUpdate = "password";
      const newValue = bcrypt.hash(toUpdate.password, 10);
      user = await User.update({ user_id, fieldToUpdate, newValue });
    }

    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      user = await User.update({ user_id, fieldToUpdate, newValue });
    }

    if (toUpdate.github) {
      const fieldToUpdate = "github";
      const newValue = toUpdate.github;
      user = await User.update({ user_id, fieldToUpdate, newValue });
    }

    return user;
  }

  static async getUserInfo({ user_id }) {
    const user = await User.findById({ user_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const errorMessage =
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return user;
  }


  //폼으로 이메일,입력받은 기존 비밀번호, 새로운 비밀번호를 입력받음
  static async setPassword({user_id,email,inputPassword,newPassword}){
    
    // 이메일로 db에서 일치하는 사용자의 정보를 가져옴
    let user=await User.findByEmail({email})

    // 사용자의 정보가 없을 경우
    if (!user) {
      const errorMessage = "가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    
    // 입력받은 기존 비밀번호가 없을 경우
    if (!inputPassword){
      const errorMessage = "기존 비밀번호를 입력해주세요.";
      return { errorMessage };
    }
    
    const isPasswordCorrect = await bcrypt.compare(
      inputPassword,
      user.password
    );
    
    // 기존 비밀번호가 사용자의 정보에 저장된 비밀번호와 다른 경우 -확인 완료
    // 보안부분이 추가되어야 할 것 같음
    if (!isPasswordCorrect){
      const errorMessage = "기존 비밀번호를 잘못 입력했습니다. 다시 한 번 확인해 주세요";
      return { errorMessage };
    }
    
    // 새로운 비밀번호가 입력되지 않았을 경우-확인 완료
    if (!newPassword){
      const errorMessage = "새로운 비밀번호를 입력해주세요.";
      return { errorMessage };
    }
    
    // 새로운 비밀번호의 글자수가 5글자 이하, 13글자 이상일 경우 -확인 완료
    if (newPassword.length<6||newPassword.length>12){
      const errorMessage = "비밀번호는 6글자 이상 12글자 이하여야 합니다.";
      return { errorMessage };
    }
    // 변수를 유저모델과 일치시키니 실행되어 일단 임의로 변수 지정해서 값 넣어줌
    const fieldToUpdate="password"
    const newValue=await bcrypt.hash(newPassword,10)
    user=await User.update({user_id,fieldToUpdate,newValue})
    return user
  }

  
  // 로그인한 사용자가 신청한 회원 탈퇴 작업을 수행하는 기능을 구현합니다.
  static async deleteUser({ currentUserId, inputEmail, inputPassword }){
    try{
      if(!inputEmail) {
        throw new Error("현재 로그인한 사용자의 이메일을 입력하세요.");
      }

      if(!inputPassword) {
        throw new Error("현재 로그인한 사용자의 비밀번호를 입력하세요.");
      }

      if(!currentUserId) {
        throw new Error("현재 로그인한 사용자를 알 수 없으므로 탈퇴를 진행할 수 없습니다.");
      }
      
      // 현재 로그인한 사용자의 currentUserId로 사용자 계정 document를 찾습니다.
      // [버그] User 모델의 User.findById가 전혀 작동하지 않고 있습니다. mongoose 자체 메서드인 findOne을 대신 사용합니다.
      // const targetDocument = await User.findById(currentUserId);
      const targetDocument = await UserModel.findOne({ id: currentUserId });

      if(!targetDocument){
        throw new Error("현재 로그인한 사용자의 정보로는 계정 정보를 찾을 수 없거나, 이미 삭제된 계정입니다.");
      }
      
      // [보안] 삭제를 요청한 사용자와, 계정 document의 소유자가 일치하는지를 validate 합니다.
      if(currentUserId !== targetDocument.id){
        throw new Error("현재 로그인한 사용자는 사용자 계정 정보를 삭제할 권한이 없습니다.");
      }

      // [보안] 입력된 비밀번호와 실제 사용자 계정 document에 들어있는 hash를 비교합니다.
      const isPasswordCorrect = await bcrypt.compare(
        inputPassword,
        targetDocument.password
      );

      if (!isPasswordCorrect) {
        throw new Error("비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.");
      }

      // validation이 통과되었다면 사용자 계정 document를 삭제합니다.
      // [버그] User 모델의 User.delete가 전혀 작동하지 않고 있습니다. mongoose 자체 메서드인 findOneAndDelete를 대신 사용합니다.
      // const deletedUser = await User.delete(currentUserId);
      const deletedUser = await UserModel.findOneAndDelete({ id: currentUserId });
      return "계정 삭제 완료";
    }
    catch(error){
      throw new Error(error);
    }
  }

}

export { userAuthService };
