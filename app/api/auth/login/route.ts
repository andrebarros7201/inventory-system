import { prisma } from "@/utils/prisma";
import comparePassword from "@/utils/comparePassword";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    // Get user from db
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Compare passwords
    const isPasswordCorrect = await comparePassword(password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json(
        {
          notification: {
            type: "error",
            message: "Incorrect username/password combination",
          },
        },
        { status: 401 },
      );
    }

    // Success
    return NextResponse.json(
      {
        user: { username: user.username, userID: user.userID },
        notification: {
          type: "success",
          message: "Logged in successfully",
        },
      },

      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { notification: { type: "error", message: "Server error2" } },
      { status: 500 },
    );
  }
}
