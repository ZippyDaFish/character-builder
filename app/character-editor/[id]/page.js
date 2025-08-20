'use client';
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { db, auth } from '@/app/lib/firebase/firebaseConfig';
import { collection, addDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import styles from "../page.module.css";

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
        positiveTraits: [],
        negativeTraits: []
    });

    const [loading, setLoading] = useState(true);

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
                setFormData(prev => ({ ...prev, ...snap.data() }));
            }
            setLoading(false);
        }
        fetchData();
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
        if (!user || !user.email) return;

        const characterData = { ...formData, createdBy: user.email };

        if (id === 'new') {
            const docRef = await addDoc(collection(db, 'characters'), characterData);
            router.push(`/character-editor/${docRef.id}`);
        } else {
            await setDoc(doc(db, 'characters', id), characterData, { merge: true });
        }
    }

    if (loading) return <p>Loading...</p>;

    return (
        <div className={styles.editorContainer}>
            <h1 className={styles.header}>
                {id === 'new' ? 'Create New Character' : 'Edit Character'}
            </h1>

            <div className={styles.formGrid}>
                <label className={styles.label}>Name</label>
                <input
                    className={styles.input}
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Character Name"
                />

                <label className={styles.label}>Archetype</label>
                <select
                    className={styles.select}
                    name="archetype"
                    value={formData.archetype}
                    onChange={handleChange}
                >
                    <option value="">--Select--</option>
                    <option value="bruiser">Bruiser</option>
                    <option value="guardian">Guardian</option>
                    <option value="altruist">Altruist</option>
                </select>

                <label className={styles.label}>Vitality</label>
                <input className={styles.input} type="number" name="vitality" value={formData.vitality} onChange={handleChange} />

                <label className={styles.label}>Humanity</label>
                <input className={styles.input} type="number" name="humanity" value={formData.humanity} onChange={handleChange} />

                <label className={styles.label}>Sanity</label>
                <input className={styles.input} type="number" name="sanity" value={formData.sanity} onChange={handleChange} />

                <label className={styles.label}>Ingenuity</label>
                <input className={styles.input} type="number" name="ingenuity" value={formData.ingenuity} onChange={handleChange} />

                <label className={styles.label}>Calm Points</label>
                <input className={styles.input} type="number" name="calmPoints" value={formData.calmPoints} onChange={handleChange} />

                <label className={styles.label}>Description</label>
                <textarea className={styles.textarea} name="description" value={formData.description} onChange={handleChange} />

                <label className={styles.label}>Background</label>
                <textarea className={styles.textarea} name="background" value={formData.background} onChange={handleChange} />

                <label className={styles.label}>Notes</label>
                <textarea className={styles.textarea} name="notes" value={formData.notes} onChange={handleChange} />
            </div>

            {/* Positive Traits */}
            <div className={styles.traitsSection}>
                <h3>Positive Traits</h3>
                {formData.positiveTraits.map((trait, index) => (
                    <div key={index} className={styles.traitBox}>
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="Title"
                            value={trait.title}
                            onChange={(e) => handleTraitChange("positiveTraits", index, "title", e.target.value)}
                        />
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="Description"
                            value={trait.description}
                            onChange={(e) => handleTraitChange("positiveTraits", index, "description", e.target.value)}
                        />
                        <select
                            className={styles.select}
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
                <button className={styles.addButton} onClick={() => addTrait("positiveTraits")}>+ Add Positive Trait</button>
            </div>

            {/* Negative Traits */}
            <div className={styles.traitsSection}>
                <h3>Negative Traits</h3>
                {formData.negativeTraits.map((trait, index) => (
                    <div key={index} className={styles.traitBox}>
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="Title"
                            value={trait.title}
                            onChange={(e) => handleTraitChange("negativeTraits", index, "title", e.target.value)}
                        />
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="Description"
                            value={trait.description}
                            onChange={(e) => handleTraitChange("negativeTraits", index, "description", e.target.value)}
                        />
                        <select
                            className={styles.select}
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
                <button className={styles.addButton} onClick={() => addTrait("negativeTraits")}>+ Add Negative Trait</button>
            </div>

            <button className={styles.saveButton} onClick={handleSaveCharacter}>
                {id === 'new' ? 'Create Character' : 'Save Changes'}
            </button>
        </div>
    );
}
