import { prisma } from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userID, name } = await req.json();

    await prisma.store.create({
      data: {
        name: name,
        userID: userID,
      },
    });

    return NextResponse.json({ message: "Store created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: `Server Error: ${error}` },
      { status: 500 },
    );
  }
}
