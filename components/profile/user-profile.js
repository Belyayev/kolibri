import ProfileForm from "./profile-form";
import classes from "./user-profile.module.css";
import React from "react";

function UserProfile() {
  async function changePasswordHandler(passwordData) {
    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify(passwordData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);
  }

  return (
    <section className={classes.profile}>
      <h1>Профиль пользователя</h1>
      <ProfileForm onChangePassword={changePasswordHandler} />
    </section>
  );
}

export default UserProfile;
