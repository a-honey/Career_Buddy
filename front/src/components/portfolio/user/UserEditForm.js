import React, { useContext, useState } from "react";
import * as Api from "../../../api";
import { FullBtn } from "../../common/Btns";
import { EditContext } from "../../../contexts/EditContext";

function UserEditForm({ user, setUser }) {
  //useState로 name 상태를 생성함.
  const [name, setName] = useState(user.name);
  //useState로 email 상태를 생성함.
  const [email] = useState(user.email);
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState(user.description);
  const [github, setGithub] = useState(user?.github?.github);
  const [insta, setInsta] = useState(user?.github?.insta);
  const [blog, setBlog] = useState(user?.github?.blog);
  const [imgUrl, setImgUrl] = useState(user?.imgUrl);

  const { turnEditing } = useContext(EditContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", JSON.stringify({ name }));
    formData.append("email", JSON.stringify({ email }));
    formData.append("description", JSON.stringify({ description }));
    formData.append("imgUrl", JSON.stringify({ imgUrl }));
    formData.append("social", JSON.stringify({ github, insta, blog }));
    // "users/유저id" 엔드포인트로 PUT 요청함.
    const res = await Api.put(`users/${user.id}`, formData);
    // 유저 정보는 response의 data임.
    const updatedUser = res.data;
    // 해당 유저 정보로 user을 세팅함.
    setUser(updatedUser);

    // isEditing을 false로 세팅함.
    turnEditing();
  };

  function handleImgChange(e) {
    const img = e.target.file || e.target.files[0];

    if (!img) {
      alert("JPG 혹은 PNG 확장자의 이미지 파일을 넣어주세요.");
      return;
    } else if (
      img.type !== "image/jpeg" &&
      img.type !== "image/jpg" &&
      img.type !== "image/png"
    ) {
      alert("JPG 혹은 PNG 확장자의 이미지 파일만 등록 가능합니다.");
      return;
    }
    if (img) {
      try {
        const reader = new FileReader();

        reader.readAsDataURL(img);

        reader.onload = () => {
          const previewImg = document.getElementById("previewImg");
          previewImg.src = reader.result;
          const imageUrlString = reader.result.toString();
          setImgUrl(imageUrlString);
        };
      } catch (e) {
        alert(e);
      }
    }
  }

  return (
    <form
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      onSubmit={handleSubmit}
    >
      <div className="img-container">
        <img
          className="mb-3"
          id="previewImg"
          alt="랜덤 고양이 사진 (http://placekitten.com API 사용)"
        />
      </div>
      <input
        type="file"
        accept="image/jpg, image/jpeg, image/png"
        onChange={handleImgChange}
      />
      <label> 사용자 email</label>
      <div>{email}</div>
      <label>이름</label>
      <input
        type="text"
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>소개글</label>
      <textarea
        type="text"
        placeholder="정보, 인사말"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label>SNS 주소</label>
      <input
        type="text"
        placeholder="Enter your github link"
        value={github}
        onChange={(e) => setGithub(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter your instagram link"
        value={insta}
        onChange={(e) => setInsta(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter your blog link"
        value={blog}
        onChange={(e) => setBlog(e.target.value)}
      />
      <FullBtn type="submit" className="me-3">
        확인
      </FullBtn>
    </form>
  );
}

export default UserEditForm;
