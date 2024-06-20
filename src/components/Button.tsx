import styles from "./button.module.css";
interface Props {
  imgsrc?: string;
  title: string;
  role?: string;
}

const Button = ({ imgsrc, title, role }: Props) => {
  return (
    <button className={styles.container} role={role ? role : "button"}>
      {imgsrc && <img src={imgsrc} alt="button" />}
      <span className={styles.title}>{title}</span>
    </button>
  );
};

export default Button;
