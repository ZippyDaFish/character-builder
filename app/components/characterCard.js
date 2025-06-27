import React from "react";

export default function CharacterCard({ name, archetype }) {
    return (
        <div>
            <h1>{name}</h1>
            <h3>{archetype}</h3>
        </div>
    )
}