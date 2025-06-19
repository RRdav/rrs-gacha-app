import Link from "next/link"
import Button from "./Button"
import User from "./User"


export default async function Header(){

    return (
        <header>
            <h1>Gacha App</h1>
            <nav>
                <ul>
                    <li><Link href="/">Home</Link></li>
                    <User />
                    <li><Link href="/collection">Collection</Link></li>
                </ul>
            </nav>
        </header>
    )
}