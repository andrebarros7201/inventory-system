import { prisma, regeneratePrismaConnection } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const storeID = req.nextUrl.searchParams.get("storeID");

    if (!storeID) {
      return NextResponse.json(
        { notification: { type: "error", message: "Invalid store ID" } },
        { status: 404 },
      );
    }

    const products = await prisma.product.findMany({
      where: { storeID },
      orderBy: { name: "asc" },
    });

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { notification: { type: "error", message: error } },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  const newPrisma = regeneratePrismaConnection();
  const { storeID, name, price, quantity } = await req.json();

  try {
    const store = await newPrisma.store.findUnique({ where: { storeID } });

    if (!store) {
      return NextResponse.json(
        { notification: { type: "error", message: "Invalid store ID" } },
        { status: 404 },
      );
    }
    const product = await newPrisma.product.create({
      data: { storeID: storeID, name: name, price: price, quantity: quantity },
    });

    return NextResponse.json(
      {
        notification: {
          type: "success",
          message: `Product created successfully`,
        },
        product,
      },
      { status: 201 },
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { notification: { type: "error", message: "Server error" } },
      { status: 500 },
    );
  }
}
