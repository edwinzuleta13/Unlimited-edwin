import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    console.group("🧩 Supabase Password Reset Debug (Server)");
    console.log("📧 Email destino:", email);
    console.log("🔗 Redirect URL:", process.env.NEXT_PUBLIC_BASE_URL + "/reset-password");

    const { error, data } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password`,
    });

    if (error) {
      console.error("❌ Supabase SMTP Error:", error);
      console.groupEnd();
      return NextResponse.json({ ok: false, error });
    }

    console.log("✅ Email de recuperación enviado:", data);
    console.groupEnd();

    return NextResponse.json({ ok: true, data });
  } catch (err: any) {
    console.error("💥 Exception al enviar:", err);
    return NextResponse.json({ ok: false, message: err.message }, { status: 500 });
  }
}
