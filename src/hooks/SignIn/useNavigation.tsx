import { useNavigate } from "react-router-dom";

export const useNavigation = () => {
  const navigate = useNavigate();

  const moveUserRegister = () => {
    navigate("/user-register");
  };

  const moveStartRegister = () => {
    navigate("/start-register");
  };

  const moveEndRegister = () => {
    navigate("/end-register");
  };

  const moveMain = () => {
    navigate("/");
  };

  const moveMyTeam = () => {
    navigate("/wiki");
  };
  return {
    moveUserRegister,
    moveStartRegister,
    moveEndRegister,
    moveMain,
    moveMyTeam,
  };
};
