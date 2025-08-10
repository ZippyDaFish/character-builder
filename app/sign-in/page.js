'use client';
import { useState } from "react";
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/app/lib/firebase/firebaseConfig';
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
    const router = useRouter();

    const handleSignIn = async () => {
        try {
            const res = await signInWithEmailAndPassword(email, password);
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
            <h1>User Sign-In</h1>
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
            <button onClick={handleSignIn}>Sign In</button>
        </div>
    )
}