import { currentUser } from "@clerk/nextjs/server";
import { createClerkClient } from "@clerk/backend";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY!,
});

export async function POST(req: Request) {
  try {
    const user = await currentUser();

    if (!user) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    const { newTier } = await req.json();

    if (!newTier) {
      return new Response(JSON.stringify({ message: "Tier is required" }), { status: 400 });
    }

    await clerkClient.users.updateUser(user.id, {
      publicMetadata: { tier: newTier },
    });

    return new Response(JSON.stringify({ message: "Tier updated successfully" }), { status: 200 });
  } catch (err: any) {
    console.error("Upgrade API Error:", err);
    return new Response(
      JSON.stringify({
        message: "Failed to upgrade tier",
        error: err.message || err,
      }),
      { status: 500 }
    );
  }
}
