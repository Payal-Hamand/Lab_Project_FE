import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const sendMail = async (
  email,
  subject,
  text
) => {

  const transporter =
    nodemailer.createTransport({

      service: 'gmail',

      auth: {

        user:
          process.env.EMAIL,

        pass:
          process.env.EMAIL_PASSWORD

      }
    })

  await transporter.sendMail({

    from:
      process.env.EMAIL,

    to: email,

    subject,

    text

  })
}

export default sendMail