<!-- Learning Notes -->
- For app router, API routes are handled in the `app/api` directory. Then create a route.tsx file for the API endpoint.
- POST(req: Request) example of an API route action
- ```typescript
  export async function POST(req: Request) {
      const data = await req.json();
      // Process the data
      return new Response(JSON.stringify({ message: "Success" }), { status: 200 });
  }
  ```
- Remember to return a Response and status
- In TS when grabbing data, its good practice to define the types of the data you're working with. This helps with type safety and autocompletion.

- example of a function declaration in TS
- ```typescript
    const roll = () : Character => {return {test: "test"}};
  ```
  - Make use of try catch finally blocks to handle errors and loading gracefully.


- Setting up Context Providers
- Create your context file inside the src root directory, e.g., `src/contexts/CollectionContext.tsx`.
- Define your context and provider:
```typescript
  export const CollectionContext = createContext({
    acquiredCharacters: [] as Character[],
    setAcquiredCharacters: (() => {}) as Dispatch<SetStateAction<Character[]>>,
  });

  export function CollectionProvider({children} : {children: React.ReactNode}) {
      const [acquiredCharacters, setAcquiredCharacters] = useState<Character[]>([]);

      return (
          <CollectionContext.Provider value={{ acquiredCharacters, setAcquiredCharacters }}>
              {children}
          </CollectionContext.Provider>
      );
  }
```
- Remember to setup a setter function for the context state, so you can update the state from any component that consumes the context.
- Way I did to fetch API
- Create a separate file for outside api call in this case Jikan.
- usually inside utils or lib directory, e.g., `src/utils/jikan.ts`.
- create custom script in package.json to run the script
- keep in mind that this will be separate from Next.js and will not have access to Next.js features like API routes or server-side rendering.
- Make use of built in fetch api still though

- Ran into some issues with the import statement for the supabase client.
- Fix with install ts-node package and set "allowImportingTsExtensions": true in the tsconfig.json file.
``` typescript
"db:seed": "node --loader ts-node/esm ./src/app/utils/seed/seedDatabase.ts"
```
- Also you cant import defined types you already have so you will need to define them again in the script.