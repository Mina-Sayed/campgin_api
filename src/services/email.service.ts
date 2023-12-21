import nodemailer from 'nodemailer';

class EmailService {
    private transporter: nodemailer.Transporter;

    constructor() {
        // Initialize the transporter
        this.transporter = nodemailer.createTransport({
            // Configure your email provider settings here
            // For example, if you're using Gmail:
            service: 'Gmail',
            auth: {
                user: 'your-email@gmail.com',
                pass: 'your-password',
            },
        });
    }

    sendEmail(to: string, subject: string, body: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const mailOptions = {
                from: 'your-email@gmail.com',
                to,
                subject,
                text: body,
            };

            // Send the email
            this.transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(info);
                }
            });
        });
    }
}

export default EmailService;
