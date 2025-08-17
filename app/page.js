"use client";
import styles from "./page.module.css";
import CustomButton from "./components/customButton";
import CardCarousel from "./components/cardCarousel";

export default function Home() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.container}>
        <h1>SHIV Character Builder</h1>
        <br/>
        <h3>Build, customize, and store your Horror TTRPG characters here.</h3>
        <br/>
        <h3>Sign-Up to Get Started!</h3>
      </div>
      <div className={styles.container}>
        <h2>News and Updates</h2>
        <CardCarousel/>
      </div>
    </div>
  );
}
