// src/lib/auth/auth.service.ts
import bcrypt from "bcrypt";
import { AppError } from "../errors";
import { prisma } from "../prisma";
import { createSession } from "../utils";

export async function registerUser(
  email: string,
  password: string,
  name: string
) {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) throw new AppError("Email already in use", 409);

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      credential: {
        create: {
          hashedPassword,
        },
      },
    },
  });
  return newUser;
}

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { credential: true },
  });

  if (!user || !user.credential) {
    throw new AppError("User not found", 404);
  }

  const valid = await bcrypt.compare(password, user.credential.hashedPassword);
  if (!valid) {
    throw new AppError("Incorrect password", 401);
  }
  const session = await createSession(user.id);
  const response = {
    message: "Login successful",
    sessionToken: session.sessionToken,
    user: { id: user.id, email: user.email },
  };
  return response;
}
