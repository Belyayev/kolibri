import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/client";
import { HomeFilled, ReadFilled, LockFilled } from "@ant-design/icons";

import Logo from "../../Images/Logo.png";

import classes from "./main.module.css";

function NavBar() {
  const [session, loading] = useSession();

  function logoutHandler() {
    signOut();
  }

  return (
    <div className={classes.headerWrapper}>
      <header className={classes.header}>
        <div className={classes.logo}>
          <Image
            src={Logo}
            alt=""
            title=""
            width="100%"
            height="45px"
            layout="responsive"
            objectFit="contain"
          />
        </div>

        <div className={classes.navigation}>
          <Link passHref href="/">
            <div className={classes.navItem}>
              <HomeFilled className={classes.navIcon} />
              <span className={classes.navLabel}>Главная</span>
            </div>
          </Link>
          <Link passHref href="/books">
            <div className={classes.navItem}>
              <ReadFilled className={classes.navIcon} />
              <span className={classes.navLabel}>Книги</span>
            </div>
          </Link>
          {session &&
            (session.user.email === "4xgood@gmail.com" ||
              session.user.email === "sachyk81@hotmail.com") && (
              <Link passHref href="/admin">
                <div className={classes.navItem}>
                  <LockFilled className={classes.navIcon} />
                  <span className={classes.navLabel}>Админ</span>
                </div>
              </Link>
            )}

          {!session && !loading && (
            <Link href="/auth">
              <a>
                <button>Войти</button>
              </a>
            </Link>
          )}
          {/* {session && <Link href="/profile">Профиль</Link>} */}
          {session && <button onClick={logoutHandler}>Выйти</button>}
        </div>
      </header>
    </div>
  );
}

export default NavBar;
