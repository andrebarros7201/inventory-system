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
  const { storeID, name, price, quantity } = await req.json();

  try {
    const store = await prisma.store.findUnique({ where: { storeID } });

    if (!store) {
      return NextResponse.json(
        { notification: { type: "error", message: "Invalid store ID" } },
        { status: 404 },
      );
    }

    const product = await prisma.product.create({
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

export async function DELETE(req: NextRequest) {
  try {
    const productID = req.nextUrl.searchParams.get("productID");
    if (!productID) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    await prisma.product.delete({ where: { productID } });
    return NextResponse.json(
      { notification: { type: "success", message: "Product deleted" } },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Server error: ${error}` },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { productID, name, price, quantity } = await req.json();
    const product = await prisma.product.findUnique({ where: { productID } });
    if (!product) {
      return NextResponse.json(
        { notification: { type: "error", message: "Product not found" } },
        { status: 404 },
      );
    }

    await prisma.product.update({
      where: { productID: productID },
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      data: { name: name, price: Number(price), quantity: Number(quantity) },
    });

    return NextResponse.json(
      { notification: { type: "success", message: "Product updated" } },
      { status: 200 },
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return NextResponse.json(
      { notification: { type: "error", message: "Server Error2" } },
      { status: 500 },
    );
  }
}
