'use client';

import { useState } from "react";
import Button from "../components/Button";
import { Character } from "../utils/types/Character";

export default function GachaPage() {
    const [rolledCharacter, setRolledCharacter] = useState<Character | null>(null);

    const handleRoll = async () => {
        try {
            const response = await fetch('/api/rolls', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setRolledCharacter(data.data);
        }
        catch (err) {
            console.error('Error fetching data:', err);
        }
    }

    return(
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                {rolledCharacter?.name}

                <Button onClick={handleRoll}>
                    Roll!
                </Button>
            </main>
        </div>
    )
}