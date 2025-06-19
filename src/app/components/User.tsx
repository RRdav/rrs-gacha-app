import { createClient } from "../utils/supabase/server"
import { redirect } from "next/navigation"
import Button from "./Button";
import Link from "next/link";

export default async function User() {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.getUser()

    const user = data?.user;

    // Define the Server Action for signing out
    const signOut = async () => {
        'use server'
        const supabase = await createClient()
        // Sign out the user
        await supabase.auth.signOut()

        // Redirect to the home page to refresh the session and UI
        return redirect('/login')
    }
    return(
        <li>
            {user ? (
                <div>
                    <p>Welcome, {user.email}</p>
                    <form action={signOut}>
                        <Button type="submit">Sign Out</Button>
                    </form>
                </div>
            ) : (
                <Button><Link href="/login">Login</Link></Button>
            )}
        </li>
    )

}