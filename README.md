This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

<!-- To build with -->
- Next
- Supabase
- Jikan API

<!-- TODO -->
- Need to find or make an API for this project. Preferrably Anime characters and stuff. Ability to add rarity.
- Need an MVP first, showing that rolling works and that you can get a character.
- How to add percentage chance of getting a character based on rarity?
- Add a way to show the characters you have rolled.
- Implement DB, maybe try out Prisma? Or literally just try to use supabase.
- Add a login system, maybe use NextAuth.js?


<!-- Some notes for backend stuff -->
- Use Jikan API for anime characters : https://api.jikan.moe/v4/characters/50389/ example
- Fetch about 500 characters, store in DB
- After fetching and before storing to DB add a rarity field to each character

<!-- Some notes for gacha mechanics -->
- Create a rolling mechanic that allows users to roll for characters.
- Implement a rarity system, e.g., common, rare, epic, legendary.
- Show the characters rolled in a list or grid format.