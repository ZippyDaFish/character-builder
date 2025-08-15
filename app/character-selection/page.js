'use client';
import { useEffect, useState } from "react";
import { db, auth } from '@/app/lib/firebase/firebaseConfig';
import { doc, onSnapshot, deleteDoc, collection, query, where } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

import CharacterCard from "../components/characterCard";

export default function CharacterSelection() {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            if (user) {
                const q = query(
                    collection(db, 'characters'),
                    where('createdBy', '==', user.email)
                );

                const unsubscribeSnapshot = onSnapshot(q, (querySnapshot) => {
                    const userCharacters = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setCharacters(userCharacters);
                });

                return unsubscribeSnapshot;
            } else {
                setCharacters([]);
            }
        });

        return () => unsubscribeAuth();
    }, []);


    const handleDeleteCharacter = async (charId) => {
        try {
            await deleteDoc(doc(db, "characters", charId));
            console.log(`Character with ID ${charId} deleted successfully`);
        } catch (error) {
            console.error("Error deleting character:", error);
        }
    };

    return (
        <div>
            <h1>Character Selection</h1>
            <div>
                {characters.map((character) => (
                    <CharacterCard key={character.id} character={character} handleDeleteCharacter={handleDeleteCharacter}/>
                ))}
            </div>
        </div>
    )
}