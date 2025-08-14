import React from "react";
import { useRouter } from "next/navigation";

export default function CharacterCard({ name, archetype, charId }) {
    const router = useRouter();

    const handleClickCharacter = () => {
        router.push(`/character-sheet/${charId}`);
    };
    const handleClickEditCharacter = () => {
        router.push(`/character-editor/${charId}`)
    }

    return (
        <div>
            <div onClick={handleClickCharacter}>          
                <h1>{name}</h1>
                <h3>{archetype}</h3>
            </div>
            <div onClick={handleClickEditCharacter}>
                <h1>Edit</h1>
            </div>
        </div>
    )
}