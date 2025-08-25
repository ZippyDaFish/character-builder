'use client';
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { db, auth } from '@/app/lib/firebase/firebaseConfig';
import { doc, onSnapshot, deleteDoc, collection, query, where } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

import CharacterList from "../components/characterList";
import styles from "./page.module.css";

export default function CharacterSelection() {
    const [characters, setCharacters] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [filterArchetype, setFilterArchetype] = useState(null); // ✅ archetype filter
    const router = useRouter();

    // Archetypes list
    const archetypes = [
        "Scholar",
        "Guardian",
        "Altruist",
        "Freespirit",
        "Paragon",
        "Jubilant",
        "Shepard",
        "Strategist"
    ];

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

    // Delete character
    const handleDeleteCharacter = async (charId) => {
        try {
            await deleteDoc(doc(db, "characters", charId));
            console.log(`Character with ID ${charId} deleted successfully`);
        } catch (error) {
            console.error("Error deleting character:", error);
        }
    };

    // Filter by search
    const filteredCharacters = useMemo(() => {
        return characters.filter((char) => {
            const nameMatch = char.name?.toLowerCase().includes(searchTerm.toLowerCase());
            const storyMatch = char.story?.toLowerCase().includes(searchTerm.toLowerCase());
            return nameMatch || storyMatch;
        });
    }, [characters, searchTerm]);

    // ✅ Filter by archetype
    const archetypeFiltered = useMemo(() => {
        if (!filterArchetype) return filteredCharacters;
        return filteredCharacters.filter((char) => char.archetype === filterArchetype);
    }, [filteredCharacters, filterArchetype]);

    // Sort by name
    const sortedCharacters = useMemo(() => {
        return [...archetypeFiltered].sort((a, b) => {
            const nameA = String(a.name || "").toLowerCase();
            const nameB = String(b.name || "").toLowerCase();

            return sortOrder === "asc"
                ? nameA.localeCompare(nameB)
                : nameB.localeCompare(nameA);
        });
    }, [archetypeFiltered, sortOrder]);

    // Toggle sort order
    const toggleSortOrder = () => {
        setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    };

    // ✅ Cycle through archetypes
    const cycleFilter = () => {
        if (filterArchetype === null) {
            setFilterArchetype(archetypes[0]);
        } else {
            const currentIndex = archetypes.indexOf(filterArchetype);
            const nextIndex = (currentIndex + 1) % archetypes.length;
            // If we wrapped back to start, reset to no filter
            if (nextIndex === 0) {
                setFilterArchetype(null);
            } else {
                setFilterArchetype(archetypes[nextIndex]);
            }
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.content}>
                <div className={styles.characterArea}>
                    <div className={styles.topBar}>
                        <div className={styles.searchContainer}>
                            <input 
                                type="text" 
                                placeholder="Search by Name or Story" 
                                className={styles.searchInput}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className={styles.searchButton}>🔍</button>
                        </div>
                        <div className={styles.topButtonsContainer}>
                            <div className={styles.controlGroup}>
                                <span className={styles.controlLabel}>Order by:</span>
                                <button 
                                className={styles.controlButton}
                                onClick={toggleSortOrder}
                                >
                                Name {sortOrder === "asc" ? "↑" : "↓"}
                                </button>
                            </div>
                            <div className={styles.controlGroup}>
                                <span className={styles.controlLabel}>Filter by:</span>
                                <select
                                value={filterArchetype || "All"}
                                onChange={(e) =>
                                    setFilterArchetype(e.target.value === "All" ? null : e.target.value)
                                }
                                className={styles.controlDropdown}
                                >
                                <option value="All">All</option>
                                {archetypes.map((a) => (
                                    <option key={a} value={a}>{a}</option>
                                ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    <CharacterList
                        characters={sortedCharacters}
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
