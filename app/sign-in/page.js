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
        <div className={styles.page}>
            <div className={styles.leftPanel}>
                <div className={styles.leftContent}>
                    <div className={styles.redLine}></div>
                    <h1 className={styles.title}>Horror TTRPG</h1>
                    <div className={styles.redLine}></div>
                    <p>A Tabletop-Role-Playing-Game</p>
                    <p><strong>Character Builder</strong></p>
                </div>
            </div>
            <div className={styles.rightPanel}>
                <div className={styles.formContainer}>
                    <h2>Welcome Back</h2>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.formInput}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.formInput}
                    />
                    <button onClick={handleSignIn} className={styles.formButton}>
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    )
}