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
        <p>Class: {character.class}</p>
        <p>Level: {character.level}</p>
        <p>archetype: {character.archetype}</p>
        <p>S: {character.sanity}</p>
        <p>H: {character.humanity}</p>
        <p>I: {character.ingenuity}</p>
        <p>V: {character.vitality}</p>
    </div>
  );
}