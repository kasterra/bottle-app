import styles from "./letterElement.module.css";
import closedLetter from "../assets/letter-closed.svg";
import openedLetter from "../assets/letter-opened.svg";
import trashSVG from "../assets/trash.svg";
import toast from "react-hot-toast";
import { deleteBottle } from "../API";
import { useAuth } from "../AuthContext";

interface Props {
  isOpened: boolean;
  title: string;
  time: string;
  onClick?: () => void;
  id: string;
}

const LetterElement = ({ isOpened, title, time, onClick, id }: Props) => {
  const auth = useAuth();
  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles["image-cell"]}>
        <img src={isOpened ? openedLetter : closedLetter} alt="letter" />
      </div>
      <div className={styles["text-cell"]}>
        <span className={styles.title}>{title}</span>
        <span className={styles.time}>{time}</span>
      </div>
      <div
        className={styles["image-cell"]}
        onClick={async () => {
          await toast.promise(deleteBottle(auth.access_token, id), {
            loading: "인증 삭제진행중...",
            success: "삭제 성공",
            error: (error) =>
              `Error: ${error.message} - ${error.responseMessage}`,
          });
        }}
      >
        <img src={trashSVG} alt="delete" />
      </div>
    </div>
  );
};

export default LetterElement;
