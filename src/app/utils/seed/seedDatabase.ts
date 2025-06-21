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
    series: string;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function seedDatabase(){
    const supabase = await createClient();
    const url = 'https://api.jikan.moe/v4/random/characters';


    // Fetch 50 characters from the Jikan api with random IDs

    // Try statement for mostly common random character fetch
    try {
        const count = 50;
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
                about,
                favorites,
            } = characterData;

            // Get the series name from the character data
            const animeURL = "https://api.jikan.moe/v4/characters/" + mal_id + "/anime";
            const animeResponse = await fetch(animeURL);
            let characterSeries: string[] = []; // Initialize an empty array for series names

            if(animeResponse.ok) {
                const anime = await animeResponse.json();
                const animeData = anime.data;
                // Extract the series name from the anime data
                characterSeries = animeData.map((anime: any) => anime.anime.title);
            }

            // Join the series names into a single string or keep it as an array
            const seriesName = characterSeries.join(', '); // Join series names into a string


            // Add random rarity to the fetched character
            const rarities: Character['rarity'][] = ['common', 'rare', 'super_rare', 'legendary', 'mythical'];
            let randomRarity: Character['rarity'] = 'common'; // Default rarity

            // Determine rarity based on favourites
            if(favorites < 100 ) {
                randomRarity = 'common';
            }
            else if(favorites < 500) {
                randomRarity = 'rare';
            }
            else if(favorites < 1000) {
                randomRarity = 'super_rare';
            }
            else if(favorites < 5000) {
                randomRarity = 'legendary';
            }
            else if(favorites < 10000) {
                randomRarity = 'mythical';
            }

            // Create a character object
            const character: Character = {
                id: crypto.randomUUID(),
                jikan_id: mal_id,
                name: name,
                image_url: image_url,
                rarity: randomRarity,
                description: about,
                series: seriesName || "Unknown Series" // Use the series name or default to "Unknown Series"
            };


            // console.log("Character to insert:", character);

            // Insert the characters into the database
            try {
                const { error } = await supabase
                .from("gachacharacters")
                .insert(character);
                console.log("Character inserted:", character.name);
                console.log("Data inserted successfully:", error);
            } catch (error) {
                console.error("Error inserting data:", error);
            }

            delay(1000); // Delay to avoid hitting the API rate limit

        }
    }

    // Try statement for top characters fetch
    // try {
    //     // Loop through and randomly select 5 characters form the top  characters data
    //     const count = 50;
    //     for (let i = 0; i < count; i++) {
    //         const randPage = Math.floor(Math.random() * 100) + 1
    //         const topCharactersURL = `https://api.jikan.moe/v4/top/characters?page=${randPage}`;
    //         console.log("Seeding from page ", randPage);

    //         const response = await fetch(topCharactersURL);
    //         if (!response.ok) {
    //             throw new Error(`HTTP error! status: ${response.status}`);
    //         }

    //         const apiResponse = await response.json();
    //         const topCharactersData = apiResponse.data;

    //         const rand = Math.floor(Math.random() * topCharactersData.length);
    //         const characterData = topCharactersData[rand];

    //         // Destructure the necessary fields from the character data
    //         const {
    //             mal_id,
    //             name,
    //             images: {jpg: {image_url}},
    //             about,
    //             favorites,
    //         } = characterData;

    //         // Get the series name from the character data
    //         const animeURL = "https://api.jikan.moe/v4/characters/" + mal_id + "/anime";
    //         const animeResponse = await fetch(animeURL);
    //         let characterSeries: string = ''; // Initialize an empty array for series names

    //         if(animeResponse.ok) {
    //             const anime = await animeResponse.json();
    //             const animeData = anime.data;
    //             // Extract the series name from the anime data
    //             if (Array.isArray(animeData)) {
    //                 // Find the first appearance that has a valid anime title
    //                 const firstAppearance = animeData.find((appearance: any) => appearance.anime && appearance.anime.title);

    //                 // If we found one, update seriesName with its title
    //                 if (firstAppearance) {
    //                     characterSeries = firstAppearance.anime.title;
    //                 }
    //             }
    //         }

    //         // Join the series names into a single string or keep it as an array

    //         // Add random rarity to the fetched character
    //         let randomRarity: Character['rarity'] = 'common'; // Default rarity

    //         // Determine rarity based on favourites
    //         if ( favorites > 50000) {
    //             randomRarity = 'mythical';
    //         }
    //         else if (favorites > 20000) {
    //             randomRarity = 'legendary';
    //         }
    //         else if (favorites > 10000) {
    //             randomRarity = 'super_rare';
    //         }
    //         else if (favorites > 300) {
    //             randomRarity = 'rare';
    //         } else {
    //             randomRarity = 'common';
    //         }

    //         // Create a character object
    //         const character: Character = {
    //             id: crypto.randomUUID(),
    //             jikan_id: mal_id,
    //             name: name,
    //             image_url: image_url,
    //             rarity: randomRarity,
    //             description: about,
    //             series: characterSeries || "Unknown Series"
    //         };


    //         // Insert the characters into the database
    //         try {
    //             const { error } = await supabase
    //             .from("gachacharacters")
    //             .insert(character);
    //             console.log("Character inserted:", character.name);
    //             console.log("Data inserted successfully:", error);
    //         } catch (error) {
    //             console.error("Error inserting data:", error);
    //         }

    //         await delay(1000); // Delay to avoid hitting the API rate limit
    //     }
    // }

    catch (error) {
        console.error("Error fetching data:", error);
        return;
    }
}

seedDatabase().then(() =>{
    console.log("Database seeded successfully");
}).catch((error) =>{
    console.error("Error seeding database:", error);
})