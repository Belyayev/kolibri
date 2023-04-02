import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/client";

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

        <nav className={classes.navigation}>
          <Link href="/">Главная</Link>
          <Link href="/books">Книги</Link>
          {!session && !loading && (
            <Link href="/auth">
              <a>
                <button>Войти</button>
              </a>
            </Link>
          )}
          {session &&
            (session.user.email === "4xgood@gmail.com" ||
              session.user.email === "sachyk81@hotmail.com") && (
              <Link href="/admin">Админ</Link>
            )}
          {/* {session && <Link href="/profile">Профиль</Link>} */}
          {session && <button onClick={logoutHandler}>Выйти</button>}
        </nav>
      </header>
    </div>
  );
}

export default NavBar;
