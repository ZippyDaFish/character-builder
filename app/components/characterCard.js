"use client";
import React from "react";
import { useRouter } from "next/navigation";
import "../styles/characterCard.css";

export default function CharacterCard({ character, handleDeleteCharacter }) {
  const router = useRouter();

  const handleClickCharacter = () => {
    router.push(`/character-sheet/${character.id}`);
  };
  const handleClickEditCharacter = () => {
    router.push(`/character-editor/${character.id}`);
  };
  const handleClickDelete = () => {
    handleDeleteCharacter(character.id);
  };

  return (
    <div className="card">
      <h1 className="name">{character.name}</h1>
      <h3 className="archetype">{character.archetype}</h3>
      <div className="buttons">
        <button className="button view" onClick={handleClickCharacter}>
          View
        </button>
        <button className="button edit" onClick={handleClickEditCharacter}>
          Edit
        </button>
        <button className="button delete" onClick={handleClickDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}
