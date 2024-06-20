import styles from "./letterElement.module.css";
import closedLetter from "../assets/letter-closed.svg";
import openedLetter from "../assets/letter-opened.svg";

interface Props {
  isOpened: boolean;
  title: string;
  time: string;
  onClick?: () => void;
}

const LetterElement = ({ isOpened, title, time, onClick }: Props) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles["image-cell"]}>
        <img src={isOpened ? openedLetter : closedLetter} alt="letter" />
      </div>
      <div className={styles["text-cell"]}>
        <span className={styles.title}>{title}</span>
        <span className={styles.time}>{time}</span>
      </div>
    </div>
  );
};

export default LetterElement;
