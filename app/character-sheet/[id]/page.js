"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/app/lib/firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function CharacterSheet() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);

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
    <div>
      <h1>{character.name}</h1>
      <p>Archetype: {character.archetype}</p>

      <h3>Attributes</h3>
      <p>S: {character.sanity}</p>
      <p>H: {character.humanity}</p>
      <p>I: {character.ingenuity}</p>
      <p>V: {character.vitality}</p>
      <p>Calm Points: {character.calmPoints}</p>

      <h3>Description</h3>
      <p>{character.description}</p>

      <h3>Background</h3>
      <p>{character.background}</p>

      <h3>Notes</h3>
      <p>{character.notes}</p>

      <h3>Positive Traits</h3>
      {character.positiveTraits?.length > 0 ? (
        <ul>
          {character.positiveTraits.map((trait, index) => (
            <li key={index}>
              <strong>{trait.title}</strong> ({trait.tag})  
              <p>{trait.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No positive traits.</p>
      )}

      <h3>Negative Traits</h3>
      {character.negativeTraits?.length > 0 ? (
        <ul>
          {character.negativeTraits.map((trait, index) => (
            <li key={index}>
              <strong>{trait.title}</strong> ({trait.tag})  
              <p>{trait.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No negative traits.</p>
      )}
    </div>
  );
}
