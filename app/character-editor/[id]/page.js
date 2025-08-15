'use client';
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { db, auth } from '@/app/lib/firebase/firebaseConfig';
import { collection, addDoc, doc, getDoc, setDoc } from 'firebase/firestore';

export default function CharacterEditor() {
    const router = useRouter();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        name: '',
        archetype: '',
        vitality: 0,
        humanity: 0,
        sanity: 0,
        ingenuity: 0
    });

    const [loading, setLoading] = useState(true);

    // Load existing character if not "new"
    useEffect(() => {
        async function fetchData() {
            if (!id) return;
            if (id === 'new') {
                setLoading(false);
                return;
            }
            const docRef = doc(db, "characters", id);
            const snap = await getDoc(docRef);
            if (snap.exists()) {
                setFormData(snap.data());
            }
            setLoading(false);
        }
        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    async function handleSaveCharacter() {
        const user = auth.currentUser;
        if (!user || !user.email) {
            throw new Error('User not authenticated');
        }

        const characterData = {
            ...formData,
            createdBy: user.email,
        };

        if (id === 'new') {
            // Create new character
            const docRef = await addDoc(collection(db, 'characters'), characterData);
            router.push(`/character-editor/${docRef.id}`);
        } else {
            // Update existing
            await setDoc(doc(db, 'characters', id), characterData, { merge: true });
        }
    }

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h1>{id === 'new' ? 'Create New Character' : 'Edit Character'}</h1>

            <input
                type="text"
                placeholder="Character Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
            />
            <h3>Archetype:</h3>
            <select name="archetype" value={formData.archetype} onChange={handleChange}>
                <option value="">--Select--</option>
                <option value="bruiser">Bruiser</option>
                <option value="guardian">Guardian</option>
                <option value="altruist">Altruist</option>
            </select>

            <h3>Vitality:</h3>
            <input type="number" min="0" max="50" name="vitality" value={formData.vitality} onChange={handleChange} />
            <h3>Humanity:</h3>
            <input type="number" min="0" max="50" name="humanity" value={formData.humanity} onChange={handleChange} />
            <h3>Sanity:</h3>
            <input type="number" min="0" max="50" name="sanity" value={formData.sanity} onChange={handleChange} />
            <h3>Ingenuity:</h3>
            <input type="number" min="0" max="50" name="ingenuity" value={formData.ingenuity} onChange={handleChange} />

            <button onClick={handleSaveCharacter}>
                {id === 'new' ? 'Create Character' : 'Save Changes'}
            </button>
        </div>
    );
}
