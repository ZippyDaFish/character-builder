import React from "react";
import Link from "next/link";

export default function NavigationHeader() {
    return (
        <div>
            <Link href="/character-selection">Characters</Link>
            <Link href="/about">About</Link>
            <button>Sign Out</button>
        </div>
    )
}