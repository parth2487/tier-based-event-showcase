import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Tier-Based Event Showcase</h1>

      <SignedOut>
        <Link href="/sign-in" className="bg-blue-600 text-white px-4 py-2 rounded">
          Sign In to View Events
        </Link>
      </SignedOut>

      <SignedIn>
        <p className="mb-4">You are signed in!</p>
        <Link href="/events" className="bg-green-600 text-white px-4 py-2 rounded">
          Go to Events
        </Link>
        <div className="mt-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </SignedIn>
    </main>
  );
}
