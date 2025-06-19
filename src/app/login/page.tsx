import Button from "../components/Button"
import { login, signup } from "./actions"

export default function LoginPage() {
  return (
    <div>
        <h1> Login or Sign up to start rolling!</h1>
        <form>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="display_name">Display Name:</label>
        <input id="display_name" name="display_name" type="text" required />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
        <Button formAction={login}>
            Log in
        </Button>
        <Button formAction={signup}>
            Sign up
        </Button>
        </form>
    </div>
  )
}