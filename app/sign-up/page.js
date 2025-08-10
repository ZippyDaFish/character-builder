'use client';
import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/app/lib/firebase/firebaseConfig';
import { useRouter } from "next/navigation";

import styles from "./page.module.css";

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
    const router = useRouter();

    const handleSignUp = async () => {
        try {
            const res = await createUserWithEmailAndPassword(email, password);
            console.log(res);
            setEmail('');
            setPassword('');
            router.push('/character-selection');
        } catch(e){
            console.error(e);
        }
    };

    return (
        <div className={styles.pageContent}>
            <h1>User Sign-Up</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSignUp}>Sign Up</button>
        </div>
    )
}