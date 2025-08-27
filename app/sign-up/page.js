'use client';
import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/app/lib/firebase/firebaseConfig';
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

import GoogleButton from "../components/googleButton";

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
                    <h2>Register</h2>
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
                    <button onClick={handleSignUp} className={styles.formButton}>
                        Confirm
                    </button>

                    <div className={styles.divider}>or</div>
                    <GoogleButton />
                </div>
            </div>
        </div>
    )
}