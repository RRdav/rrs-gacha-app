import { createClient } from "../utils/supabase/client";

export default async function Instruments() {
  const supabase = await createClient();
  const { data: instruments } = await supabase.from("instruments").select();

    const addDataTest = [
        {
            id: crypto.randomUUID(),
            name: "Guitar"
            },
            {
            id: crypto.randomUUID(),
            name: "Piano"
            },
            {
            id: crypto.randomUUID(),
            name: "Drums"
        }
    ]

    try {
        const { error } = await supabase
        .from("instruments")
        .insert(addDataTest);
        console.log("Data inserted successfully:", error);
    }
    catch (error) {
        console.error("Error inserting data:", error);
    }


  return(
    <div>
            <h1>Hello, here is test data</h1>
            {
                instruments?.map((instrument) => (
                    <div key={instrument.id}>
                        <h1>{instrument.id}</h1>
                        <h2>{instrument.name}</h2>
                    </div>
                ))
            }
    </div>
  )
}