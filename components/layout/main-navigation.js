import Link from "next/link";
import { useSession, signOut } from "next-auth/client";

import classes from "./main-navigation.module.css";

function MainNavigation() {
  const [session, loading] = useSession();

  function logoutHandler() {
    signOut();
  }

  return (
    <header className={classes.header}>
      <Link href="/">
        <a>
          <div className={classes.logo}>Школа Русского Языка «Колибри»</div>
        </a>
      </Link>
      <nav>
        <ul>
          {!session && !loading && (
            <li>
              <Link href="/auth">Войти</Link>
            </li>
          )}
          {session && (
            <li>
              <Link href="/profile">Профиль</Link>
            </li>
          )}
          {session && (
            <li>
              <button onClick={logoutHandler}>Выйти</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
