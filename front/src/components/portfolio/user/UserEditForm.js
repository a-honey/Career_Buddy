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
  const [github, setGithub] = useState(user?.social?.github);
  const [insta, setInsta] = useState(user?.social?.insta);
  const [blog, setBlog] = useState(user?.social?.blog);
  const [imgFile, setImgFile] = useState();

  const { setIsEditing } = useContext(EditContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await Api.put(`users/${user.id}`, {
      name,
      email,
      description,
      social: { github, blog, insta },
      imgBase64: toString(imgFile),
    });
    // 유저 정보는 response의 data임.
    const updatedUser = res.data;
    // 해당 유저 정보로 user을 세팅함.
    setUser(updatedUser);

    // isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  function handleFileSubmit(e) {
    e.preventDefault();

    const headers = new Headers();
    headers.append(
      "Authorization",
      `Bearer ${sessionStorage.getItem("userToken")}`
    );

    fetch(
      `http://${window.location.hostname}:${5001}/user/${user.id}/fileupload`,
      {
        method: "POST",
        headers: headers,
        body: new FormData(e.target), // 폼 데이터를 서버로 전송
      }
    );
  }
  function handleImgChange(e) {
    const img = e.target.files[0];

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

        reader.onload = () => {
          const previewImg = document.getElementById("previewImg");
          previewImg.src = reader.result;
          setImgFile(reader.result);
        };

        reader.readAsDataURL(img);
      } catch (e) {
        alert(e);
      }
    }
  }

  return (
    <>
      <div className="img-container">
        <img
          className="mb-3"
          id="previewImg"
          alt="랜덤 고양이 사진 (http://placekitten.com API 사용)"
          src={
            user?.imgBase64
              ? `data:image/png;base64,${user.imgBase64}`
              : "http://placekitten.com/200/200"
          }
        />
      </div>
      <form encType="multipart/form-data" onSubmit={handleFileSubmit}>
        <input
          className="choose-file-btn"
          type="file"
          name="file"
          onChange={handleImgChange}
        />
        <button className="upload-btn" type="submit" value="프로필 사진 업로드">
          업로드
        </button>
      </form>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        onSubmit={handleSubmit}
      >
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
    </>
  );
}

export default UserEditForm;
