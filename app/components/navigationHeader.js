'use client';
import React from "react";
import Link from "next/link";
import SignOutButton from "./signOutButton";
import { usePathname } from "next/navigation";
import styles from "../styles/navigationHeader.css";

export default function NavigationHeader() {
    const pathName = usePathname();
    const isRestricted = pathName.startsWith("/sign");

    return (
        <div className="page-container">
            {isRestricted ? (
                <div></div>
            ) : (
                <div className="container">
                    <Link href="/character-selection">Characters</Link>
                    <Link href="/about">About</Link>
                    <SignOutButton/>
                </div>
            )}
        </div>
    )
}