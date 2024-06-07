import Card from "../components/Card";
import Header from "../components/Header";
import styles from "./detail.module.css";
import letterSVG from "../assets/letter.svg";
import writeLetterSVG from "../assets/write-letter.svg";
import LetterElement from "../components/LetterElement";
import Button from "../components/Button";

const Detail = () => {
  return (
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
              <LetterElement
                isOpened={true}
                title="첫번째 편지"
                time="2024. 05. 05 PM 05:10"
              />
              <LetterElement
                isOpened={false}
                title="두번째 편지"
                time="2024. 05. 05 PM 05:10"
              />
            </div>
          </div>
        </Card>
        <Card>
          <div className={styles.card}>
            <span>제목 : 첫번째 편지</span>
            <div className={styles["letter-content"]}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
              aspernatur est officia vel quidem, nobis eos, accusantium facere
              error veniam facilis dolore voluptas a! Similique sunt placeat
              iure laboriosam sed. Minima labore ad voluptatibus! Ipsa fuga sunt
              necessitatibus commodi quaerat architecto! Velit amet vero nihil
              cumque cum sapiente, reprehenderit rem recusandae aut incidunt!
              Quod ut, impedit sequi voluptatem quae et. Maxime vel, quos
              explicabo inventore error quia iste dolorum suscipit culpa
              reiciendis minus! Et corrupti a voluptatem, ab nesciunt at vero
              cum soluta enim, fugiat minus dolorem error, incidunt officiis?
              Sit atque, repellendus quod, est deleniti deserunt quia animi
              nostrum consequatur similique vero aliquam eum quis unde nisi
              libero ex rem ea! Aliquam cupiditate repellendus ipsam animi
              recusandae provident quis! Accusantium ducimus consectetur
              laboriosam. Temporibus odit iure facere itaque iusto quia, magnam,
              quas amet obcaecati quidem officia laborum distinctio explicabo
              quisquam enim similique sed ipsa eius? Corporis alias ex mollitia.
              Quidem omnis dignissimos officiis fugiat architecto sint quisquam
              natus deleniti odit sit corrupti earum sequi quaerat, eaque
              similique, ipsam quia obcaecati inventore! Delectus cum mollitia
              dignissimos temporibus, nam beatae quae? Repellat aut voluptatem
              non labore quae veniam numquam suscipit cumque maxime assumenda
              tempore laboriosam minus saepe aperiam eveniet at quam temporibus
              in, quas, beatae omnis nesciunt ea voluptatum voluptate. Tempore.
              Obcaecati, itaque in dicta doloremque adipisci aliquid odit
              voluptatibus illum quisquam perferendis minima ad quam provident
              atque necessitatibus sit, fuga mollitia sequi eaque, architecto
              rerum quod ipsa molestias earum! Quos?
            </div>
            <span className={styles["letter-by"]}>발신인: 새침한 고슴도치</span>
            <div className={styles["btn-container"]}>
              <Button imgsrc={writeLetterSVG} title="답장 쓰러가기" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Detail;
