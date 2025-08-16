'use client';
import CharacterCard from "./characterCard";

export default function CharacterList({ characters, handleDeleteCharacter }) {
    return (
        <div>
            {characters.map((character) => (
                <CharacterCard
                    key={character.id}
                    character={character}
                    handleDeleteCharacter={handleDeleteCharacter}
                />
            ))}
        </div>
    );
}