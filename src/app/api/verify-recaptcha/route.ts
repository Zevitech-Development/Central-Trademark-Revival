import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  const secret = process.env.RECAPTCHA_SECRET_KEY!;
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`;

  const response = await fetch(verifyUrl, {
    method: "POST",
  });

  const data = await response.json();

  return NextResponse.json({
    success: data.success,
    score: data.score,
  });
}
