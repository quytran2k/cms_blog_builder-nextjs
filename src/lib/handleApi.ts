import { AppError } from "./errors";

export async function handleApiRequest(fn: () => Promise<Response>) {
  try {
    return await fn();
  } catch (err: any) {
    const status = err instanceof AppError ? err.statusCode : 500;
    const message = err.message || "Internal Server Error";

    return new Response(JSON.stringify({ error: message }), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  }
}
