'use client';

import { useState } from "react";
import { Character } from "../utils/types/Character";
import Button from "../components/Button";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "../utils/supabase/client";

export default function GachaPage() {
    const [rolledCharacter, setRolledCharacter] = useState<Character | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isExist, setIsExist] = useState(false);

    const handleRoll = async () => {
        const supabase = await createClient();
        const { data: userCollectionData, error } = await supabase.from("usercollection").select()
        // Fetch the user's acquired characters from the database
        const characterPromises = userCollectionData!.map(async (character, index) => {
            const { data, error } = await supabase
                .from("gachacharacters")
                .select()
                .eq('id', character.character_id)
                .single();

            if (error) {
                console.error(`Error fetching character ${character.id}:`, error);
                return null;
            }
            return data;
        });

        // Ensure that this variable is waiting for all promises to resolve
        const resolvedCharacters = await Promise.all(characterPromises);

        // Filter out any null values in case some characters were not found
        const userAcquiredCharacters = resolvedCharacters.filter(character => character !== null);

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
            const characterExists = userAcquiredCharacters.some(
                (character) => character.name === data.data.name
            );

            if(characterExists) {
                setIsExist(true);
                return;
            } else {
                setIsExist(false);
                // Add the rolled character to the collection
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