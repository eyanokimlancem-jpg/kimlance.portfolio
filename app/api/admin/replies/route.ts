import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { replySchema } from "@/lib/validators";

export async function POST(request: Request) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = replySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: parsed.error.issues[0]?.message ?? "Invalid reply payload.",
        },
        { status: 400 },
      );
    }

    const { messageId, content } = parsed.data;

    const reply = await prisma.messageReply.create({
      data: {
        content,
        authorRole: "admin",
        messageId,
      },
    });

    await prisma.contactMessage.update({
      where: { id: messageId },
      data: { status: "replied" },
    });

    return NextResponse.json({ success: true, reply }, { status: 201 });
  } catch (error) {
    console.error("Admin reply failed:", error);

    return NextResponse.json({ error: "Unable to send the reply." }, { status: 500 });
  }
}
