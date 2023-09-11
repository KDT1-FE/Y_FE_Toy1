import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <div>
        <Link to={"/"}>홈</Link>
        <Link to={"/wiki"}>위키</Link>
        <Link to={"/gallery"}>갤러리</Link>
        <Link to={"/login"}>로그인</Link>
      </div>
    </>
  );
}
