"use strict"
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";




const transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo> = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_HOST,
    secure: true,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASS,
    }
})

export async function sendEmail(email: string, name: string, phone: string, message: string) {
    const response = await transporter.sendMail({
        from: `"${name} 👻" <${email}>`,
        to: process.env.USER_EMAIL,
        subject: "Filmes em Cartaz ✅",
        text: message,
    })
    return response
}