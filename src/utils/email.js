const nodemailer = require('nodemailer');
const pug = require('pug');

module.exports = class Email {
    constructor(user, number) {
        this.to = user.email;
        this.firstName = user.firstName;
        this.number = number;
        this.from = `travelbear <${process.env.EMAIL_FROM}>`;
    }

    newTransport() {
        if (process.env.NODE_ENV === 'production') {
            return nodemailer.createTransport({
                service: 'mailgun',
                auth: {
                    user: process.env.MAILGUN_USER,
                    pass: process.env.MAILGUN_PASS
                }
        });
        }

        return nodemailer.createTransport({
                host: process.env.EMAIL_HOST,
                port: process.env.EMAIL_PORT,
                auth: {
                    user: process.env.EMAIL_USERNAME,
                    pass: process.env.EMAIL_PASSWORD
                }
        });
    }

    // Send the actual mail
    async send(template, subject) {
        // 1) Render HTML based on pug template
        const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
            firstName: this.firstName,
            number: this.number,
            subject
        });


        // 2) Define email options
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
        }

        // 3) Create a transport and Send email
        await this.newTransport().sendMail(mailOptions);
    }

    async sendBooking() {
        await this.send('booking', 'Booking Successful');
    }

    async sendPasswordReset() {
        await this.send('passwordReset', 'Your password rest token (valid for 10mins)');
    }
}

