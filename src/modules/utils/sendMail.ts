
import nodemailer from 'nodemailer'

// async..await is not allowed in global scope, must use a wrapper
export async function sendMail(email: string, url: string, type: number = 0) {

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let account = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: account.user, // generated ethereal user
        pass: account.pass // generated ethereal password
    }
    })

    // setup email data with unicode symbols
    const registerMailOptions = {
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: email, // list of receivers
        subject: "Email confirmation", // Subject line
        text: "Confirm your registration by clicking on the link below", // plain text body
        html: `<a href='${url}'>${url}</a>` // html body
    }

    const forgotMailOptions = {
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: email, // list of receivers
        subject: "Change password", // Subject line
        text: "Change your password by clicking on the link below", // plain text body
        html: `<a href='${url}'>${url}</a>` // html body
    }

    // send mail with defined transport object
    const sendMailType: any = {
        0: registerMailOptions,
        1: forgotMailOptions
    }

    const info = await transporter.sendMail(sendMailType[type])

    console.log("Message sent: %s", info.messageId)
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
}

