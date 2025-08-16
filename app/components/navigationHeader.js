'use client';
import React from "react";
import Link from "next/link";
import SignOutButton from "./signOutButton";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import styles from "../styles/navigationHeader.css";

export default function NavigationHeader() {
    const pathName = usePathname();
    const isRestricted = pathName === "/" || pathName.startsWith("/sign");
    const router = useRouter();
    const auth = getAuth();

    const [user, setUser] = useState(undefined);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        setUser(firebaseUser);
        });
        return () => unsubscribe();
    }, [auth]);

    useEffect(() => {
        if (!user) {
            // don’t redirect if already on "/" or a sign route
            if (pathName !== "/" && !pathName.startsWith("/sign")) {
                router.push("/sign-in");
            }
        }
    }, [user, router, pathName]);

    if(user === undefined) { return null; }

    return (
        <div className="page-container">
            {isRestricted ? (
                <div className="container">
                    <div>
                        <Link href="/sign-in">Sign-In</Link>
                        <Link href="/sign-up">Sign-Up</Link>
                    </div>
                </div>
            ) : (
                <div className="container">
                    <Link href="/character-selection">Characters</Link>
                    <Link href="/about">About</Link>
                    <p>{user?.email || ""}</p>
                    <SignOutButton/>
                </div>
            )}
        </div>
    )
}