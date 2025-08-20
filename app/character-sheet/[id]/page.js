"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/app/lib/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import styles from "../page.module.css";

export default function CharacterSheet() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      const docRef = doc(db, "characters", id);
      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setCharacter(snap.data());
      }
    };
    fetchData();
  }, [id]);

  if (!character) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      {/* Left content */}
      <div className={styles.leftPane}>
        <h1 className={styles.name}>{character.name}</h1>
        <p className={styles.archetype}>Archetype: {character.archetype}</p>

        <h3>Attributes</h3>
        <div className={styles.attributes}>
          <p><strong>S</strong>: {character.sanity}</p>
          <p><strong>H</strong>: {character.humanity}</p>
          <p><strong>I</strong>: {character.ingenuity}</p>
          <p><strong>V</strong>: {character.vitality}</p>
          <p><strong>Calm Points</strong>: {character.calmPoints}</p>
        </div>

        <h3>Positive Traits</h3>
        {character.positiveTraits?.length > 0 ? (
          <ul className={styles.traitList}>
            {character.positiveTraits.map((trait, index) => (
              <li key={index} className={styles.traitItem}>
                <strong>{trait.title}</strong> <span className={styles.tag}>({trait.tag})</span>
                <p>{trait.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No positive traits.</p>
        )}

        <h3>Negative Traits</h3>
        {character.negativeTraits?.length > 0 ? (
          <ul className={styles.traitList}>
            {character.negativeTraits.map((trait, index) => (
              <li key={index} className={styles.traitItem}>
                <strong>{trait.title}</strong> <span className={styles.tag}>({trait.tag})</span>
                <p>{trait.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No negative traits.</p>
        )}
      </div>

      {/* Right content (tabs) */}
      <div className={styles.rightPane}>
        <div className={styles.tabs}>
          <button
            className={`${styles.tabButton} ${activeTab === "description" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("description")}
          >
            Description
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === "background" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("background")}
          >
            Background
          </button>
          <button
            className={`${styles.tabButton} ${activeTab === "notes" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("notes")}
          >
            Notes
          </button>
        </div>

        <div className={styles.tabContent}>
          {activeTab === "description" && <p>{character.description || "No description provided."}</p>}
          {activeTab === "background" && <p>{character.background || "No background provided."}</p>}
          {activeTab === "notes" && <p>{character.notes || "No notes provided."}</p>}
        </div>
      </div>
    </div>
  );
}
