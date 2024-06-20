import React, { useState } from "react";
import styles from "./home.module.css";
import inputStyles from "../components/input.module.css";
import Card from "../components/Card";
import TextInput from "../components/TextInput";
import PWInput from "../components/PWInput";
import heroImage from "../assets/bottle-hero.jpg";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { login, register } from "../API";
import { useAuthDispatch } from "../AuthContext";

const Home = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const navigate = useNavigate();
  const authDispatch = useAuthDispatch();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const id = formData.get("id") as string;
    const pw = formData.get("pw") as string;
    const email = formData.get("email") as string;
    const pw1 = formData.get("pw1") as string;
    const pw2 = formData.get("pw2") as string;
    if (mode === "login") {
      await toast.promise(login(id, pw), {
        loading: "로그인 진행중...",
        success: (response) => {
          sessionStorage.setItem("access_token", response.access_token);
          authDispatch({
            type: "UPDATE_DATA",
            payload: {
              name: id,
              access_token: response.access_token,
              refresh_token: response.refresh_token,
              last_bottle_creation: response.last_bottle_creation,
            },
          });
          navigate("/detail");
          return "로그인 성공!";
        },
        error: (err) => `Error: ${err.message} - ${err.responseMessage}`,
      });
    }

    if (mode === "signup") {
      await toast.promise(register(id, pw1, pw2, email), {
        loading: "회원가입 진행중...",
        success: () => {
          setMode("login");
          return "회원가입 성공! 이메일 인증 완료 후 로그인 가능합니다";
        },
        error: (err) => `Error: ${err.message} - ${err.responseMessage}`,
      });
    }
  };
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

            <form className={styles["form-area"]} onSubmit={onSubmit}>
              {mode === "login" ? (
                <>
                  <TextInput title="ID" name="id" />
                  <PWInput title="비밀번호" name="pw" />
                </>
              ) : (
                <>
                  <TextInput
                    title="email"
                    name="email"
                    placeholder="서비스 이용을 위해 email 인증이 필요해요"
                  />
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
