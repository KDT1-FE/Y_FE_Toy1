import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { modalState } from "../../store/sign";
const useModal = () => {
  const [isEmailModalOpen, setEmailModalOpen] = useRecoilState(modalState);
  const navigate = useNavigate();
  const showModal = () => {
    setEmailModalOpen(true);
  };

  const handleCancel = () => {
    setEmailModalOpen(false);
  };

  const handleOk = () => {
    setEmailModalOpen(false);
    navigate("/start-register");
  };

  return { isEmailModalOpen, showModal, handleCancel, handleOk };
};

export default useModal;
