import { NextResponse } from "next/server";
import hashPassword from "@/utils/hashPassword";
import { prisma } from "@/utils/prisma";

export async function POST(req: Request) {
  const { username, password } = await req.json();
  const user = await prisma.user.findUnique({ where: { username: username } });
  if (user) {
    NextResponse.json({ message: "User already exists!" }, { status: 409 });
  }
  if (!user) {
    const hashedPassword = await hashPassword(password);
    await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "User crated successfully." },
      { status: 201 },
    );
  }

  return NextResponse.json({ message: "An error occurred." }, { status: 500 });
}
