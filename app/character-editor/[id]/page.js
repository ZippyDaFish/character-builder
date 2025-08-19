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
        ingenuity: 0,
        calmPoints: 0,
        notes: '',
        description: '',
        background: '',
        positiveTraits: [], // array of { title, description, tag }
        negativeTraits: []  // array of { title, description, tag }
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
                setFormData({ ...formData, ...snap.data() });
            }
            setLoading(false);
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleTraitChange = (type, index, field, value) => {
        setFormData(prev => {
            const updatedTraits = [...prev[type]];
            updatedTraits[index][field] = value;
            return { ...prev, [type]: updatedTraits };
        });
    };

    const addTrait = (type) => {
        setFormData(prev => ({
            ...prev,
            [type]: [...prev[type], { title: '', description: '', tag: '' }]
        }));
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
            const docRef = await addDoc(collection(db, 'characters'), characterData);
            router.push(`/character-editor/${docRef.id}`);
        } else {
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

            <h3>Calm Points:</h3>
            <input type="number" min="0" name="calmPoints" value={formData.calmPoints} onChange={handleChange} />

            <h3>Description:</h3>
            <textarea name="description" value={formData.description} onChange={handleChange} />

            <h3>Background:</h3>
            <textarea name="background" value={formData.background} onChange={handleChange} />

            <h3>Notes:</h3>
            <textarea name="notes" value={formData.notes} onChange={handleChange} />

            {/* Positive Traits */}
            <h3>Positive Traits</h3>
            {formData.positiveTraits.map((trait, index) => (
                <div key={index}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={trait.title}
                        onChange={(e) => handleTraitChange("positiveTraits", index, "title", e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={trait.description}
                        onChange={(e) => handleTraitChange("positiveTraits", index, "description", e.target.value)}
                    />
                    <select
                        value={trait.tag}
                        onChange={(e) => handleTraitChange("positiveTraits", index, "tag", e.target.value)}
                    >
                        <option value="">--Tag--</option>
                        <option value="vitality">Vitality</option>
                        <option value="humanity">Humanity</option>
                        <option value="sanity">Sanity</option>
                        <option value="ingenuity">Ingenuity</option>
                    </select>
                </div>
            ))}
            <button onClick={() => addTrait("positiveTraits")}>+ Add Positive Trait</button>

            {/* Negative Traits */}
            <h3>Negative Traits</h3>
            {formData.negativeTraits.map((trait, index) => (
                <div key={index}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={trait.title}
                        onChange={(e) => handleTraitChange("negativeTraits", index, "title", e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={trait.description}
                        onChange={(e) => handleTraitChange("negativeTraits", index, "description", e.target.value)}
                    />
                    <select
                        value={trait.tag}
                        onChange={(e) => handleTraitChange("negativeTraits", index, "tag", e.target.value)}
                    >
                        <option value="">--Tag--</option>
                        <option value="vitality">Vitality</option>
                        <option value="humanity">Humanity</option>
                        <option value="sanity">Sanity</option>
                        <option value="ingenuity">Ingenuity</option>
                    </select>
                </div>
            ))}
            <button onClick={() => addTrait("negativeTraits")}>+ Add Negative Trait</button>

            <button onClick={handleSaveCharacter}>
                {id === 'new' ? 'Create Character' : 'Save Changes'}
            </button>
        </div>
    );
}
