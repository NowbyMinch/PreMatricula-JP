import { NextResponse } from "next/server";

type LoginResponse = {
  message?: string;
  user?: {
    id: string;
    email: string;
    name: string;
  };
  token?: string;
  emailSent?: boolean;
};

export async function POST(req: Request) {
  try {
    const body = await req.json(); // recebe { email, password }
    // 1️⃣ envia para o backend no Railway
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      credentials: "include"
    });

    // ❌ se o backend retornar vazio, não tenta JSON
    let data: LoginResponse = {};
    try {
      data = await response.json();
    } catch (err) {
      console.error("Erro ao ler JSON do backend:", err);
    }

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || "Erro ao logar" },
        { status: response.status }
      );
    }

    // 2️⃣ sucesso, cria cookie
    const res = NextResponse.json({ message: `Login realizado com sucesso` });
    res.cookies.set("access_token", data.token || "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    return res;

  } catch (err) {
    console.error("Erro interno no route.ts:", err);
    return NextResponse.json({ message: "Erro interno no servidor" }, { status: 500 });
  }
}
