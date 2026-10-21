import { NextResponse } from "next/server";
import type { ContactPayload } from "@/types";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ContactPayload;

    if (!body.name || body.name.trim().length < 2) {
      return NextResponse.json({ error: "Nombre invalido" }, { status: 400 });
    }
    if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json({ error: "Email invalido" }, { status: 400 });
    }
    if (!body.message || body.message.trim().length < 10) {
      return NextResponse.json({ error: "Mensaje demasiado corto" }, { status: 400 });
    }

    // TODO: integrar Resend o SendGrid
    console.log("[CONTACT]", body);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Payload invalido" }, { status: 400 });
  }
}
