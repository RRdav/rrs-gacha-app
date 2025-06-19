import Link from "next/link";
import Button from "../components/Button";


export default function ConfirmationPage() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="pt-10">
          <p>Thanks for confirming lil bro, why don't you go login and roll some characters?</p>
          <Button>
            <Link href="/login">
                Login
            </Link>
          </Button>
        </div>
      </main>
    </div>
  );
}