import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from './utils/mail.utils';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const { email, name, phone, message } = body;

        await sendEmail(email, name, phone, message);

        return NextResponse.json({ status: 200 });
    } catch (error) {
        console.error('Erro ao enviar email:', error);
        return NextResponse.json(
            { status: 500 }
        );
    }
}
