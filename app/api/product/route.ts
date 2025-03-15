import { prisma } from "@/utils/prisma";
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
