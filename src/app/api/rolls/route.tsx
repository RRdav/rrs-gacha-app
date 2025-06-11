
import charactersDataFromFile from '../../../../public/data/anime.json'

// Define types for the characters data
export interface Character {
    id: number;
    name: string;
    image_url: string;
    rarity: 'common' | 'rare' | 'super_rare' | 'legendary';
    description: string;
}

const charactersData: Character[] = charactersDataFromFile as Character[];

export async function POST(request: Request) {
    // Create gacha logic

    // Roll for a rarity
    const rarityRoll = (): Character['rarity'] => {

        // Probabilites for each rarity
        const probabilities = {
            common: 0.5, // 50%
            rare: 0.3, // 30%
            super_rare: 0.15, // 15%
            legendary: 0.05, // 5%
        }

        const rand = Math.random();
            if (rand < probabilities.common) {
                return 'common';
            } else if (rand < probabilities.common + probabilities.rare) {
                return 'rare';
            } else if (rand < probabilities.common + probabilities.rare + probabilities.super_rare) {
                return 'super_rare';
            } else {
                return 'legendary';
            }
    }

    // Roll for a character based on the rarity
    const characterRoll = (rarity: Character['rarity']) : Character => {
        const filteredCharacters = charactersData.filter((char) => char.rarity === rarity )

        if (filteredCharacters.length === 0) {
            throw new Error(`No characters found for rarity: ${rarity}`);
        }

        return filteredCharacters[Math.floor(Math.random() * filteredCharacters.length)];
    }

    const rolledCharacter = characterRoll(rarityRoll());

    // Deconstruct the rolled character
    const { id, name, image_url, rarity, description } = rolledCharacter;

    console.log(`Rolled Character: ${name} (Rarity: ${rarity})`);
    console.log(`Image URL: ${image_url}`);

    return new Response(JSON.stringify({message: "Data logged succesfully", data: charactersData}), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    })
}