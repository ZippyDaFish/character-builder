import React from "react";
import Link from "next/link";
import SignOutButton from "./signOutButton";

export default function NavigationHeader() {
    return (
        <div>
            <Link href="/character-selection">Characters</Link>
            <Link href="/about">About</Link>
            <SignOutButton/>
        </div>
    )
}