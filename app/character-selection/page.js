'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db, auth } from '@/app/lib/firebase/firebaseConfig';
import { doc, onSnapshot, deleteDoc, collection, query, where } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

import CharacterList from "../components/characterList";

export default function CharacterSelection() {
    const [characters, setCharacters] = useState([]);
    const router = useRouter();

    // Fetch characters from firestore
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

    // Removes character from firestore using ID
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
            <button onClick={() => router.push('/character-editor/new')}>New Character</button>
            <CharacterList
                characters={characters}
                handleDeleteCharacter={handleDeleteCharacter}
            />
        </div>
    )
}