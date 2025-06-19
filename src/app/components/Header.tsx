import Link from "next/link"
import Button from "./Button"
import User from "./User"


export default async function Header(){

    return (
        <header className="flex flex-col sm:flex-row justify-between items-center font-[family-name:var(--font-geist-sans)]">
            <h1 className="text-2xl"><Link href="/">Gacha App</Link></h1>
            <nav className="flex flex-col gap-4 items-center">
                <ul className="flex gap-8 items-center">
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/gacha">Rolls</Link></li>
                    <li><Link href="/collection">Collection</Link></li>
                </ul>
                <ul>
                    <User />
                </ul>
            </nav>
        </header>
    )
}