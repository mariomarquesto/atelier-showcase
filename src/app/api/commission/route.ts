import { NextResponse } from "next/server";
import type { CommissionPayload } from "@/types";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as CommissionPayload;

    if (!body.name || body.name.length < 2) {
      return NextResponse.json({ error: "Invalid name" }, { status: 400 });
    }
    if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    if (!body.details || body.details.length < 10) {
      return NextResponse.json({ error: "Invalid details" }, { status: 400 });
    }

    // TODO: guardar en DB (Supabase/Postgres) y enviar email (Resend)
    console.log("[COMMISSION]", body);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}
