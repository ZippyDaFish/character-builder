'use client';

import styles from './page.module.css';

export default function About() {
  return (
    <div className={styles.pageContainer}>
      {/* Title */}
      <h1 className={styles.title}>
        About SHIV Character Builder
      </h1>
      <div className={styles.underline}></div>

      {/* Intro */}
      <p className={styles.paragraph}>
        SHIV Character Builder is designed for horror TTRPG players and storytellers 
        who want to create, customize, and manage characters with ease. Whether you’re 
        crafting a survivor, a villain, or someone in between, our tool helps you 
        bring your stories to life.
      </p>

      {/* Mission Section */}
      <div className={styles.infoBox}>
        <h2 className={styles.subtitle}>Our Mission</h2>
        <div className={styles.underline}></div>
        <p>
          We believe horror thrives on creativity. Our mission is to provide 
          players and Game Masters with the tools to track progress, evolve 
          characters, and dive deeper into the terrifying worlds they build.
        </p>
      </div>

      {/* Features Section */}
      <div className={styles.features}>
        <h2 className={styles.subtitle}>What You Can Expect</h2>
        <div className={styles.underline}></div>
        <ul className={styles.featureList}>
          <li>- Create and save multiple characters</li>
          <li>- Track progress and evolving storylines</li>
          <li>- Customize attributes and archetypes</li>
          <li>- Updates and new features regularly added</li>
        </ul>
      </div>
    </div>
  );
}
