'use client';
import { useState } from "react";

import { db, auth } from '@/app/lib/firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export default function CharacterEditor(){
    const [formData, setFormData] = useState({
        name: '',
        archetype: '',
        vitality: 0,
        humanity: 0,
        sanity: 0,
        ingenuity: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    async function handleSaveCharacter(){
        console.log("saving character...");

        const user = auth.currentUser;

        if(!user || !user.email){
            throw new Error('User not authenticated');
        }

        const characterData = {
            ...formData,
            createdBy: user.email,
        };
        const docRef = await addDoc(collection(db, 'characters'), characterData);
        return docRef.id;
    }

    return (
        <div>
            <input type="text" placeholder="Character Name" name="name" onChange={handleChange}></input>
            <h3>Archetype: </h3>
            <select id="archetype" name="archetype" value={formData.archetype} onChange={handleChange}>
                <option value="bruiser">Bruiser</option>
                <option value="guardian">Guardian</option>
                <option value="altruist">Altruist</option>
            </select>
            <h3>Vitality: </h3>
            <input type="number" min="0" max="50" name="vitality" onChange={handleChange}></input>
            <h3>Humanity: </h3>
            <input type="number" min="0" max="50" name="humanity" onChange={handleChange}></input>
            <h3>Sanity: </h3>
            <input type="number" min="0" max="50" name="sanity" onChange={handleChange}></input>
            <h3>Ingenuity: </h3>
            <input type="number" min="0" max="50" name="ingenuity" onChange={handleChange}></input>
            <button onClick={handleSaveCharacter}>Save Character</button>
        </div>
    );
}