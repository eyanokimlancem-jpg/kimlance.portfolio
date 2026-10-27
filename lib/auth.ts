import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const SESSION_COOKIE = "kim_lance_admin_session";
const SESSION_SECRET = process.env.SESSION_SECRET ?? "dev-session-secret";

export type AdminSession = {
  email: string;
  exp: number;
};

function encodeBase64Url(value: string) {
  return Buffer.from(value).toString("base64url");
}

function decodeBase64Url(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function sign(payload: string) {
  return createHmac("sha256", SESSION_SECRET).update(payload).digest("base64url");
}

export function createAdminSessionToken(email: string) {
  const payload: AdminSession = {
    email,
    exp: Date.now() + 1000 * 60 * 60 * 10,
  };

  const encodedPayload = encodeBase64Url(JSON.stringify(payload));
  const signature = sign(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

export function verifyAdminSessionToken(token: string | undefined | null): AdminSession | null {
  if (!token) {
    return null;
  }

  const [payloadPart, signature] = token.split(".");

  if (!payloadPart || !signature) {
    return null;
  }

  const expectedSignature = sign(payloadPart);
  const expectedBuffer = Buffer.from(expectedSignature);
  const actualBuffer = Buffer.from(signature);

  if (expectedBuffer.length !== actualBuffer.length) {
    return null;
  }

  if (!timingSafeEqual(expectedBuffer, actualBuffer)) {
    return null;
  }

  try {
    const payload = JSON.parse(decodeBase64Url(payloadPart)) as Partial<AdminSession>;

    if (!payload.email || !payload.exp || payload.exp <= Date.now()) {
      return null;
    }

    return {
      email: payload.email,
      exp: payload.exp,
    };
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  return verifyAdminSessionToken(token);
}

export function setAdminSessionCookie(response: NextResponse, email: string) {
  response.cookies.set(SESSION_COOKIE, createAdminSessionToken(email), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 10,
    path: "/",
  });
}

export function clearAdminSessionCookie(response: NextResponse) {
  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}
