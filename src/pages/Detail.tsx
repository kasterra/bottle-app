import Card from "../components/Card";
import Header from "../components/Header";
import styles from "./detail.module.css";

const Detail = () => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles["cards-container"]}>
        <Card>
          <span>편지 조회 화면</span>
        </Card>
        <Card>
          <span>상세 보기 화면</span>
        </Card>
      </div>
    </div>
  );
};

export default Detail;
