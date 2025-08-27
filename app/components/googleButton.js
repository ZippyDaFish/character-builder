'use client';

import { signInWithGoogle } from "@/app/lib/firebase/googleAuth";
import { useRouter } from "next/navigation";

export default function GoogleButton() {
  const router = useRouter();

  const handleClick = async () => {
    try {
      const user = await signInWithGoogle();
      console.log("Google user:", user);
      router.push("/character-selection");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <button onClick={handleClick}>
      Continue with Google
    </button>
  );
}
