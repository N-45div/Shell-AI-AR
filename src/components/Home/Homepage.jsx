import React from "react";
import styles from "./Homepage.module.css";
import { phantomImg } from "../../../public/images";
export default function Homepage() {
  return (
    <div className={styles.Homepage}>
      <section>
        <h1>Explore Modern Health Plans with</h1>
      </section>{" "}
      <section className={styles.center_text}>
        <h2 className={styles.exporeH2}>Explore Modern Health Plans with</h2>
        <h1 className={styles.exporeH1}>Space Grotesk</h1>
        <p className={styles.explore_P}>
          Use AI to find and manage the best health coverage for your business
          needs and budget.
        </p>

        <div className={styles.button_div}>
          <button className={styles.button_login}>Activate Your Account</button>{" "}
          <button className={styles.button_open}>
            {" "}
            <img src={phantomImg} alt="phantom Img" /> Sign Up with Google
          </button>
        </div>
      </section>{" "}
      <section>
        <h1>Explore Modern Health Plans with</h1>
      </section>{" "}
    </div>
  );
}
