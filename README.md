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


## Project Phases (Thanks Gemini)


Phase 1: Core Backend & Data Setup (Mock Data First)
- [x] Set up your Next.js project:
    - [x] Create a new Next.js project using `npx create-next-app@latest my-gacha-project --typescript --tailwind --app`.
    - [x] Verify the basic project runs with `npm run dev`.
- [x] Integrate Mock Data:
    - [x] Create a `public/data` folder in your project root.
    - [x] Save the `characters.json` file (with `placeholder.png` image URLs) inside `public/data`.
    - [x] Create the Gacha Roll API Route (using mock data):
        - [x] Create your API route file (e.g., `app/api/roll/route.ts` if using App Router, or `pages/api/roll.ts` if using Pages Router).
        - [x] Import the `characters.json` data into this API route.
        - [x] Implement the POST method handler (or default function for Pages Router) for the `/api/roll` endpoint.
        - [x] Define rarity probabilities (e.g., Legendary: 5%, Super Rare: 10%, Rare: 25%, Common: 60%).
        - [x] Implement the logic to randomly select a rarity based on these probabilities.
        - [x] Filter your `characters.json` data to get characters of the chosen rarity.
        - [x] Randomly select one character from the filtered list.
        - [x] Return the selected character as a JSON response (e.g., `res.status(200).json(rolledCharacter)`).
        - [x] Test: Use a tool like Postman, Insomnia, or even a simple fetch call in your browser's console or a temporary React component to ensure your `/api/rolls` endpoint returns a character with the correct rarity.

Phase 2: Frontend & UI Development (MVP)
- [x] Design Basic Roll Page:
    - [x] Create a dedicated page for the gacha rolls (e.g., `app/roll/page.tsx` or `pages/roll.tsx`).
    - [x] Add a simple button with text like "Roll!" or "Spin!".
    - [x] Create a state variable (using `useState`) to store the `lastRolledCharacter`.
    - [x] Implement an `onClick` handler for the button that:
        - [x] Sets a loading state (`isLoading`).
        - [x] Makes a fetch call to your `/api/roll` endpoint.
        - [x] Updates the `lastRolledCharacter` state with the response.
        - [x] Clears the loading state.
    - [x] Display the `lastRolledCharacter`'s name and its `image_url` (which should currently be `placeholder.png`) below the button.
    - [x] Add simple styling (e.g., a border or text color) to indicate the rarity of the rolled character.
- [ ] Implement Basic Character Collection Display:
    - [x] Create a separate page or component for displaying the user's collected characters (e.g., `app/collection/page.tsx` or `pages/collection.tsx`).
    - [ ] Create a `CollectionContext` using React's Context API to manage the list of owned characters.
    - [ ] Wrap your application's root (`app/layout.tsx` or `pages/_app.tsx`) with the `CollectionProvider`.
    - [ ] In your roll page, after successfully rolling a character, use the `addCharacter` function from the `CollectionContext` to add the new character to the collection.
    - [ ] In your collection page/component, retrieve and display the `ownedCharacters` from the `CollectionContext` in a list or grid format.
    - [ ] Test: Roll multiple times, navigate to the collection page, and verify that all rolled characters (even duplicates) are displayed. Since you're not using a database yet, these will likely disappear on a full page refresh – that's expected for now.

Phase 3: Database Integration & Persistence
- [ ] Supabase Setup:
    - [ ] Create a new project on Supabase.
    - [ ] Get your Supabase URL and public/service role keys.
    - [ ] Add your Supabase credentials to a `.env.local` file in your project root (e.g., `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`).
- [ ] Design & Create Database Tables:
    - [ ] In the Supabase SQL Editor (or UI), create your `characters` table with columns: `id` (PK, auto-increment), `jikan_id` (INT, unique, nullable), `name` (TEXT), `image_url` (TEXT), `anime_series` (TEXT, nullable), `description` (TEXT, nullable), `rarity` (TEXT).
- [ ] Data Ingestion into Supabase:
    - [ ] Modify your existing data ingestion script (or create a new one) to fetch characters from Jikan API.
    - [ ] Implement rate limiting between Jikan calls.
    - [ ] Process the Jikan data and assign rarity to each character (e.g., using your `determineRarity` logic, or manual assignment for selected characters).
    - [ ] Use the Supabase JavaScript client (`supabase-js`) in your script to insert these characters into your Supabase `characters` table.
    - [ ] Test: Verify characters are correctly populated in your Supabase database.
- [ ] Update Gacha Roll API Route to Use Supabase:
    - [ ] In your `/api/roll` endpoint, replace the `characters.json` import with calls to your Supabase `characters` table using `supabase-js`.
    - [ ] Modify the logic to query `supabase.from('characters').select('*').eq('rarity', rolledRarity)`.
- [ ] Test: Ensure rolling still works correctly, now fetching from your live Supabase database.

Phase 4: Authentication & User Collections
- [ ] Implement NextAuth.js with Supabase:
    - [ ] Install `next-auth` and `@next-auth/supabase-adapter`.
    - [ ] Configure NextAuth.js with the Supabase adapter (refer to NextAuth.js docs for details).
    - [ ] Create a `pages/api/auth/[...nextauth].ts` file (for Pages Router) or integrate directly with the App Router's auth patterns.
    - [ ] Add sign-in/sign-out buttons to your UI.
    - [ ] Test: Verify users can register/login and log out.
- [ ] Create `user_cards` table:
    - [ ] In Supabase, create a `user_cards` table with columns: `id` (PK), `user_id` (FK to Supabase auth.users.id), `character_id` (FK to characters.id), `quantity` (INT, default 1), `obtained_at` (TIMESTAMP).
    - [ ] Add Row-Level Security (RLS) policies to `user_cards` so users can only see/update their own collections.
- [ ] Update Gacha Roll API Route for User Collections:
    - [ ] After a successful roll, get the current authenticated user's ID from the session (provided by NextAuth.js).
    - [ ] Store the rolled character in the `user_cards` table, linking it to the `user_id` and `character_id`.
    - [ ] Handle duplicates: If the user already has that character, increment the quantity instead of creating a new entry.
- [ ] Display User's Persistent Collection:
    - [ ] In your collection page/component, fetch the user's `user_cards` from Supabase (instead of localStorage or CollectionContext alone).
    - [ ] Join with the `characters` table to get full character details.
    - [ ] Display the collected characters, including their quantity.
    - [ ] Test: Log in, roll characters, log out, log back in, and verify your collection persists.

Phase 5: Polish & Deployment
- [ ] Enhance UI/UX:
    - [ ] Improve the visual design of your character cards (use Tailwind CSS for rarity indicators, borders, backgrounds).
    - [ ] Add animations for the roll process (e.g., using Framer Motion).
    - [ ] Consider adding a simple "currency" system (e.g., start with 100, each roll costs 10, update in user's profile table).
- [ ] Error Handling & Loading States:
    - [ ] Implement robust error handling for API calls (both frontend and backend).
    - [ ] Show meaningful loading indicators to the user.
- [ ] Deploy to Vercel:
    - [ ] Connect your GitHub repository to Vercel.
    - [ ] Ensure all environment variables are correctly configured in Vercel's settings.
    - [ ] Test: Perform full end-to-end testing on the deployed application.