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