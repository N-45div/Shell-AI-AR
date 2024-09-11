import React from "react";
import Marquee from "react-fast-marquee";
import { solflare_img, phamtomBg_IMg, phantomBh_2 } from "../../assets/images";
import styles from "./Parthners.module.css"

export default function Parthners() {
  return (
    <div className={styles.Parthner_styles}>
      <Marquee>
        <img src={solflare_img} alt="" />
        <img src={phamtomBg_IMg} alt="" />
        <img src={phantomBh_2} alt="" />
      </Marquee>
    </div>
  );
}
