import NavBar from "./navBar";
import classes from "./main.module.css";

function Layout(props) {
  return (
    <div className={classes.app}>
      <NavBar />
      <main>{props.children}</main>
    </div>
  );
}

export default Layout;
