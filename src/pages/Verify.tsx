import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyEmail } from "../API";

const Verify = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const verifyId = searchParams.get("id");
  if (verifyId === null) {
    setIsLoading(false);
  }
  useEffect(() => {
    if (verifyId !== null) {
      toast.promise(verifyEmail(verifyId), {
        loading: "인증 요청 진행중...",
        success: () => {
          setIsLoading(false);
          navigate("/");
          return "성공적으로 인증되었습니다!";
        },
        error: (err) => `Error: ${err.message} - ${err.responseMessage}`,
      });
    }
  }, [navigate, verifyId]);

  return isLoading ? (
    <div>Loading...</div>
  ) : verifyId === null ? (
    <h1>잘못된 접근입니다!</h1>
  ) : (
    <div>Verify</div>
  );
};

export default Verify;
