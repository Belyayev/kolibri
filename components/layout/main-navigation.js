import Link from "next/link";
import { useSession, signOut } from "next-auth/client";

import classes from "./main-navigation.module.css";

function MainNavigation() {
  const [session, loading] = useSession();

  function logoutHandler() {
    signOut();
  }

  return (
    <div className={classes.headerWrapper}>
      <header className={classes.header}>
        <Link href="/">
          <a>
            <div className={classes.logo}>Школа Русского Языка «Колибри»</div>
          </a>
        </Link>
        <nav className={classes.navigation}>
          {!session && !loading && (
            <Link href="/auth">
              <a>
                <button>Войти</button>
              </a>
            </Link>
          )}
          {session && <Link href="/profile">Профиль</Link>}
          {session && <button onClick={logoutHandler}>Выйти</button>}
        </nav>
      </header>
    </div>
  );
}

export default MainNavigation;
