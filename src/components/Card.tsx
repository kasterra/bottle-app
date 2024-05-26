import styles from "./card.module.css";

interface Props {
  children: React.ReactNode;
}

const Card = ({ children }: Props) => {
  return <div className={styles.container}>{children}</div>;
};

export default Card;
