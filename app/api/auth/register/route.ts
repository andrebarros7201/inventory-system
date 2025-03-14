import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";
import hashPassword from "@/utils/hashPassword";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    const user = await prisma.user.findUnique({ where: { username } });
    if (user) {
      return NextResponse.json(
        { notification: { type: "error", message: "User already exists" } },
        { status: 409 },
      );
    }

    const hashedPassword = await hashPassword(password);
    await prisma.user.create({
      data: { username, password: hashedPassword },
    });

    return NextResponse.json(
      {
        notification: { type: "success", message: "User created successfully" },
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Server error: ${error}` },
      { status: 500 },
    );
  }
}
