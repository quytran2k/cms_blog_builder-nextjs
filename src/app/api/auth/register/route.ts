import { registerUser } from "@/lib/auth/auth.service";
import { AppError } from "@/lib/errors";
import { handleApiRequest } from "@/lib/handleApi";
import { registerAuthSchema } from "@/schemas/auth";

export async function POST(request: Request) {
  return handleApiRequest(async () => {
    const body = await request.json();
    const result = registerAuthSchema.safeParse(body);

    if (!result.success) {
      throw new AppError(result.error.message, 400);
      //   return Response.json({ error: result.error.errors }, { status: 400 });
    }

    const { name, email, password } = result.data;
    const user = await registerUser(email, password, name);

    // Proceed with authentication
    return new Response(JSON.stringify({ ...user }), { status: 200 });
  });
}
