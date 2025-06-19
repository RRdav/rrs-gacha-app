import { UUID } from "crypto";

export interface Character {
    id: string;
    jikan_id: number;
    name: string;
    image_url: string;
    rarity: 'common' | 'rare' | 'super_rare' | 'legendary' | 'mythical';
    description: string;
    series: string;
}

export interface CharacterAcquired {
    id: string;
    character_id: string;
    obtained_at: string; // ISO string format for date
}