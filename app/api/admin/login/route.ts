import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { setAdminSessionCookie } from "@/lib/auth";
import { adminLoginSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = adminLoginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: parsed.error.issues[0]?.message ?? "Invalid login attempt.",
        },
        { status: 400 },
      );
    }

    const { email, password } = parsed.data;
    const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const passwordHash = process.env.ADMIN_PASSWORD_HASH;

    if (!adminEmail || !passwordHash) {
      return NextResponse.json({ error: "Admin environment is not configured." }, { status: 500 });
    }

    if (email.trim().toLowerCase() !== adminEmail) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const validPassword = await bcrypt.compare(password, passwordHash);

    if (!validPassword) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const response = NextResponse.json({ success: true });
    setAdminSessionCookie(response, adminEmail);

    return response;
  } catch (error) {
    console.error("Admin login failed:", error);

    return NextResponse.json({ error: "Unable to log in at the moment." }, { status: 500 });
  }
}
