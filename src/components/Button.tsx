import styles from "./button.module.css";
interface Props {
  imgsrc?: string;
  title: string;
  role?: string;
  onClick?: () => void;
}

const Button = ({ imgsrc, title, role, onClick }: Props) => {
  return (
    <button
      className={styles.container}
      role={role ? role : "button"}
      onClick={onClick}
    >
      {imgsrc && <img src={imgsrc} alt="button" />}
      <span className={styles.title}>{title}</span>
    </button>
  );
};

export default Button;
