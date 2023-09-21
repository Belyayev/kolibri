import Image from "next/image";
import { LockFilled } from "@ant-design/icons";

import Logo from "../../Images/Logo.png";

import classes from "./main.module.css";
import { SignInButton } from "@clerk/nextjs";

function NavBarGuest() {
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
          <div className={classes.navigation}>
            <span className={classes.navLabel}>
              Войти для доступа в библиотеку{" -->"}
            </span>
            <SignInButton />
          </div>
        </div>
      </header>
    </div>
  );
}

export default NavBarGuest;
