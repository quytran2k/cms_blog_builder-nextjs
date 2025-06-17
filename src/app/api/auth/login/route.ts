// app/api/login/route.ts
import { loginUser } from "@/lib/auth/auth.service";
import { AppError } from "@/lib/errors";
import { handleApiRequest } from "@/lib/handleApi";
import { loginAuthSchema } from "@/schemas/auth";
export async function POST(req: Request) {
  return handleApiRequest(async () => {
    const body = await req.json();
    const parsed = loginAuthSchema.safeParse(body);

    if (!parsed.success) {
      throw new AppError("Invalid input", 422);
    }

    const { email, password } = parsed.data;

    const response = await loginUser(email, password);

    return new Response(JSON.stringify(response), { status: 200 });
  });
}
