import { EmailTemplate } from '@/app/components/Email/emailTemplates';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req:Request, res:Response) {
  try {
    const datass = await req.json();


    const { data, error } = await resend.emails.send({
      from: 'Hoş Geldiniz! <noreply@resend.dev>',
      to: [datass.email],
      subject: 'Email Doğrulama Linki',
      react: EmailTemplate({ link: datass.link }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
