import { useRef } from "react";
import classes from "./profile-form.module.css";
import Image from "next/image";

function ProfileForm(props) {
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredOldPassword = oldPasswordRef.current.value;
    const enteredNewPassword = newPasswordRef.current.value;

    // optional: Add validation

    props.onChangePassword({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword,
    });
  }

  return (
    <div className={classes.profilePage}>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="new-password">Новый пароль</label>
          <input type="password" id="new-password" ref={newPasswordRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="old-password">Старый пароль</label>
          <input type="password" id="old-password" ref={oldPasswordRef} />
        </div>
        <div className={classes.action}>
          <button>Поменять пароль</button>
        </div>
      </form>
      <div style={{ width: "20rem" }}>
        <Image
          src="https://github.com/Belyayev/imageStore/blob/main/some%20book%20name.png?raw=true"
          alt=""
          title=""
          width="100%"
          height="100%"
          layout="responsive"
          objectFit="contain"
        />
        <Image
          src="https://imgtr.ee/images/2023/04/01/UVbF3.jpg"
          alt=""
          title=""
          width="100%"
          height="100%"
          layout="responsive"
          objectFit="contain"
        />
      </div>
    </div>
  );
}

export default ProfileForm;
