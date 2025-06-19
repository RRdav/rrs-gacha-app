'use client';

import { useContext, useState } from "react";
import { Character } from "../utils/types/Character";
import { CollectionContext } from "@/contexts/CollectionContext";
import Button from "../components/Button";
import Image from "next/image";
import Link from "next/link";

export default function GachaPage() {
    const [rolledCharacter, setRolledCharacter] = useState<Character | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isExist, setIsExist] = useState(false);

    // Get the context to update the collection
    const {acquiredCharacters, setAcquiredCharacters} = useContext(CollectionContext);

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

            // Set rolled character to show it on the page
            setRolledCharacter(data.data);

            // Check if the rolled character already exists in the collection
            const characterExists = acquiredCharacters.some(
                (character) => character.name === data.data.name
            );

            if(characterExists) {
                setIsExist(true);
                return;
            } else {
                setIsExist(false);
                // Add the rolled character to the collection
                setAcquiredCharacters((prev: Character[]) => data.data ? [...prev, data.data] : prev);
            }

        }
        catch (err) {
            console.error('Error fetching data:', err);
        }
        finally {
            setIsLoading(false);
        }
    }

    return(
        <div className="pt-20 font-[family-name:var(--font-geist-sans)]">
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

                {isExist && <p className="text-red-500">You already have this character in your collection!</p>}

                <Button onClick={handleRoll}>
                    Roll!
                </Button>
                <Button>
                    <Link href="/collection"> Collection </Link>
                </Button>
            </main>
        </div>
    )
}