import nodemailer from 'nodemailer';

export const sendEmail = async (to,subject,text,attachmentPath) => {
    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth: {
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS
        }
    });

    await transporter.sendMail({
        from:`"Travel & Trekking" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        text,
        attachments:[
            {
                filename: attachmentPath.split('/').pop(),
                path:attachmentPath
            }
        ]
    })
}