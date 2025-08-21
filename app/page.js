"use client";
import styles from "./page.module.css";
import CardCarousel from "./components/cardCarousel";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.pageContainer}>
      {/* Hero Section */}
      <div className={styles.container}>
        <h1>SHIV Character Builder</h1>
        <h3>Build, customize, and store your Horror TTRPG characters here.</h3>
        <p>
          Whether you're creating a survivor for your next horror campaign or customizing a terrifying villain, 
          our builder helps you bring your ideas to life. Save multiple characters, track progress, 
          and update their stories as your game evolves.
        </p>
        <Link href="/sign-up"><h3 className={styles.cta}><b>Sign-Up to Get Started!</b></h3></Link>
      </div>

      {/* Updates Section */}
      <div className={styles.containerRight}>
        <h2>News and Updates</h2>
        <div className={styles.carouselWrapper}>
          <CardCarousel />
        </div>
      </div>
    </div>
  );
}
