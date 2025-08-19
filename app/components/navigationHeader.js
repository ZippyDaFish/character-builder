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

    const linkClass = (href) =>
        pathName === href ? "nav-link active" : "nav-link";

    return (
        <div className="page-container">
            <div>
                <Link className="header-title" href="/">Horror TTPRPG</Link>
            </div>
            {!user ? (
                <div className="container">
                    <Link className={linkClass("/sign-in")} href="/sign-in">Sign-In</Link>
                    <Link className={linkClass("/sign-up")} href="/sign-up">Sign-Up</Link>
                </div>
            ) : (
                <div className="container">
                    <Link className={linkClass("/character-selection")} href="/character-selection">Characters</Link>
                    <Link className={linkClass("/about")} href="/about">About</Link>
                    <div className="user-info-container">
                        <p>{user?.email || ""}</p>
                        <SignOutButton/>
                    </div>
                </div>
            )}
        </div>
    )
}