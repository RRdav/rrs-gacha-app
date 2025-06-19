import Link from "next/link"
import Button from "./Button"
import User from "./User"


export default async function Header(){

    return (
        <header>
            <h1>Gacha App</h1>
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <User />
                    <li><a href="/private">Private Page</a></li>
                </ul>
            </nav>
        </header>
    )
}