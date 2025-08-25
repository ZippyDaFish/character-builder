'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { db, auth } from '@/app/lib/firebase/firebaseConfig';
import { doc, onSnapshot, deleteDoc, collection, query, where } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

import CharacterList from "../components/characterList";
import styles from "./page.module.css";

export default function CharacterSelection() {
    const [characters, setCharacters] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
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

    const filteredCharacters = characters.filter((char) => {
        const nameMatch = char.name?.toLowerCase().includes(searchTerm.toLowerCase());
        const storyMatch = char.story?.toLowerCase().includes(searchTerm.toLowerCase());
        return nameMatch || storyMatch;
    });

    return (
        <div className={styles.page}>
            <div className={styles.content}>
                <div className={styles.characterArea}>
                    <div className={styles.topBar}>
                        <div className={styles.searchContainer}>
                            <input 
                                type="text" 
                                placeholder="Search by Name" 
                                className={styles.searchInput} 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className={styles.searchButton}>🔍</button>
                        </div>
                        <div>
                            <button className={styles.topButton}>Order by: Newest</button>
                            <button className={styles.topButton}>Filter by: Attribute</button>
                        </div>
                    </div>
                    <CharacterList
                        characters={filteredCharacters}
                        handleDeleteCharacter={handleDeleteCharacter}
                    />
                </div>
                <div className={styles.sidebar}>
                    <button 
                        onClick={() => router.push('/character-editor/new')} 
                        className={styles.newCharacterButton}
                    >
                        Create New Character
                    </button>
                </div>
            </div>
        </div>
    )
}