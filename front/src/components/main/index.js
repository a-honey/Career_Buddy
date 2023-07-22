import { useEffect, useState } from "react";
import "./main.style.css";

const Main = () => {
  const [position, setPosition] = useState(0);

  function onScroll() {
    setPosition(window.scrollY);
  }

  useEffect(() => {
    function handleScroll() {
      onScroll();
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // 스크롤이 발생할 때마다 위치값(position)을 출력해보세요.
    console.log("Current scroll position:", position);
  }, [position]);

  const translateY = -position / 2;

  return (
    <>
      <div
        className="main"
        style={{ transform: `translateY(${translateY}px)` }}
      >
        <h1 className="main-title">Hi, Career Gram</h1>
        <h1 className="main-title">Hi, Career Gram</h1>
        <h1 className="main-title">Hi, Career Gram</h1>
        <h1 className="main-title">Hi, Career Gram</h1>
        <h1 className="main-title">Hi, Career Gram</h1>
      </div>
    </>
  );
};

export default Main;
