import type { APIRoute } from "astro";
import { Resend } from "resend";
import { getSecret } from "astro:env/server";
import { validateEmail } from "@/utils/emailValidator";

// Api keys
const RESEND_API_KEY = getSecret("RESEND_API_KEY");
const TURNSTILE_SECRET_KEY = getSecret("TURNSTILE_SECRET_KEY");

// Función para validar el token de Turnstile
async function validateTurnstile(token: string): Promise<boolean> {
  if (!TURNSTILE_SECRET_KEY) {
    throw new Error("TURNSTILE_SECRET_KEY is not defined");
  }

  const formData = new FormData();
  formData.append("secret", TURNSTILE_SECRET_KEY);
  formData.append("response", token);

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();
  return data.success;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    // Instancia de resend
    const resend = new Resend(RESEND_API_KEY);
    const { email, message, turnstileToken } = await request.json();

    // Validar el token de Turnstile
    if (!turnstileToken) {
      return new Response(JSON.stringify({ error: "Missing Turnstile token" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const isTurnstileValid = await validateTurnstile(turnstileToken);
    if (!isTurnstileValid) {
      return new Response(JSON.stringify({ error: "Invalid Turnstile token" }), {
        status: 403,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    // Validar el email y el mensaje
    if (!validateEmail(email)) throw new Error("Invalid email");

    // Creamos el objeto de mensaje a enviar
    const data = await resend.emails.send({
      from: "Portfolio <carlosvassan@carlosvas.dev>",
      to: ["carlosvassan@gmail.com"],
      subject: "New Portfolio Contact",
      html: `<p>From: ${email}</p><p>Message: ${message}</p>`,
    });

    // Devolvemos la respuesta
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};
