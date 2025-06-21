

import { CollectionContext } from "@/contexts/CollectionContext"
import Image from "next/image";
import Link from "next/link";
import { createClient } from "../utils/supabase/server";

export default async function CollectionPage() {

    // fetch user specific collection data
    const supabase = await createClient();
    const { data: userCollectionData, error } = await supabase.from("usercollection").select()


    // fetch character data based on user collection id
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


    return (
        <main className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <Link href="/gacha" className=" text-blue-500 hover:underline">
                Back to Gacha
            </Link>
            <h1>Hello, this is where your collection will show up!</h1>
            <ul className="pt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {userAcquiredCharacters.map((character, index) => (
                    <li key={index}>
                        <h2>{character.name}</h2>
                        <p>Rarity: {character.rarity}</p>
                        <figure className="relative w-[100px] h-[100px]">
                            {character.image_url && (
                                <Image
                                    src={character.image_url}
                                    alt={character.name}
                                    fill
                                    className="w-full h-auto object-cover"
                                />
                            )}
                        </figure>
                    </li>
                ))}
            </ul>
        </main>
    )
}