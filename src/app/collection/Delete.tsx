'use client';

import { useRouter } from "next/navigation";
import Button from "../components/Button";
import { createClient } from "../utils/supabase/client";


export default function Delete({ characterID }: { characterID: string }) {
    const router = useRouter();

    const handleDelete = async () => {
        const supabase = await createClient();

        try {
            // Get current user
            const { data: userData, error: userError } = await supabase.auth.getUser();
            const userId = userData?.user?.id;

            // Delete clicked delete button character
            const { data, error } = await supabase.from("usercollection").delete().eq('id', userId).eq('character_id', characterID);


            // refresh the page after deletion
            router.refresh();

        } catch (error) {
            console.error("Error deleting character:", error);
        }
    }
    return(
        <Button onClick={handleDelete}>
            Delete
        </Button>
    )
}