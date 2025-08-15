import React from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/characterCard.css";

export default function CharacterCard({ name, archetype, charId }) {
    const router = useRouter();

    const handleClickCharacter = () => {
        router.push(`/character-sheet/${charId}`);
    };
    const handleClickEditCharacter = () => {
        router.push(`/character-editor/${charId}`)
    }

    return (
        <div className="content-container">
             <h1>{name}</h1>
            <h3>{archetype}</h3>
            <div className="buttons-container">
                <button onClick={handleClickCharacter}>View</button>
                <button onClick={handleClickEditCharacter}>Edit</button>
            </div>
        </div>
    )
}