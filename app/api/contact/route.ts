import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactFormSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: parsed.error.issues[0]?.message ?? "Invalid form submission.",
        },
        { status: 400 },
      );
    }

    const { name, email, subject, message } = parsed.data;

    const createdMessage = await prisma.contactMessage.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: createdMessage,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Contact form submission failed:", error);

    return NextResponse.json(
      {
        error: "Unable to save this message. Please try again later.",
      },
      { status: 500 },
    );
  }
}
