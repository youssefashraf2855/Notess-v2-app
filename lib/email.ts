import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(
  email: string,
  name: string,
  code: string
) {
  const { data, error } = await resend.emails.send({
    from: "Notes <onboarding@resend.dev>",
    to: [email],
    subject: "Verify your Notes account",
    html: `
      <div>
        <h1>Welcome to Notes, ${name}!</h1>

        <p>Your verification code is:</p>

        <h2>${code}</h2>

        <p>This code will expire in 10 minutes.</p>
      </div>
    `,
  });

  if (error) {
    console.error("Email sending error:", error);
    throw new Error("Failed to send verification email");
  }

  return data;
}