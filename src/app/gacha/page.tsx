'use client';

import { useState } from "react";
import Button from "../components/Button";
import { Character } from "../utils/types/Character";
import Image from "next/image";

export default function GachaPage() {
    const [rolledCharacter, setRolledCharacter] = useState<Character | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleRoll = async () => {
        try {
            setIsLoading(true);
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
        finally {
            setIsLoading(false);
        }
    }

    return(
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                {!isLoading && (
                    <section>
                        <h1 className="text-2xl font-bold">RR's Super Gacha App</h1>
                        <p className="text-lg">{rolledCharacter?.name ? rolledCharacter.name : "Roll Now!"}</p>
                        <small>
                            {rolledCharacter?.rarity ? rolledCharacter.rarity.charAt(0).toUpperCase() + rolledCharacter.rarity.slice(1): ""}
                        </small>
                        {rolledCharacter?.image_url &&
                            <figure className="relative w-full h-[200px] max-w-[200px] max-h-[200px]">
                                    <Image
                                        src={rolledCharacter.image_url}
                                        alt={rolledCharacter.name}
                                        fill
                                        className="object-contain max-w-[200px] max-h-[200px] rounded-lg"
                                    />
                            </figure>
                        }
                    </section>
                )}
                {isLoading && <p>Rolling...</p>}

                <Button onClick={handleRoll}>
                    Roll!
                </Button>
            </main>
        </div>
    )
}