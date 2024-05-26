import styles from "./header.module.css";

interface Props {
  userName: string;
}

const UserInfo = ({ userName }: Props) => {
  return (
    <div className={styles.userinfo}>
      <span>
        소중한 사람
        <span className={styles.bold}>{userName}</span> 님
      </span>
      <div className={styles["logout-button"]} onClick={() => {}}>
        로그아웃
      </div>
    </div>
  );
};

export default UserInfo;
