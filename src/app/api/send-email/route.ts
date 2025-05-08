import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to, subject, html, attachments } = body;

    if (!to || !subject || !html) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Gmail SMTP configuration
    // For Gmail on port 587, secure should be false since it uses STARTTLS
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
      port: Number(process.env.EMAIL_PORT) || 587,
      secure: false, // For Gmail on port 587, always use false (STARTTLS)
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      // Debug option to see detailed logs
      debug: true,
    });

    // Log configuration for debugging
    console.log("Email configuration:", {
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secure: false,
      user: process.env.EMAIL_USER ? "Provided" : "Missing",
      pass: process.env.EMAIL_PASSWORD ? "Provided" : "Missing",
    });

    // Send email
    const info = await transporter.sendMail({
      from: `Central Trademark Revival <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
      attachments,
    });

    console.log("Email sent successfully:", info.messageId);
    return NextResponse.json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      {
        error: "Failed to send email",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
