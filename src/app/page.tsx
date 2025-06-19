import Image from "next/image";
import Link from "next/link";
import Button from "./components/Button";

export default function Home() {
  return (
    <div className=" font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="pt-10">
          <p>RRs super gacha app</p>
          <Link href="/gacha">
          <Button>
            It's time to roll big!
          </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
