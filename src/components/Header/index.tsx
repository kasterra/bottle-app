import styles from "./header.module.css";
import { Link, NavLink } from "react-router-dom";
import LogoSVG from "../../assets/bottle-logo.svg";
import UserInfo from "./UserInfo";
import { useAuth } from "../../AuthContext";

const menuElements = [
  { name: "받은 편지 보기", to: "/detail" },
  { name: "편지 쓰러가기", to: "/post" },
  { name: "편지 자랑하기", to: "/admin/research" },
];

const Header = () => {
  const auth = useAuth();
  return (
    <header className={styles.container}>
      <div className={styles["navmenu-container"]}>
        <Link to="/detail">
          <img src={LogoSVG} alt="logo" className={styles.logo} />
        </Link>
        <div className={styles.navmenu}>
          {menuElements.map((element) => (
            <NavLink key={element.to} to={element.to} className={styles.bold}>
              {element.name}
            </NavLink>
          ))}
        </div>
      </div>
      <div className={styles["userinfo-container"]}>
        <UserInfo userName={auth.name} />
      </div>
    </header>
  );
};

export default Header;
