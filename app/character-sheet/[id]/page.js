"use client";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { db } from "@/app/lib/firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
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

  const updateTimeout = useRef(null);

  const updateAttribute = (attr, delta) => {
    setCharacter(prev => {
      const currentVal = parseInt(prev[attr], 10) || 0;
      const newVal = Math.max(0, currentVal + delta);
      return {
        ...prev,
        [attr]: String(newVal)
      };
    });

    if (updateTimeout.current) clearTimeout(updateTimeout.current);

    updateTimeout.current = setTimeout(async () => {
      try {
        const docRef = doc(db, "characters", id);
        await updateDoc(docRef, {
          [attr]: String(
            Math.max(0, (parseInt(character?.[attr], 10) || 0) + delta)
          ),
        });
      } catch (err) {
        console.error("Failed to update attribute:", err);
      }
    }, 500); // waits 500ms after last click before writing
  };

  if (!character) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      {/* Left content */}
      <div className={styles.leftPane}>
        <h1 className={styles.name}>{character.name}</h1>
        <p className={styles.archetype}>Archetype: {character.archetype}</p>

        <h3>Attributes</h3>
        <div className={styles.attributes}>
          <div className={styles.attributeHeaderContainer}>
            <h2>S</h2>
            <div className={styles.attributeContentContainer}>
              <button onClick={() => updateAttribute("sanity", -1)}>-</button>
              <h3>{character.sanity}</h3>
              <button onClick={() => updateAttribute("sanity", +1)}>+</button>
            </div>
          </div>
          <div className={styles.attributeHeaderContainer}>
            <h2>H</h2>
            <div className={styles.attributeContentContainer}>
              <button onClick={() => updateAttribute("humanity", -1)}>-</button>
              <h3>{character.humanity}</h3>
              <button onClick={() => updateAttribute("humanity", +1)}>+</button>
            </div>
          </div>
          <div className={styles.attributeHeaderContainer}>
            <h2>I</h2>
            <div className={styles.attributeContentContainer}>
              <button onClick={() => updateAttribute("ingenuity", -1)}>-</button>
              <h3>{character.ingenuity}</h3>
              <button onClick={() => updateAttribute("ingenuity", +1)}>+</button>
            </div>
          </div>
          <div className={styles.attributeHeaderContainer}>
            <h2>V</h2>
            <div className={styles.attributeContentContainer}>
              <button onClick={() => updateAttribute("vitality", -1)}>-</button>
              <h3>{character.vitality}</h3>
              <button onClick={() => updateAttribute("vitality", +1)}>+</button>
            </div>
          </div>

          <div className={styles.attributeHeaderContainer}>
            <h2>Calm Points</h2>
            <div className={styles.attributeContentContainer}>
              <button onClick={() => updateAttribute("calmPoints", -1)}>-</button>
              <h3>{character.calmPoints}</h3>
              <button onClick={() => updateAttribute("calmPoints", +1)}>+</button>
            </div>
          </div>
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
