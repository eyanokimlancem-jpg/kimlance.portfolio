import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const messages = await prisma.contactMessage.findMany({
      include: {
        replies: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      messages: messages.map((message) => ({
        ...message,
        createdAt: message.createdAt.toISOString(),
        replies: message.replies.map((reply) => ({
          ...reply,
          createdAt: reply.createdAt.toISOString(),
        })),
      })),
      adminEmail: session.email,
    });
  } catch (error) {
    console.error("Admin messages fetch failed:", error);
    return NextResponse.json({ error: "Unable to load messages." }, { status: 500 });
  }
}
