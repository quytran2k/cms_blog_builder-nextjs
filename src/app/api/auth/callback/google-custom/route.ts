import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const savedState = cookieStore.get("oauth_state")?.value;

  if (!state || !savedState || state !== savedState) {
    return NextResponse.json({ error: "Invalid state" }, { status: 400 });
  }
  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  // OPTIONAL: verify state here if you stored it earlier

  // Exchange the code for access token
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code: code,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: "http://localhost:3000/api/auth/callback/google-custom",
      grant_type: "authorization_code",
    }),
  });

  const tokenData = await tokenResponse.json();

  if (!tokenResponse.ok) {
    return NextResponse.json({ error: tokenData }, { status: 500 });
  }
  console.log("Quyhuhi", tokenData, tokenResponse);

  // Example: extract user info using access token
  //   const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
  //     headers: { Authorization: `Bearer ${tokenData.access_token}` },
  //   });

  //   const userInfo = await userInfoResponse.json();

  //   // You can now store the userInfo or create session
  //   console.log('User Info:', userInfo);

  // Redirect to dashboard or wherever
  return NextResponse.redirect(new URL("/dashboard", request.url));
}
