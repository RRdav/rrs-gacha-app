'use client';

import { CollectionContext } from "@/contexts/CollectionContext"
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react"

export default function CollectionPage() {

    const { acquiredCharacters } = useContext(CollectionContext);

    return (
        <main className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <Link href="/gacha" className=" text-blue-500 hover:underline">
                Back to Gacha
            </Link>
            <h1>Hello, this is where your collection will show up!</h1>
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {acquiredCharacters.map((character, index) => (
                    <li key={index}>
                        <h2>{character.name}</h2>
                        <p>Rarity: {character.rarity}</p>
                        <figure className="relative w-[500px] h-[500px]">
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