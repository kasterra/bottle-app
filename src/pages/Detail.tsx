/* eslint-disable @typescript-eslint/no-explicit-any */
import Card from "../components/Card";
import Header from "../components/Header";
import styles from "./detail.module.css";
import letterSVG from "../assets/letter.svg";
import LetterElement from "../components/LetterElement";
import { useAuth } from "../AuthContext";
import { useEffect, useState } from "react";
import { Letter } from "../types/letter";
import Button from "../components/Button";
import writeLetterSVG from "../assets/write-letter.svg";
import toast from "react-hot-toast";
import { getAllBottles } from "../API";
import { parseDateString } from "../util";
import Pagination from "rc-pagination/lib/Pagination";
import "rc-pagination/assets/index.css";
import { Link } from "react-router-dom";

const Detail = () => {
  const [isListLoading, setIsListLoading] = useState(true);
  const [letterMeta, setLetterMeta] = useState<any>();
  const [letterList, setLetterList] = useState<Letter[]>([]);
  const [pageNum, setPageNum] = useState(0);
  const [letter, setLetter] = useState<Letter>();
  const auth = useAuth();

  useEffect(() => {
    async function getAllBottlesFromServer() {
      setIsListLoading(true);
      try {
        const response = await getAllBottles(
          auth.access_token,
          pageNum,
          10,
          "desc"
        );
        setLetterMeta(response);
        setLetterList(
          response.bottles.map((bottle: any) => ({
            ...bottle,
            createdAt: parseDateString(bottle.createdAt),
          }))
        );
        setIsListLoading(false);
      } catch (err: any) {
        toast.error(`Error: ${err.message} - ${err.responseMessage}`);
      }
    }

    getAllBottlesFromServer();
  }, [auth.access_token, pageNum]);
  return isListLoading ? (
    <span>loading...</span>
  ) : (
    <div className={styles.container}>
      <Header />
      <div className={styles["cards-container"]}>
        <Card>
          <div className={styles.card}>
            <div className={styles["card-title"]}>
              <img src={letterSVG} alt="letter" />
              <span>내 편지함</span>
            </div>
            <div className={styles.letters}>
              {isListLoading ? (
                <span>Loading...</span>
              ) : letterList.length === 0 ? (
                <div>
                  <span>지금 편지가 없어요</span>
                </div>
              ) : (
                letterList.map((letter) => (
                  <LetterElement
                    key={letter.id}
                    id={letter.id + ""}
                    isOpened={true}
                    title={letter.title}
                    time={letter.createdAt.toLocaleString("ko-KR", {
                      timeZone: "UTC",
                    })}
                    onClick={() => setLetter(letter)}
                  />
                ))
              )}
            </div>
          </div>
          <Pagination
            showTotal={(total) => `Total ${total} items`}
            total={letterMeta!.totalElements}
            onChange={(page) => setPageNum(page - 1)}
            current={pageNum + 1}
          />
        </Card>
        <Card>
          {letter ? (
            <div className={styles.card}>
              <span>제목 : {letter.title}</span>
              <div className={styles["letter-content"]}>{letter.content}</div>
              <span className={styles["letter-by"]}>
                보낸 시간 :
                {letter.createdAt.toLocaleString("ko-KR", {
                  timeZone: "UTC",
                })}
              </span>
            </div>
          ) : (
            <>
              <div className={styles["btn-container"]}>
                <Link to="/post">
                  <Button imgsrc={writeLetterSVG} title="편지 쓰러가기" />
                </Link>
              </div>
              <span>편지가 선택되지 않았어요</span>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Detail;
