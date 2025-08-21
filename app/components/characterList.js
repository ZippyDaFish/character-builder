'use client';
import CharacterCard from "./characterCard";
import "../styles/characterList.css";

export default function CharacterList({ characters, handleDeleteCharacter }) {
  return (
    <div className="character-list">
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
