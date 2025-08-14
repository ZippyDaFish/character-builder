import React from "react";
import { useRouter } from "next/navigation";

export default function CharacterCard({ name, archetype, charId }) {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/character-sheet/${charId}`);
    };

    return (
        <div onClick={handleClick}>          
            <h1>{name}</h1>
            <h3>{archetype}</h3>
        </div>
    )
}