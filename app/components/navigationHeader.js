import React from "react";
import Link from "next/link";
import SignOutButton from "./signOutButton";
import styles from "../styles/navigationHeader.css";

export default function NavigationHeader() {
    return (
        <div className="container">
            <Link href="/character-selection">Characters</Link>
            <Link href="/about">About</Link>
            <SignOutButton/>
        </div>
    )
}