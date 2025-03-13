import type { APIRoute } from "astro";
import { Resend } from "resend";
import { getSecret } from "astro:env/server";
import { validateEmail } from "@/utils/emailValidator";
const RESEND_API_KEY = getSecret("RESEND_API_KEY");

export const POST: APIRoute = async ({ request }) => {
  try {
    const resend = new Resend(RESEND_API_KEY);
    const { email, message } = await request.json();

    if (!validateEmail(email)) throw new Error("Invalid email");

    const data = await resend.emails.send({
      from: "Portfolio <carlosvassan@carlosvas.dev>",
      to: ["carlosvassan@gmail.com"],
      subject: "New Portfolio Contact",
      html: `<p>From: ${email}</p><p>Message: ${message}</p>`,
    });

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
