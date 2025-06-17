// Example: create the login redirect handler (e.g., in /api/auth/google-login/route.ts)
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  const cookieStore = await cookies();
  const state = uuidv4();
  cookieStore.set("oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 300, // 5 minutes
    path: "/",
  });

  const redirectUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  redirectUrl.searchParams.set("client_id", process.env.GOOGLE_CLIENT_ID!);
  redirectUrl.searchParams.set(
    "redirect_uri",
    "http://localhost:3000/api/auth/callback/google-custom"
  );
  redirectUrl.searchParams.set("response_type", "code");
  redirectUrl.searchParams.set("scope", "openid email profile");
  redirectUrl.searchParams.set("prompt", "consent");
  redirectUrl.searchParams.set("state", state);

  return NextResponse.redirect(redirectUrl.toString());
}
