import { insertMaskInPhone } from "@/utils/functions/phoneMask";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.MAIL_PORT || "465"),
  secure: true,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASS,
  },
} as SMTPTransport.Options);

export async function sendEmail(
  email: string,
  name: string,
  phone: string,
  message: string
) {
  const formattedPhone = insertMaskInPhone(phone);
  return await transporter.sendMail({
    from: `"Portifolio" <${process.env.USER_EMAIL}>`,
    to: process.env.ADDRESSEE,
    subject: "Nova Mensagem",
    replyTo: `${email}`,
    html: `
  <div style="
    font-family: Arial, Helvetica, sans-serif;
    background-color: #f4f4f5;
    padding: 24px;
    border-radius: 10px;
    color: #18181b;
    max-width: 600px;
    margin: auto;
  ">
    <h2 style="
      margin-bottom: 16px;
      font-size: 20px;
      color: #09090b;
    ">
    Nova mensagem recebida
    </h2>

    <p style="font-size: 15px; color: #52525b; margin-bottom: 8px;">
      <strong>Nome:</strong> ${name}
    </p>

    <p style="font-size: 15px; color: #52525b; margin-bottom: 8px;">
      <strong>E-mail:</strong> ${email}
    </p>

    <p style="font-size: 15px; color: #52525b; margin-bottom: 20px;">
      <strong>Telefone:</strong> ${formattedPhone}
    </p>

    <div style="
      background-color: #ffffff;
      border-left: 4px solid #f97316;
      padding: 16px;
      border-radius: 6px;
      margin-bottom: 20px;
    ">
      <h3 style="
        margin-top: 0;
        margin-bottom: 8px;
        font-size: 16px;
        color: #09090b;
      ">
        Mensagem
      </h3>

      <p style="
        margin: 0;
        font-size: 14px;
        line-height: 1.6;
        color: #27272a;
        white-space: pre-line;
      ">
        ${message}
      </p>
    </div>

    <footer style="
      font-size: 12px;
      color: #71717a;
      text-align: center;
    ">
      <p style="margin: 0;">
        Mensagem enviada através do formulário de contato do portfólio.
      </p>
    </footer>
  </div>
`,
  });
}
