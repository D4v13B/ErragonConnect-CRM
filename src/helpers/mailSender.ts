import nodemailer from "nodemailer"
import { MailOptions } from "nodemailer/lib/json-transport"
import "dotenv/config"

export class Mailer {
   static transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: parseInt(process.env.MAIL_PORT as string),
      secure: process.env.MAIL_SECURE === "true", //false para 587 tls, true para 465 ssl
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

   static async sendMail({ to, subject, text, html }: MailOptions) {
      try {
         const info = await this.transporter.sendMail({
            from: process.env.MAIL_USER,
            to,
            subject,
            text,
            html,
         })

         // console.log("✅ Correo enviado:", info.messageId)
         return info
      } catch (error) {
         console.error("❌ Error al enviar el correo:", error)
         throw error
      }
   }
}
