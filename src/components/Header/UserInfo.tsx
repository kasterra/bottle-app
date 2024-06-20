import { useNavigate } from "react-router-dom";
import { useAuthDispatch } from "../../AuthContext";
import styles from "./header.module.css";

interface Props {
  userName: string;
}

const UserInfo = ({ userName }: Props) => {
  const authDispatch = useAuthDispatch();
  const navigate = useNavigate();
  return (
    <div className={styles.userinfo}>
      <span>
        소중한 사람
        <span className={styles.bold}>{userName}</span> 님
      </span>
      <div
        className={styles["logout-button"]}
        onClick={() => {
          authDispatch({ type: "DELETE_DATA" });
          navigate("/");
        }}
      >
        로그아웃
      </div>
    </div>
  );
};

export default UserInfo;
