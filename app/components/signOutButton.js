'use client';
import React from "react";

import { auth } from '@/app/lib/firebase/firebaseConfig';
import { signOut } from 'firebase/auth';

export default function SignOutButton() {
    const handleSignOut = async () => {
        try{
            await signOut(auth);
            console.log('User signed out');
        } catch(error){
            console.error('Sign-out error:', error);
        }
    }

    return (
        <button onClick={handleSignOut}>Sign Out</button>
    )
}