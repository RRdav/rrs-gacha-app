import { createClient } from "../supabase/client.ts";
import dotenv from 'dotenv'
import path from 'path';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({path: path.resolve(__dirname, '../../../../.env.local')});

interface Character {
    id: string;
    jikan_id: number;
    name: string;
    image_url: string;
    rarity: 'common' | 'rare' | 'super_rare' | 'legendary' | 'mythical';
    description: string;
}

async function seedDatabase(){
    const supabase = await createClient();
    const url = 'https://api.jikan.moe/v4/random/characters';

    // Fetch 50 characters from the Jikan api with random IDs

    try {
        const count = 3;
        for (let i = 0; i< count; i++) {
            const response = await fetch(url);
            if(!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const apiResponse = await response.json();
            const characterData = apiResponse.data;

            // Destructure the necessary fields from the character data
            const {
                mal_id,
                name,
                images: {jpg: {image_url}},
                about
            } = characterData;

            // Add random rarity to the fetched character
            const rarities: Character['rarity'][] = ['common', 'rare', 'super_rare', 'legendary', 'mythical'];
            const randomRarity = rarities[Math.floor(Math.random() * rarities.length)];

            // Create a character object
            const character: Character = {
                id: crypto.randomUUID(),
                jikan_id: mal_id,
                name: name,
                image_url: image_url,
                rarity: randomRarity,
                description: about
            };


            // Insert the characters into the database

            try {
                const { error } = await supabase
                .from("gachacharacters")
                .insert(character);
                console.log("Data inserted successfully:", error);
            } catch (error) {
                console.error("Error inserting data:", error);
            }

        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return;
    }
}

seedDatabase().then(() =>{
    console.log("Database seeded successfully");
}).catch((error) =>{
    console.error("Error seeding database:", error);
})