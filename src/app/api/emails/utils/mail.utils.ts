import { insertMaskInPhone } from "@/utils/functions/phoneMask";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT || '465'),
    secure: true,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS,
    },
} as SMTPTransport.Options);

export async function sendEmail(email: string, name: string, phone: string, message: string) {

    const formattedPhone = insertMaskInPhone(phone);
    return await transporter.sendMail({
        from: `"${name}" <${email}>`,
        to: process.env.ADDRESSEE,
        subject: "Nova Mensagem",
        html: `
                <div style="font-family: Arial, sans-serif; color: #1c1c1c; background-color: #f7f7f7; padding: 20px; border-radius: 8px;">
                    <h2 style="color: #1c1c1c;">Nova Mensagem de: ${name}</h2>
                    <p style="font-size: 16px; color: #a0a0a0;"><strong>E-mail:</strong> ${email}</p> <!-- E-mail do usuário -->
                    <p style="font-size: 16px; color: #a0a0a0;"><strong>Telefone:</strong> ${formattedPhone}</p> <!-- Telefone formatado -->
                    <div style="background-color: #d1d1d1; padding: 15px; border-radius: 5px; color: #1c1c1c;">
                        <h3 style="color: #1c1c1c;">Mensagem:</h3>
                        <p style="color: #1c1c1c;">${message}</p>
                    </div>
                    <footer style="margin-top: 20px; font-size: 12px; color: #a0a0a0;">
                        <p style="color: #a0a0a0;">Mensagem envia do formulário de contato do portifólio.</p>
                    </footer>
                </div>
            `,
    });


};
