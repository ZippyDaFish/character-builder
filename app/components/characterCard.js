import React from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/characterCard.css";

export default function CharacterCard({ character, handleDeleteCharacter }) {
    const router = useRouter();

    const handleClickCharacter = () => {
        router.push(`/character-sheet/${character.id}`);
    };
    const handleClickEditCharacter = () => {
        router.push(`/character-editor/${character.id}`)
    };
    const handleClickDelete = () => {
        handleDeleteCharacter(character.id);
    }

    return (
        <div className="content-container">
             <h1>{character.name}</h1>
            <h3>{character.archetype}</h3>
            <div className="buttons-container">
                <button onClick={handleClickCharacter}>View</button>
                <button onClick={handleClickEditCharacter}>Edit</button>
                <button onClick={handleClickDelete}>Delete</button>
            </div>
        </div>
    )
}