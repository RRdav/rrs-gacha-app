
import { Character } from '@/app/utils/types/Character';
import { createClient } from '@/app/utils/supabase/client';


export async function POST(request: Request) {
    // Create gacha logic
    const supabase = await createClient();
    const { error, data } = await supabase.from("gachacharacters").select();

    const charactersData: Character[] = data as Character[];

    // Roll for a rarity
    const rarityRoll = (): Character['rarity'] => {

        // Probabilites for each rarity
        const probabilities = {
            common: 0.60,     // 60%
            rare: 0.25,       // 25%
            super_rare: 0.10, // 10%
            legendary: 0.04,  // 4%
            mythical: 0.01    // 1%
        };

    // Determine the rarity of the character you can roll
        const rand = Math.random();
            if (rand < probabilities.common) {
                return 'common';
            } else if (rand < probabilities.common + probabilities.rare) {
                return 'rare';
            } else if (rand < probabilities.common + probabilities.rare + probabilities.super_rare) {
                return 'super_rare';
            } else if (rand < probabilities.common + probabilities.rare + probabilities.super_rare + probabilities.legendary) {
                return 'legendary';
            } else {
                return 'mythical';
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

    return new Response(JSON.stringify({message: "Data logged succesfully", data: rolledCharacter}), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    })
}