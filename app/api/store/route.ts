import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

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

export async function GET(req: NextRequest) {
  try {
    const userID = req.nextUrl.searchParams.get("userID");

    if (!userID) {
      return NextResponse.json({ message: "Missing userID" }, { status: 400 });
    }

    const stores = await prisma.store.findMany({ where: { userID } });

    return NextResponse.json({ stores }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Server error: ${error}` },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const storeID = req.nextUrl.searchParams.get("storeID");
    if (!storeID) {
      return NextResponse.json({ message: "Store not found" }, { status: 404 });
    }

    await prisma.store.delete({ where: { storeID } });
    return NextResponse.json({ message: "Store deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Server error: ${error}` },
      { status: 500 },
    );
  }
}
