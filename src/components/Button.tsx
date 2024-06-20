
import styles from "./button.module.css";
interface Props {
  imgsrc?: string;
  title: string;
}

const Button = ({ imgsrc, title }: Props) => {
  return (
    <div className={styles.container}>
      {imgsrc && <img src={imgsrc} alt="button" />}
      <span className={styles.title}>{title}</span>
    </div>
  );
};

export default Button;
