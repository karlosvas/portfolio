import type { APIRoute } from "astro";
import { Resend } from "resend";
import { getSecret } from "astro:env/server";
import { validateEmail } from "@/utils/emailValidator";

// Api key de resend
const RESEND_API_KEY = getSecret("RESEND_API_KEY");

export const POST: APIRoute = async ({ request }) => {
  try {
    // Instancia de resend
    const resend = new Resend(RESEND_API_KEY);
    const { email, message } = await request.json();

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
