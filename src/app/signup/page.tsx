import Button from "../components/Button"
import Link from "next/link"
import { signup } from "./actions"

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-sm space-y-6">
            <h1 className="text-3xl font-bold text-center">Create an Account</h1>
            <form className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        className="px-4 py-2 bg-gray-800 border-gray-600 border-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="display_name">Display Name:</label>
                    <input
                        id="display_name"
                        name="display_name"
                        type="text"
                        required
                        className="px-4 py-2 bg-gray-800 border-gray-600 border-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="password">Password:</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="px-4 py-2 bg-gray-800 border-gray-600 border-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <Button formAction={signup}>
                    Sign up
                </Button>
            </form>
            <p className="text-center text-sm">
                Already have an account?
                <Link href="/login" className="font-medium text-blue-500 hover:underline ml-1">
                    Log in here
                </Link>
            </p>
        </div>
    </div>
  )
}