
export interface Character {
    id: number;
    name: string;
    image_url: string;
    rarity: 'common' | 'rare' | 'super_rare' | 'legendary';
    description: string;
}