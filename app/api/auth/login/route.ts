import { prisma } from "@/utils/prisma";
import comparePassword from "@/utils/comparePassword";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  // Get user from db
  const user = await prisma.user.findUnique({ where: { username } });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const isPasswordCorrect = await comparePassword(password, user.password);
  if (!isPasswordCorrect) {
    return NextResponse.json(
      { message: "Incorrect username/password combination" },
      { status: 401 },
    );
  }

  return NextResponse.json(
    { message: `Logged in successfully`, user },
    { status: 200 },
  );
}
