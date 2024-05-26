import { useState } from "react";
import styles from "./home.module.css";
import inputStyles from "../components/input.module.css";
import Card from "../components/Card";
import TextInput from "../components/TextInput";
import PWInput from "../components/PWInput";
import heroImage from "../assets/bottle-hero.jpg";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.cell}>
        <img src={heroImage} alt="" />
      </div>
      <div className={styles.cell}>
        <Card>
          <div className={styles["login-card-container"]}>
            <div className={styles["title-area"]}>
              <h1 className={styles.title}>
                {mode === "login" ? "로그인" : "회원가입"}
              </h1>
              <div className={styles["sub-text-area"]}>
                <span className={styles["sub-text"]}>
                  {mode === "login"
                    ? "계정이 없으신가요"
                    : "이미 계정이 있으신가요"}
                </span>
                <span
                  className={styles["sub-blue-text"]}
                  onClick={() => setMode(mode === "login" ? "signup" : "login")}
                >
                  {mode === "login" ? "회원가입" : "로그인"}
                </span>
              </div>
            </div>

            <form
              className={styles["form-area"]}
              onSubmit={(e) => {
                e.preventDefault();
                navigate("/detail");
              }}
            >
              {mode === "login" ? (
                <>
                  <TextInput title="ID" name="id" />
                  <PWInput title="비밀번호" name="pw" />
                </>
              ) : (
                <>
                  <TextInput
                    title="ID"
                    name="id"
                    placeholder="ID는 상대방에게 노출되지 않아요"
                  />
                  <PWInput
                    title="비밀번호"
                    name="pw1"
                    placeholder="비밀번호를 설정해 주세요"
                  />
                  <PWInput
                    title="비밀번호 확인"
                    name="pw2"
                    placeholder="비밀번호를 한번 더 입력해 주세요"
                  />
                </>
              )}
              <button className={inputStyles["primary-button"]}>
                {mode === "login" ? "로그인" : "회원 가입"}
              </button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Home;
