import Card from "../components/Card";
import letterSVG from "../assets/letter.svg";
import styles from "./detail.module.css";
import TextInput from "../components/TextInput";
import TextArea from "../components/TextArea";
import Header from "../components/Header";
import Button from "../components/Button";
import writeLetterSVG from "../assets/write-letter.svg";
import toast from "react-hot-toast";
import { createBottle } from "../API";
import { useAuth, useAuthDispatch } from "../AuthContext";

const HOUR_LIMIT = 3;

const Post = () => {
  const auth = useAuth();
  const authDispatch = useAuthDispatch();
  return (
    <div className={styles.container}>
      <Header />
      <Card>
        <form
          className={styles.card}
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const title = formData.get("title") as string;
            const content = formData.get("content") as string;
            if (title.length > 20 || content.length > 200) {
              toast.error("제목 및 본문의 길이 제한 초과입니다");
              return;
            }
            if (
              new Date().getTime() - auth.last_bottle_creation.getTime() <
              1000 * 60 * 60 * HOUR_LIMIT
            ) {
              toast.error(
                `편지 쓰기는 ${HOUR_LIMIT} 시간 이내에 다시 할 수 없습니다`
              );
              return;
            }
            await toast.promise(
              createBottle(auth.access_token, title, content),
              {
                loading: "편지를 보내는 중입니다....",
                success: () => {
                  authDispatch({
                    type: "UPDATE_LAST_BOTTLE_CREATION",
                    payload: new Date(),
                  });
                  return "성공적으로 발송되었습니다!\n 누구에게 갔을지는 아무도 몰라요!";
                },
                error: (err) =>
                  `Error: ${err.message} - ${err.responseMessage}`,
              }
            );
          }}
        >
          <div className={styles["card-title"]}>
            <img src={letterSVG} alt="letter" />
            <span>편지 쓰기</span>
          </div>
          <TextInput
            name="title"
            title="제목"
            placeholder="편지의 제목(최대 20자)"
            description="(최대 길이 : 20자)"
          />
          <TextArea
            title="본문"
            name="content"
            placeholder="본문(최대 200자)"
            height={300}
          />
          <Button imgsrc={writeLetterSVG} title="편지 보내기" role="submit" />
        </form>
      </Card>
    </div>
  );
};

export default Post;
